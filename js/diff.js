// 원문과 수정본을 단어 단위로 비교합니다 (LCS 기반).
window.TextDiff = (function () {
  const TOKEN_RE = /\n+|[ \t]+|[A-Za-z0-9À-ɏ'’]+|[^\sA-Za-z0-9À-ɏ'’]/g;

  function tokenize(text) {
    return (text || '').match(TOKEN_RE) || [];
  }

  // 공백 차이는 무시하고 비교
  function key(tok) {
    if (/^[ \t]+$/.test(tok)) return ' ';
    if (/^\n+$/.test(tok)) return '\n';
    return tok;
  }

  function diff(a, b) {
    const A = tokenize(a);
    const B = tokenize(b);

    // 앞/뒤 공통 부분은 미리 잘라내서 계산량을 줄임
    let start = 0;
    while (start < A.length && start < B.length && key(A[start]) === key(B[start])) start++;
    let endA = A.length;
    let endB = B.length;
    while (endA > start && endB > start && key(A[endA - 1]) === key(B[endB - 1])) { endA--; endB--; }

    const a2 = A.slice(start, endA);
    const b2 = B.slice(start, endB);
    const n = a2.length;
    const m = b2.length;
    const out = [];
    A.slice(0, start).forEach((t) => out.push({ type: 'eq', text: t }));

    if (n * m > 6000000) {
      // 너무 길면 통째로 비교
      a2.forEach((t) => out.push({ type: 'del', text: t }));
      b2.forEach((t) => out.push({ type: 'ins', text: t }));
    } else {
      const w = m + 1;
      const dp = new Uint32Array((n + 1) * w);
      for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
          dp[i * w + j] = key(a2[i]) === key(b2[j])
            ? dp[(i + 1) * w + j + 1] + 1
            : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
        }
      }
      let i = 0;
      let j = 0;
      while (i < n && j < m) {
        if (key(a2[i]) === key(b2[j])) { out.push({ type: 'eq', text: b2[j] }); i++; j++; }
        else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) { out.push({ type: 'del', text: a2[i] }); i++; }
        else { out.push({ type: 'ins', text: b2[j] }); j++; }
      }
      while (i < n) out.push({ type: 'del', text: a2[i++] });
      while (j < m) out.push({ type: 'ins', text: b2[j++] });
    }

    B.slice(endB).forEach((t) => out.push({ type: 'eq', text: t }));
    return merge(out);
  }

  // 공백만 사이에 둔 변경들은 하나로 묶어서 "삭제 → 추가" 순서로 보여줌
  function merge(parts) {
    const res = [];
    let k = 0;
    while (k < parts.length) {
      if (parts[k].type === 'eq') { push(res, parts[k]); k++; continue; }
      let del = '';
      let ins = '';
      let end = k;
      while (end < parts.length) {
        const p = parts[end];
        if (p.type === 'del') del += p.text;
        else if (p.type === 'ins') ins += p.text;
        else if (!p.text.trim() && end + 1 < parts.length && parts[end + 1].type !== 'eq') { del += p.text; ins += p.text; }
        else break;
        end++;
      }
      if (del.trim()) push(res, { type: 'del', text: del });
      if (ins.trim()) push(res, { type: 'ins', text: ins });
      if (!del.trim() && !ins.trim()) push(res, { type: 'eq', text: ins });
      k = end;
    }
    return res;
  }

  function push(res, p) {
    const prev = res[res.length - 1];
    if (prev && prev.type === p.type) prev.text += p.text;
    else res.push({ type: p.type, text: p.text });
  }

  // 연속된 삭제/추가 묶음을 하나의 변경으로 셈
  function countChanges(parts) {
    let n = 0;
    parts.forEach((p, i) => {
      if (p.type !== 'eq' && (i === 0 || parts[i - 1].type === 'eq')) n++;
    });
    return n;
  }

  return { diff, countChanges };
})();
