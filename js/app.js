(function () {
  const cfg = window.APP_CONFIG;
  const MEMBERS = cfg.MEMBERS.map((m) => m.name);
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const STATUS_LABEL = { none: '미작성', written: '작성완료', reviewed: '검수완료' };
  const $app = document.getElementById('app');

  let me = null;
  let homeWeekOffset = 0;
  let videoFilter = { category: '전체', q: '' };

  // 주제는 TOPIC_MANAGER 로 지정된 멤버만 정할 수 있음 (비워두면 모두 가능)
  const TOPIC_MANAGER = cfg.TOPIC_MANAGER || '';
  const canManageTopics = () => !TOPIC_MANAGER || me === TOPIC_MANAGER;

  // ================================================================ utils
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  // 한글 줄바꿈(keep-all)에서 ")는", "~에게" 처럼 기호 뒤 조사가 다음 줄로 떨어지지 않게 붙여 줌 (U+2060 단어 결합자)
  const glue = (html) => html.replace(/([)\]~]|&quot;|&#39;)((?:<\/?b>)?)(?=[가-힣])/g, '$1\u2060$2');
  // 영어 듣기 — 브라우저 음성 합성(Web Speech API). 지원 안 하는 브라우저에선 버튼을 숨김
  const canSpeak = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  const SPEAKER_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15.5 9c1.2 1.6 1.2 4.4 0 6M18.3 6.6c2.6 3 2.6 7.8 0 10.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  // 듣기용 텍스트: **굵게** 표시와 한국어 괄호 설명 "(이미 약속됨)" 은 빼고 읽기
  const speakable = (s) => String(s || '').replace(/\*\*/g, '').replace(/\([^)]*[가-힣][^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  function speakBtn(text, label = '') {
    const t = speakable(text);
    if (!canSpeak || !t || !/[A-Za-z]/.test(t)) return '';
    return `<button type="button" class="speak${label ? ' speak-label' : ''}" data-speak="${esc(t)}" title="듣기" aria-label="영어 듣기">${SPEAKER_SVG}${label ? `<span>${esc(label)}</span>` : ''}</button>`;
  }
  let enVoice = null;
  function pickVoice() {
    const voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    const pref = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Alex'];
    enVoice = voices.find((v) => pref.some((n) => v.name.includes(n)))
      || voices.find((v) => /en[-_]US/i.test(v.lang)) || voices[0] || null;
  }
  if (canSpeak) { pickVoice(); speechSynthesis.addEventListener?.('voiceschanged', pickVoice); }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-speak]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const wasMe = btn.classList.contains('speaking');
    speechSynthesis.cancel();
    document.querySelectorAll('.speak.speaking').forEach((b) => b.classList.remove('speaking'));
    if (wasMe) return; // 읽는 중에 한 번 더 누르면 멈춤
    const u = new SpeechSynthesisUtterance(btn.dataset.speak);
    u.lang = enVoice ? enVoice.lang : 'en-US';
    if (enVoice) u.voice = enVoice;
    u.rate = 0.92;
    u.onend = u.onerror = () => btn.classList.remove('speaking');
    btn.classList.add('speaking');
    speechSynthesis.speak(u);
  }, true);
  window.addEventListener('hashchange', () => { if (canSpeak) speechSynthesis.cancel(); });

  const pad = (n) => String(n).padStart(2, '0');
  function toYMD(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
  function parseYMD(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function startOfWeek(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); return addDays(x, -((x.getDay() + 6) % 7)); }
  function fmtDate(ymd) { const d = parseYMD(ymd); return `${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEKDAYS[d.getDay()]})`; }
  function fmtShort(d) { return `${d.getMonth() + 1}/${d.getDate()}`; }
  function sentenceCount(s) { return (s || '').split(/[.!?]+(?=\s|$)|\n+/).filter((x) => /[A-Za-z]/.test(x)).length; }
  function wordCount(s) { const m = (s || '').trim().match(/[A-Za-z0-9'’-]+/g); return m ? m.length : 0; }
  const todayYMD = () => toYMD(new Date());
  const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

  function postStatus(p) {
    if (!p || !(p.original || '').trim()) return 'none';
    return (p.revised || '').trim() ? 'reviewed' : 'written';
  }
  function chip(status) { return `<span class="chip chip-${status}">${STATUS_LABEL[status]}</span>`; }

  function writingDatesOfWeek(monday) {
    return cfg.WRITING_DAYS
      .map((d) => (d + 6) % 7)
      .sort((a, b) => a - b)
      .map((off) => toYMD(addDays(monday, off)));
  }

  function nextWritingDate(existingDates) {
    const taken = new Set(existingDates);
    let d = new Date();
    for (let i = 0; i < 60; i++, d = addDays(d, 1)) {
      if (cfg.WRITING_DAYS.includes(d.getDay()) && !taken.has(toYMD(d))) return toYMD(d);
    }
    return todayYMD();
  }

  function groupPosts(posts) {
    const map = {};
    posts.forEach((p) => { (map[p.topic_id] = map[p.topic_id] || {})[p.author] = p; });
    return map;
  }

  let toastTimer;
  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ================================================================ 움직이는 스티커 로딩
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let loaderEl = null;
  let booting = true;

  function showLoader(variant, text, anim, dots = true, solid = false) {
    hideLoader();
    loaderEl = document.createElement('div');
    loaderEl.className = `loader${solid ? ' loader-solid' : ''}`;
    loaderEl.innerHTML = `<div class="loader-box">
      <div class="anim-${anim}">${Mascot(variant, 110)}</div>
      <div class="loader-text">${esc(text)}${dots ? '<span class="dots"></span>' : ''}</div>
    </div>`;
    document.body.appendChild(loaderEl);
  }
  function hideLoader() {
    if (loaderEl) { loaderEl.remove(); loaderEl = null; }
  }

  // 업로드 중에는 스티커가 콩콩 뛰고, 끝나면 "굿." 스티커가 튀어나옴
  async function withUpload(task, doneText) {
    showLoader('cmon', '업로드 중', 'hop');
    try {
      const [result] = await Promise.all([task(), sleep(900)]);
      showLoader('good', doneText, 'pop', false);
      await sleep(900);
      return result;
    } finally {
      hideLoader();
    }
  }

  function modal(html, { wide } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'modal-backdrop';
    wrap.innerHTML = `<div class="modal ${wide ? 'modal-wide' : ''}" role="dialog"><button class="modal-close" aria-label="닫기">&times;</button>${html}</div>`;
    const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    // 바깥(배경)을 눌렀다 뗐을 때만 닫힘 — 안에서 드래그하다 밖에서 떼도 닫히지 않게
    let downOnBackdrop = false;
    wrap.addEventListener('mousedown', (e) => { downOnBackdrop = e.target === wrap; });
    wrap.addEventListener('click', (e) => {
      if ((e.target === wrap && downOnBackdrop) || e.target.closest('.modal-close')) close();
    });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(wrap);
    return { el: wrap, close };
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
  }

  function renderDiff(original, revised) {
    return TextDiff.diff(original, revised).map((p) => {
      if (p.type === 'eq') return esc(p.text);
      return `<${p.type}>${esc(p.text)}</${p.type}>`;
    }).join('');
  }

  // ================================================================ YouTube
  // 유튜브 링크 → { video, playlist }. 영상 링크면 video, 재생목록 링크면 playlist
  function parseYoutube(url) {
    const s = (url || '').trim();
    if (/^[\w-]{11}$/.test(s)) return { video: s, playlist: null };
    try {
      const u = new URL(s);
      const host = u.hostname.replace(/^(www|m|music)\./, '');
      if (host === 'youtu.be') {
        const id = u.pathname.slice(1, 12);
        return id ? { video: id, playlist: null } : null;
      }
      if (host.endsWith('youtube.com') || host === 'youtube-nocookie.com') {
        if (u.searchParams.get('v')) return { video: u.searchParams.get('v').slice(0, 11), playlist: null };
        const m = u.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]{11})/);
        if (m) return { video: m[1], playlist: null };
        const list = u.searchParams.get('list');
        if (list && /^[\w-]{10,}$/.test(list)) return { video: null, playlist: list };
      }
    } catch (e) { /* not a URL */ }
    return null;
  }

  // 공유 링크의 추적용 파라미터(si 등)를 빼고 깔끔한 주소로
  function cleanYoutubeUrl(yt) {
    return yt.video
      ? `https://www.youtube.com/watch?v=${yt.video}`
      : `https://www.youtube.com/playlist?list=${yt.playlist}`;
  }

  const thumbOf = (v) => (v.youtube_id ? `https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg` : v.thumb_url || '');
  const videoTitle = (v) => v.title || (v.playlist_id ? '재생목록' : '(제목 없음)');

  // 제목·썸네일 가져오기 (재생목록은 첫 영상 썸네일)
  async function fetchYoutubeInfo(url) {
    const endpoints = [
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`,
      `https://noembed.com/embed?url=${encodeURIComponent(url)}`,
    ];
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep);
        if (!res.ok) continue;
        const data = await res.json();
        if (data.title) return { title: data.title, thumbnail: data.thumbnail_url || '' };
      } catch (e) { /* try next */ }
    }
    return { title: '', thumbnail: '' };
  }

  // 제목/썸네일이 비어 있는 영상은 열 때 한 번씩 채워 넣음
  const enriched = new Set();
  async function enrichVideos(videos) {
    const todo = videos.filter((v) => !enriched.has(v.id) && (!v.title || (v.playlist_id && !v.thumb_url)));
    if (!todo.length) return;
    let changed = false;
    for (const v of todo) {
      enriched.add(v.id);
      const info = await fetchYoutubeInfo(v.url);
      const patch = { id: v.id };
      if (!v.title && info.title) patch.title = info.title;
      if (v.playlist_id && !v.thumb_url && info.thumbnail) patch.thumb_url = info.thumbnail;
      if (Object.keys(patch).length > 1) {
        try { await Store.saveVideo(patch); changed = true; } catch (e) { /* 다음에 다시 */ }
      }
    }
    if (changed && location.hash === '#/videos') render();
  }

  // config.js 의 DEFAULT_VIDEOS 중 아직 안 넣은 것만 추가 (로컬 모드)
  // 한 번 넣은 항목은 기억해 두어서, 지운 영상이 다시 생기지 않음
  async function seedDefaultVideos() {
    const KEY = 'english-study:seeded-videos:v2';
    if (Store.mode !== 'local') return;
    let done;
    try { done = new Set(JSON.parse(localStorage.getItem(KEY)) || []); } catch (e) { done = new Set(); }
    // 예전 방식(v1)으로 이미 넣은 첫 재생목록 5개는 넣은 것으로 처리
    if (localStorage.getItem('english-study:seeded-videos:v1')) {
      ['PLxoOU8azGw9Wnc1o0bdvfbBJBwa1Q-v9F', 'PLxoOU8azGw9UQ1XEK0SmGje0lZnycvNc1', 'PLxoOU8azGw9X3mcBKRRjcIeD_xoFAcv3Q',
        'PLxoOU8azGw9V7iNiPIlJsiBF39GL3GWna', 'PLXF8cvSejlGkqCgLA793Tyuyvjo5NBKDV'].forEach((id) => done.add(id));
    }
    const existing = await Store.listVideos();
    const base = Date.now();
    for (const [i, item] of (cfg.DEFAULT_VIDEOS || []).entries()) {
      const yt = parseYoutube(item.url);
      if (!yt) continue;
      const key = yt.video || yt.playlist;
      if (done.has(key)) continue;
      done.add(key);
      if (existing.some((v) => (yt.playlist && v.playlist_id === yt.playlist) || (yt.video && v.youtube_id === yt.video))) continue;
      await Store.saveVideo({
        youtube_id: yt.video,
        playlist_id: yt.playlist,
        url: cleanYoutubeUrl(yt),
        title: item.title || '',
        category: item.category || '기타',
        memo: item.memo || '',
        added_by: TOPIC_MANAGER || MEMBERS[0],
        created_at: new Date(base - i * 1000).toISOString(), // 적어둔 순서대로 위에서부터 보이게
      });
    }
    localStorage.setItem(KEY, JSON.stringify([...done]));
  }

  // 썸네일을 누르면 유튜브로 바로 이동 (새 탭, 휴대폰은 유튜브 앱)
  function thumbButton(v) {
    const src = thumbOf(v);
    return `<a class="thumb ${src ? '' : 'thumb-empty'}" href="${esc(v.url)}" target="_blank" rel="noopener" title="유튜브에서 보기">
        ${src ? `<img src="${esc(src)}" alt="" loading="lazy">` : Mascot('study', 70)}
        ${v.playlist_id ? '<span class="pl-badge">재생목록</span>' : ''}
        <span class="play">▶</span>
      </a>`;
  }

  // ================================================================ AI prompt
  // AI(ChatGPT·Claude·Gemini 등)에 붙여넣을 검수 요청문 — 교과서 문법보다 원어민이 실제로 쓰는 영어 기준
  function buildReviewPrompt(topic, original) {
    const text = original.trim();
    return `당신은 미국에서 오래 일한 원어민 영어 코치입니다. 한국인 직장인의 영어 글을 "원어민이 실제로 이렇게 말하고 쓰는가?"를 기준으로 꼼꼼하게 검수해 주세요.
교과서식 문법 설명보다, 원어민이 직장 동료와 대화하거나 메신저·이메일을 쓸 때 실제로 쓰는 표현과 문장 구조를 알려주는 것이 목표입니다.

[주제] ${topic.title}${topic.description ? `\n[주제 설명] ${topic.description}` : ''}
[분량] ${wordCount(text)} words

[검수 기준]
- 문장마다 빠짐없이 확인하고, 제 의미와 내용은 유지하되 새로운 내용은 추가하지 마세요.
- 실제로 틀린 문법(시제, 관사, 전치사, 수 일치, 어순 등)은 [문법]으로 고쳐 주세요.
- 문법은 맞지만 원어민이 잘 쓰지 않는 표현은 [원어민]으로 고쳐 주세요. 특히 아래를 적극적으로 바꿔 주세요.
  · 한국어를 직역한 듯한 표현, 딱딱한 교과서 표현
  · 원어민이 더 자주 쓰는 구동사(phrasal verb), 단어 조합(collocation), 관용 표현
  · 자연스러운 축약형(I'm, don't, it's 등)과 말할 때 쓰는 문장 구조
  · 너무 길거나 단조로운 문장의 자연스러운 연결
- 지나치게 격식 있거나 어려운 단어는 피하고, 직장인이 일상에서 바로 쓸 수 있는 수준으로 맞춰 주세요.
- 고칠 필요가 없는 문장은 그대로 두세요.

[답변 형식] 아래 순서와 형식을 정확히 지켜 주세요. 1번과 2번은 제가 사이트에 그대로 붙여넣어 자동으로 정리합니다.

1. 수정본
- 원어민이 자연스럽게 쓸 수준으로 고친 글 전체를 코드 블록 하나에 넣어 주세요.
- 원문의 문단·줄바꿈 구조를 그대로 유지하고, 코드 블록 안에는 수정된 영어 글만 넣어 주세요.

2. 수정 내역 + 원어민 표현
- 아래 세 가지 형식의 줄만 코드 블록 하나에 넣어 주세요. 한 줄에 하나씩, 설명은 한국어로 짧고 구체적으로 써 주세요.
  [문법] 원래 표현 → 고친 표현 :: 왜 틀렸는지
  [원어민] 원래 표현 → 원어민이 쓰는 표현 :: 왜 원어민은 이렇게 말하는지, 뉘앙스 차이
  [표현] 원어민이 자주 쓰는 표현 :: 뜻 / 언제 쓰는지 / 예문
- [문법]과 [원어민]은 고친 곳마다 빠짐없이 각각 한 줄씩 적어 주세요. (한 문장에 여러 군데면 여러 줄)
- [표현]은 이 주제로 원어민이 실제로 자주 쓰는 구동사·관용 표현·자연스러운 문장 패턴 5개를 적어 주세요.
- 예시:
  [문법] I go to home → I go home :: home은 '집으로'라는 부사라서 to를 쓰지 않아요
  [원어민] I was very tired → I was beat :: 일상 대화에서는 very tired보다 beat, wiped out을 훨씬 자주 써요
  [표현] call it a day :: 오늘 일은 여기까지 하다 / 퇴근하거나 작업을 끝낼 때 / Let's call it a day and grab dinner.

3. 나의 실수 패턴
- 이번 글에서 반복되는 실수나 한국어식 습관 1~3가지와, 원어민처럼 쓰려면 다음에 무엇을 바꾸면 좋을지 알려주세요.

4. 평가
- 문법 정확도 / 원어민다운 자연스러움 / 어휘 다양성 / 내용 전달을 각각 5점 만점으로 매기고, 대략적인 수준(CEFR A2~C1)을 알려주세요.
- 잘한 점 1가지를 꼭 칭찬해 주세요.

[제가 쓴 글]
"""
${text}
"""`;
  }

  // AI 답변 2번(수정 내역 + 원어민 표현)을 줄 단위로 읽어서 정리
  //   [문법] 원래 → 고친 :: 설명 / [원어민] 원래 → 원어민 표현 :: 설명 / [표현] 표현 :: 뜻·예문
  const CORR_KIND = { '문법': 'grammar', grammar: 'grammar', '원어민': 'native', native: 'native', '표현': 'expr', expression: 'expr', phrase: 'expr' };
  function parseCorrections(text) {
    const out = { grammar: [], native: [], expr: [] };
    (text || '').split('\n').forEach((raw) => {
      const line = raw.replace(/[*`]/g, '').trim();
      const m = line.match(/^(?:[-•]\s*)?(?:\d+[.)]\s*)?\[([^\]]+)\]\s*(.+)$/);
      if (!m) return;
      const kind = CORR_KIND[m[1].trim().toLowerCase()];
      if (!kind) return;
      const [body, ...why] = m[2].split('::');
      const note = why.join('::').trim();
      if (kind === 'expr') {
        if (body.trim()) out.expr.push({ phrase: body.trim(), note });
        return;
      }
      const arrow = body.split(/\s*(?:→|->|=>)\s*/);
      if (arrow.length < 2) return;
      out[kind].push({ from: arrow[0].trim(), to: arrow.slice(1).join(' → ').trim(), note });
    });
    return out;
  }

  function renderCorrections(c, { compact } = {}) {
    const item = (x) => `<li><span class="c-from">${esc(x.from)}</span> <span class="c-arrow">→</span> <span class="c-to">${esc(x.to)}</span>${speakBtn(x.to)}${x.note ? `<div class="c-note">${glue(esc(x.note))}</div>` : ''}</li>`;
    const expr = (x) => `<li><span class="c-phrase">${esc(x.phrase)}</span>${speakBtn(x.phrase)}${x.note ? `<div class="c-note">${glue(esc(x.note))}</div>` : ''}</li>`;
    const block = (title, cls, list, fn) => (list.length ? `<div class="corr ${cls}"><div class="corr-title">${title} <span class="corr-count">${list.length}</span></div><ul>${list.map(fn).join('')}</ul></div>` : '');
    const html = block('문법적으로 틀린 것', 'corr-grammar', c.grammar, item)
      + block('원어민은 이렇게 써요', 'corr-native', c.native, item)
      + (compact ? '' : block('원어민이 자주 쓰는 표현', 'corr-expr', c.expr, expr));
    return html;
  }

  // ================================================================ chrome
  function renderChrome(active) {
    document.getElementById('brandName').textContent = cfg.SITE_NAME;
    document.getElementById('brandMascot').innerHTML = Mascot('basic', 46);
    document.title = cfg.SITE_NAME;
    document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === active));

    const userBox = document.getElementById('userBox');
    if (!me) { userBox.innerHTML = ''; }
    else {
      userBox.innerHTML = `<span class="avatar">${esc(me.slice(0, 1))}</span><span class="user-name">${esc(me)}</span>
        <button class="btn-link" id="btnSwitch">${Store.mode === 'remote' ? '로그아웃' : '멤버 변경'}</button>`;
      document.getElementById('btnSwitch').onclick = async () => {
        await Store.signOut();
        me = null;
        render();
      };
    }

    const banner = document.getElementById('modeBanner');
    if (Store.mode === 'local') {
      banner.innerHTML = `<div class="banner"><div class="container banner-inner">
        <span><b>로컬 모드.</b> 데이터가 이 브라우저에만 저장돼요. 동료와 함께 쓰려면 README의 Supabase 설정을 따라주세요.</span>
        <span class="banner-actions"><button class="btn-link" id="btnExport">백업 내보내기</button>
        <label class="btn-link">백업 가져오기<input type="file" id="fileImport" accept="application/json" hidden></label></span>
      </div></div>`;
      document.getElementById('btnExport').onclick = () => {
        const blob = new Blob([JSON.stringify(Store.exportData(), null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `english-study-backup-${todayYMD()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
      };
      document.getElementById('fileImport').onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          Store.importData(JSON.parse(await file.text()));
          toast('백업 가져옴.');
          render();
        } catch (err) { alert(err.message); }
      };
    } else {
      banner.innerHTML = '';
    }
  }

  // ================================================================ auth views
  function viewPickMember() {
    renderChrome('');
    $app.innerHTML = `<div class="center-card card">
      ${Mascot('what', 110)}
      <h1>누구인가요?</h1>
      <p class="muted">글을 쓸 멤버를 선택하세요.</p>
      <div class="member-pick">${MEMBERS.map((m) => `<button class="btn btn-lg" data-member="${esc(m)}">${esc(m)}</button>`).join('')}</div>
    </div>`;
    $app.querySelectorAll('[data-member]').forEach((b) => {
      b.onclick = () => { Store.setMember(b.dataset.member); me = b.dataset.member; render(); };
    });
  }

  function viewLogin(mode = 'login') {
    renderChrome('');
    const isSignup = mode === 'signup';
    $app.innerHTML = `<form class="center-card card" id="loginForm">
      ${Mascot('study', 110)}
      <h1>${isSignup ? '처음이면 가입' : '로그인'}</h1>
      <p class="muted">${isSignup ? '등록된 멤버 이메일로 비밀번호를 만들어요. (한 번만)' : '스터디 멤버 계정으로 로그인하세요.'}</p>
      <label>이메일<input type="email" name="email" required autocomplete="username"></label>
      <label>비밀번호${isSignup ? ' <span class="muted">(6자 이상)</span>' : ''}<input type="password" name="password" required minlength="6" autocomplete="${isSignup ? 'new-password' : 'current-password'}"></label>
      <p class="error" id="loginError"></p>
      <button class="btn btn-primary btn-block" type="submit">${isSignup ? '가입하고 시작' : '로그인'}</button>
      <p class="small" style="margin-top:14px"><button type="button" class="btn-link" id="btnMode">${isSignup ? '이미 가입했으면 로그인' : '처음이면 가입하기'}</button></p>
    </form>`;
    document.getElementById('btnMode').onclick = () => viewLogin(isSignup ? 'login' : 'signup');
    document.getElementById('loginForm').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      const btn = f.querySelector('button[type=submit]');
      btn.disabled = true;
      try {
        if (isSignup) await Store.signUp(f.email.value.trim(), f.password.value);
        else await Store.signIn(f.email.value.trim(), f.password.value);
        me = await Store.member();
        render(true);
      } catch (err) {
        document.getElementById('loginError').textContent = err.message;
        btn.disabled = false;
      }
    };
  }

  // 로그인은 했지만 멤버 목록에 없는 이메일
  function viewNotMember() {
    renderChrome('');
    $app.innerHTML = `<div class="center-card card">
      ${Mascot('sweat', 110)}
      <h1>멤버가 아니에요</h1>
      <p class="muted">${esc(Store.email())} 은(는) 등록된 스터디 멤버 이메일이 아니에요.</p>
      <button class="btn btn-block" id="btnOut">다른 계정으로 로그인</button>
    </div>`;
    document.getElementById('btnOut').onclick = async () => { await Store.signOut(); render(); };
  }

  // ================================================================ topic modal
  async function openTopicModal({ date, topic } = {}) {
    const topics = await Store.listTopics();
    const t = topic || { date: date || nextWritingDate(topics.map((x) => x.date)), title: '', description: '' };
    const m = modal(`<form id="topicForm">
      <h2>${topic ? '주제 수정' : '새 주제'}</h2>
      <label>날짜<input type="date" name="date" value="${esc(t.date)}" required></label>
      <label>주제 (영어)<input type="text" name="title" value="${esc(t.title)}" placeholder="e.g. My morning routine" required></label>
      <label>설명 / 가이드 <span class="muted">(선택)</span><textarea name="description" rows="3" placeholder="어떤 내용을 쓰면 좋을지, 분량 등">${esc(t.description || '')}</textarea></label>
      <div class="row-between">
        <span></span>
        <button type="submit" class="btn btn-primary">저장</button>
      </div>
    </form>`);
    const f = m.el.querySelector('#topicForm');
    f.onsubmit = async (e) => {
      e.preventDefault();
      const payload = { date: f.date.value, title: f.title.value.trim(), description: f.description.value.trim() };
      if (topic) payload.id = topic.id; else payload.created_by = me;
      try {
        const saved = await withUpload(() => Store.saveTopic(payload), '주제 등록. 굿.');
        m.close();
        if (!topic && saved && saved.id) location.hash = `#/topic/${saved.id}`; else render();
      } catch (err) { alert(err.message); }
    };
    f.title.focus();
  }

  // ================================================================ home
  async function viewHome() {
    renderChrome('home');
    const [topics, posts, videos] = await Promise.all([Store.listTopics(), Store.listPosts(), Store.listVideos()]);
    const byDate = Object.fromEntries(topics.map((t) => [t.date, t]));
    const pbt = groupPosts(posts);
    const monday = addDays(startOfWeek(new Date()), homeWeekOffset * 7);
    const dates = writingDatesOfWeek(monday);
    const today = todayYMD();

    const sessions = dates.map((ymd) => {
      const t = byDate[ymd];
      const past = ymd < today;
      const isToday = ymd === today;
      let body;
      if (t) {
        const rows = MEMBERS.map((name) => {
          const st = postStatus((pbt[t.id] || {})[name]);
          const action = name === me && st !== 'reviewed'
            ? `<a class="btn-link" href="#/write/${t.id}/${encodeURIComponent(name)}">${st === 'none' ? '쓰러 가기 →' : '검수본 입력 →'}</a>` : '';
          return `<li><span>${esc(name)}</span><span class="row-gap">${chip(st)}${action}</span></li>`;
        }).join('');
        body = `<a class="session-title" href="#/topic/${t.id}">${esc(t.title)}</a>
          ${t.description ? `<p class="muted small">${esc(t.description)}</p>` : ''}
          <ul class="member-status">${rows}</ul>`;
      } else {
        body = `<div class="session-empty"><div>
            <p class="muted">${canManageTopics() ? '아직 주제 없음.' : `${esc(TOPIC_MANAGER)}님이 정할 예정.`}</p>
            ${canManageTopics() ? `<button class="btn btn-sm" data-new-topic="${ymd}">+ 주제 정하기</button>` : ''}
          </div>${Mascot('think', 84)}</div>`;
      }
      return `<div class="card session ${isToday ? 'session-today' : ''} ${past && !t ? 'session-missed' : ''}">
        <div class="session-date">${fmtDate(ymd)}${isToday ? '<span class="today-badge">오늘</span>' : ''}</div>
        ${body}
      </div>`;
    }).join('');

    // 통계
    const weekTopicIds = new Set(dates.map((d) => byDate[d]).filter(Boolean).map((t) => t.id));
    const stats = MEMBERS.map((name) => {
      const mine = posts.filter((p) => p.author === name);
      const written = mine.filter((p) => postStatus(p) !== 'none').length;
      const reviewed = mine.filter((p) => postStatus(p) === 'reviewed').length;
      const week = mine.filter((p) => weekTopicIds.has(p.topic_id) && postStatus(p) !== 'none').length;
      const words = mine.reduce((s, p) => s + wordCount(p.original), 0);
      return `<div class="card stat">
        <div class="stat-name"><span class="avatar">${esc(name.slice(0, 1))}</span>${esc(name)}</div>
        <div class="stat-grid">
          <div><b>${week}/${dates.length}</b><span>이번 주</span></div>
          <div><b>${written}</b><span>작성한 글</span></div>
          <div><b>${reviewed}</b><span>검수 완료</span></div>
          <div><b>${words.toLocaleString()}</b><span>누적 단어</span></div>
        </div>
      </div>`;
    }).join('');

    const recentVideos = videos.slice(0, 4).map(videoCardMini).join('');

    const doneThisWeek = dates.every((d) => byDate[d] && postStatus((pbt[byDate[d].id] || {})[me]) === 'reviewed');

    // 오늘 할 일: 오늘 주제 → 이번 주 밀린 글 → 다음 주제 → 다음 글쓰기 날 (주제 없음)
    const myStatus = (t) => postStatus((pbt[t.id] || {})[me]);
    const sortedTopics = topics.slice().sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    const weekStart = toYMD(startOfWeek(new Date()));
    const todayTopic = byDate[today];
    const overdue = sortedTopics.filter((t) => t.date < today && t.date >= weekStart && myStatus(t) !== 'reviewed').pop();
    const upcoming = sortedTopics.find((t) => t.date > today);
    let nextDay = null;
    for (let i = 1; i <= 14 && !nextDay; i++) { const d = addDays(new Date(), i); if (cfg.WRITING_DAYS.includes(d.getDay())) nextDay = toYMD(d); }
    const ACTION = { none: '쓰러 가기 →', written: '검수본 입력 →', reviewed: '결과 보기 →' };
    const taskFor = (t, label) => {
      const st = myStatus(t);
      const href = st === 'reviewed' ? `#/topic/${t.id}` : `#/write/${t.id}/${encodeURIComponent(me)}`;
      return `<div class="hero-task">
          <div class="hero-label">${label}${chip(st)}</div>
          <a class="hero-topic" href="#/topic/${t.id}">${esc(t.title)}</a>
          <a class="btn ${st === 'reviewed' ? '' : 'btn-primary'}" href="${href}">${ACTION[st]}</a>
        </div>`;
    };
    let task = '';
    if (todayTopic) task = taskFor(todayTopic, '오늘의 주제');
    else if (overdue) task = taskFor(overdue, `밀린 글 · ${fmtDate(overdue.date)}`);
    else if (upcoming) task = taskFor(upcoming, `다음 주제 · ${fmtDate(upcoming.date)}`);
    else if (nextDay) {
      task = `<div class="hero-task">
          <div class="hero-label">다음 글쓰기 · ${fmtDate(nextDay)}</div>
          ${canManageTopics() ? `<div class="hero-sub">아직 주제 없음.</div><button class="btn btn-primary" data-new-topic="${nextDay}">+ 주제 정하기</button>`
            : `<div class="hero-sub">${esc(TOPIC_MANAGER)}님이 주제를 정할 예정.</div>`}
        </div>`;
    }

    $app.innerHTML = `
      <div class="hero">
        <div class="hero-main">
          <div class="hero-title">${esc(me)}.. 영어 한 줄</div>
          ${task || `<div class="hero-sub">${doneThisWeek ? '이번 주 끝. 굿.' : `주 ${dates.length}번. 쓰고, 검수받고, 비교하기.`}</div>`}
        </div>
        <div class="${doneThisWeek ? 'anim-pop' : 'anim-dance anim-slow'}">${Mascot(doneThisWeek ? 'good' : 'music', 120)}</div>
      </div>
      <section>
        <div class="section-head">
          <h2>이번 주 글쓰기</h2>
          <div class="week-nav">
            <button class="btn btn-sm" id="prevWeek">‹</button>
            <span>${fmtShort(monday)} ~ ${fmtShort(addDays(monday, 6))}</span>
            <button class="btn btn-sm" id="nextWeek">›</button>
            ${homeWeekOffset !== 0 ? '<button class="btn-link" id="thisWeek">이번 주</button>' : ''}
          </div>
        </div>
        <div class="grid grid-3">${sessions}</div>
      </section>
      <section>
        <div class="section-head"><h2>진행 현황</h2></div>
        <div class="grid grid-2">${stats}</div>
      </section>
      <section>
        <div class="section-head"><h2>최근 추가된 영상</h2><a class="btn-link" href="#/videos">전체 보기 →</a></div>
        ${recentVideos ? `<div class="grid grid-4">${recentVideos}</div>` : `<div class="card empty">${Mascot('basic', 80)}<span>아직 영상 없음.</span><a href="#/videos">영상 추가하기</a></div>`}
      </section>`;

    document.getElementById('prevWeek').onclick = () => { homeWeekOffset--; render(); };
    document.getElementById('nextWeek').onclick = () => { homeWeekOffset++; render(); };
    const tw = document.getElementById('thisWeek');
    if (tw) tw.onclick = () => { homeWeekOffset = 0; render(); };
    $app.querySelectorAll('[data-new-topic]').forEach((b) => { b.onclick = () => openTopicModal({ date: b.dataset.newTopic }); });
  }

  // ================================================================ writing list
  async function viewWriting() {
    renderChrome('writing');
    const [topics, posts] = await Promise.all([Store.listTopics(), Store.listPosts()]);
    const pbt = groupPosts(posts);

    const groups = [];
    topics.forEach((t) => {
      const wk = toYMD(startOfWeek(parseYMD(t.date)));
      let g = groups[groups.length - 1];
      if (!g || g.week !== wk) { g = { week: wk, items: [] }; groups.push(g); }
      g.items.push(t);
    });

    const html = groups.map((g) => {
      const mon = parseYMD(g.week);
      const rows = g.items.map((t) => {
        const st = MEMBERS.map((n) => `<span class="member-chip">${esc(n)} ${chip(postStatus((pbt[t.id] || {})[n]))}</span>`).join('');
        return `<a class="topic-row" href="#/topic/${t.id}">
          <span class="topic-date">${fmtDate(t.date)}</span>
          <span class="topic-title">${esc(t.title)}</span>
          <span class="topic-status">${st}</span>
        </a>`;
      }).join('');
      return `<div class="week-group">
        <div class="week-label">${mon.getFullYear()}년 ${fmtShort(mon)} ~ ${fmtShort(addDays(mon, 6))}</div>
        <div class="card list">${rows}</div>
      </div>`;
    }).join('');

    $app.innerHTML = `
      <div class="section-head">
        <h2>영어 글쓰기</h2>
        ${canManageTopics() ? '<button class="btn btn-primary" id="btnNewTopic">+ 새 주제</button>' : ''}
      </div>
      <p class="muted">주 ${cfg.WRITING_DAYS.length}회 (${cfg.WRITING_DAYS.map((d) => WEEKDAYS[d]).join('·')}) 주제에 맞춰 글을 쓰고, AI로 검수한 수정본을 함께 기록해요.</p>
      ${html || `<div class="card empty">${Mascot('dots', 90)}아직 주제 없음. ${canManageTopics() ? '첫 주제를 정해주세요.' : `${esc(TOPIC_MANAGER)}님이 정할 예정.`}</div>`}`;
    const btnNew = document.getElementById('btnNewTopic');
    if (btnNew) btnNew.onclick = () => openTopicModal();
  }

  // ================================================================ topic detail
  // 내 글을 쓰기 전엔 상대 글을 가려 둠 (따라 쓰기 방지). "그래도 보기"를 누른 주제는 이 세션 동안 보임
  const revealedTopics = new Set();
  async function viewTopic(id) {
    renderChrome('writing');
    const [topic, posts] = await Promise.all([Store.getTopic(id), Store.listPosts(id)]);
    if (!topic) { $app.innerHTML = `<div class="card empty">${Mascot('sad', 90)}주제를 찾을 수 없어요... <a href="#/writing">목록으로</a></div>`; return; }
    const byAuthor = Object.fromEntries(posts.map((p) => [p.author, p]));
    const iHaveWritten = postStatus(byAuthor[me]) !== 'none';

    const cards = MEMBERS.map((name) => {
      const p = byAuthor[name];
      const st = postStatus(p);
      const href = `#/write/${topic.id}/${encodeURIComponent(name)}`;
      const isMe = name === me;
      let body;
      if (st === 'none') {
        body = `<div class="empty-inline">${Mascot(isMe ? 'cmon' : 'dots', 80)}${isMe ? '아직 안 씀.' : '아직 작성 전.'}</div>`;
      } else if (!isMe && !iHaveWritten && MEMBERS.includes(me) && !revealedTopics.has(topic.id)) {
        body = `<div class="spoiler">${Mascot('what', 76)}
            <p><b>내 글 먼저 쓰고 보기.</b><br><span class="muted small">먼저 보면 나도 모르게 따라 쓰게 돼요.</span></p>
            <div class="row-gap wrap">
              <a class="btn btn-sm btn-primary" href="#/write/${topic.id}/${encodeURIComponent(me)}">내 글 쓰러 가기</a>
              <button class="btn btn-sm" data-reveal>그래도 보기</button>
            </div>
          </div>`;
      } else {
        const hasRev = st === 'reviewed';
        const changes = hasRev ? TextDiff.countChanges(TextDiff.diff(p.original, p.revised)) : 0;
        body = `<div class="tabs" data-tabs>
            <button data-tab="orig" class="${hasRev ? '' : 'active'}">원문</button>
            <button data-tab="rev" ${hasRev ? '' : 'disabled'}>수정본</button>
            <button data-tab="diff" class="${hasRev ? 'active' : ''}" ${hasRev ? '' : 'disabled'}>비교${hasRev ? ` <small>${changes}</small>` : ''}</button>
          </div>
          <div class="pane text-body" data-pane="orig" ${hasRev ? 'hidden' : ''}>${nl2br(p.original)}</div>
          ${hasRev ? `<div class="pane text-body" data-pane="rev" hidden>${nl2br(p.revised)}</div>
          <div class="pane text-body diff" data-pane="diff">${renderDiff(p.original, p.revised)}</div>` : ''}
          <div class="meta muted small">${hasRev ? `${speakBtn(p.revised, '수정본 듣기')} ` : ''}${wordCount(p.original)} words${p.updated_at ? ` · 마지막 수정 ${new Date(p.updated_at).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ''}</div>
          ${renderCorrections(parseCorrections(p.corrections))}
          ${p.notes ? `<div class="notes"><div class="notes-title">실수 패턴 · 메모.</div>${nl2br(p.notes)}</div>` : ''}`;
      }
      const btnLabel = isMe ? (st === 'none' ? '글쓰기' : st === 'written' ? '검수본 입력' : '수정하기') : '편집';
      const showBtn = isMe || st !== 'none';
      return `<div class="card post">
        <div class="post-head">
          <div class="row-gap"><span class="avatar">${esc(name.slice(0, 1))}</span><b>${esc(name)}</b>${chip(st)}</div>
          ${showBtn ? `<a class="btn btn-sm ${isMe ? 'btn-primary' : ''}" href="${href}">${btnLabel}</a>` : ''}
        </div>
        ${body}
      </div>`;
    }).join('');

    $app.innerHTML = `
      <a href="#/writing" class="back">‹ 글쓰기 목록</a>
      <div class="topic-head card">
        <div>
          <div class="muted">${fmtDate(topic.date)}</div>
          <h1>${esc(topic.title)}</h1>
          ${topic.description ? `<p>${nl2br(topic.description)}</p>` : ''}
        </div>
        ${canManageTopics() ? `<div class="row-gap">
          <button class="btn btn-sm" id="btnEditTopic">주제 수정</button>
          <button class="btn btn-sm btn-danger" id="btnDelTopic">삭제</button>
        </div>` : ''}
      </div>
      <div class="grid grid-2">${cards}</div>`;

    $app.querySelectorAll('[data-reveal]').forEach((b) => { b.onclick = () => { revealedTopics.add(topic.id); render(); }; });
    $app.querySelectorAll('[data-tabs]').forEach((tabs) => {
      const card = tabs.closest('.post');
      tabs.querySelectorAll('button').forEach((b) => {
        b.onclick = () => {
          tabs.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
          card.querySelectorAll('[data-pane]').forEach((pn) => { pn.hidden = pn.dataset.pane !== b.dataset.tab; });
        };
      });
    });
    if (!canManageTopics()) return;
    document.getElementById('btnEditTopic').onclick = () => openTopicModal({ topic });
    document.getElementById('btnDelTopic').onclick = async () => {
      if (!confirm(`"${topic.title}" 주제와 이 주제의 글을 모두 삭제할까요?`)) return;
      await Store.deleteTopic(topic.id);
      toast('삭제함.');
      location.hash = '#/writing';
    };
  }

  // ================================================================ editor
  async function viewEditor(topicId, author) {
    renderChrome('writing');
    author = decodeURIComponent(author);
    const [topic, posts] = await Promise.all([Store.getTopic(topicId), Store.listPosts(topicId)]);
    if (!topic) { $app.innerHTML = '<div class="card empty">주제를 찾을 수 없어요.</div>'; return; }
    const post = posts.find((p) => p.author === author) || { original: '', revised: '', notes: '' };

    $app.innerHTML = `
      <a href="#/topic/${topic.id}" class="back">‹ 주제로 돌아가기</a>
      <div class="topic-head card">
        <div>
          <div class="muted">${fmtDate(topic.date)} · <b>${esc(author)}</b>${author !== me ? ' (다른 멤버의 글)' : ''}</div>
          <h1>${esc(topic.title)}</h1>
          ${topic.description ? `<p>${nl2br(topic.description)}</p>` : ''}
        </div>
      </div>

      <form id="editForm" class="editor">
        <div class="draft-note" id="draftNote" hidden></div>
        <div class="card step">
          <div class="step-head"><span class="step-no">1</span><h3>직접 쓰기</h3><span class="muted small" id="wcOrig"></span></div>
          <textarea name="original" rows="10" lang="en" spellcheck="true" autocapitalize="sentences" placeholder="주제에 맞춰 영어로 자유롭게 써보세요. 틀려도 괜찮아요!">${esc(post.original)}</textarea>
        </div>

        <div class="card step">
          <div class="step-head"><span class="step-no">2</span><h3>AI 검수</h3></div>
          <p class="muted small">아래 버튼으로 검수 요청문을 복사해서 ChatGPT · Claude · Gemini 등에 붙여넣으세요.<br>
            AI 답변의 <b>1번</b>은 수정본 칸, <b>2번</b>은 수정 내역 칸, <b>3~4번</b>은 메모 칸에 붙여넣으면 돼요.</p>
          <div class="row-gap wrap">
            <button type="button" class="btn" id="btnPrompt">AI 검수 요청문 복사</button>
            <button type="button" class="btn" id="btnCopyOrig">원문을 수정본 칸에 복사</button>
          </div>
          <label>AI 검수 후 수정본
            <textarea name="revised" rows="10" lang="en" spellcheck="true" autocapitalize="sentences" placeholder="AI 답변의 1. 수정본(코드 블록 안 영어 글)을 붙여넣으세요">${esc(post.revised || '')}</textarea>
          </label>
          <label>수정 내역 · 원어민 표현 <span class="muted">(AI 답변 2번)</span>
            <textarea name="corrections" rows="9" placeholder="[문법] I go to home → I go home :: home은 부사라 to가 필요 없어요
[원어민] I was very tired → I was beat :: 일상 대화에선 beat를 훨씬 자주 써요
[표현] call it a day :: 오늘 일은 여기까지 하다 / Let's call it a day.">${esc(post.corrections || '')}</textarea>
          </label>
          <div class="corr-preview" id="corrPreview"></div>
          <label>실수 패턴 · 평가 · 메모 <span class="muted">(AI 답변 3~4번, 선택)</span>
            <textarea name="notes" rows="6" placeholder="AI 답변의 3~4번을 붙여넣거나, 기억하고 싶은 것을 적어두세요.">${esc(post.notes || '')}</textarea>
          </label>
        </div>

        <div class="card step" id="previewCard" hidden>
          <div class="step-head"><span class="step-no">✓</span><h3>변경사항 미리보기</h3><span class="muted small" id="changeCount"></span></div>
          <div class="text-body diff" id="diffPreview"></div>
        </div>

        <div class="editor-actions">
          ${post.id ? '<button type="button" class="btn btn-danger" id="btnDelPost">글 삭제</button>' : '<span></span>'}
          <div class="row-gap">
            <a class="btn" href="#/topic/${topic.id}">취소</a>
            <button type="submit" class="btn btn-primary">저장</button>
          </div>
        </div>
      </form>`;

    const f = document.getElementById('editForm');
    let dirty = false;
    const update = () => {
      document.getElementById('wcOrig').textContent = `${wordCount(f.original.value)} words · ${sentenceCount(f.original.value)} sentences`;
      const has = f.revised.value.trim() && f.original.value.trim();
      document.getElementById('previewCard').hidden = !has;
      if (has) {
        const parts = TextDiff.diff(f.original.value, f.revised.value);
        document.getElementById('diffPreview').innerHTML = parts.map((p) => (p.type === 'eq' ? esc(p.text) : `<${p.type}>${esc(p.text)}</${p.type}>`)).join('');
        document.getElementById('changeCount').textContent = `${TextDiff.countChanges(parts)}곳 변경`;
      }
      const c = parseCorrections(f.corrections.value);
      const n = c.grammar.length + c.native.length + c.expr.length;
      document.getElementById('corrPreview').innerHTML = f.corrections.value.trim()
        ? (n ? `인식됨: 문법 ${c.grammar.length} · 원어민 ${c.native.length} · 표현 ${c.expr.length}` : '<span class="error">[문법] / [원어민] / [표현] 으로 시작하는 줄을 찾지 못했어요.</span>')
        : '';
    };
    // 임시 저장: 업로드 전 글을 이 브라우저에 자동 보관 (AI 창 다녀오다 날아가지 않게)
    const draftKey = `english-study:draft:${topic.id}:${author}`;
    const FIELDS = ['original', 'revised', 'corrections', 'notes'];
    const savedVals = Object.fromEntries(FIELDS.map((k) => [k, post[k] || '']));
    const clearDraft = () => { try { localStorage.removeItem(draftKey); } catch (e) { /* 저장소 막힘 */ } };
    let draftTimer;
    const writeDraft = () => {
      clearTimeout(draftTimer);
      draftTimer = setTimeout(() => {
        const vals = Object.fromEntries(FIELDS.map((k) => [k, f[k].value]));
        try {
          if (FIELDS.every((k) => vals[k] === savedVals[k])) localStorage.removeItem(draftKey);
          else localStorage.setItem(draftKey, JSON.stringify({ at: Date.now(), ...vals }));
        } catch (e) { /* 저장소 막힘 */ }
      }, 400);
    };
    let draft = null;
    try { draft = JSON.parse(localStorage.getItem(draftKey) || 'null'); } catch (e) { draft = null; }
    const savedAt = post.updated_at ? Date.parse(post.updated_at) : 0;
    if (draft && FIELDS.some((k) => (draft[k] || '') !== savedVals[k]) && draft.at > savedAt) {
      FIELDS.forEach((k) => { f[k].value = draft[k] || ''; });
      dirty = true;
      const note = document.getElementById('draftNote');
      const when = new Date(draft.at).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      note.innerHTML = `${Mascot('think', 44)}<span><b>업로드 안 한 임시 글을 불러왔어요.</b> <span class="muted">(${esc(when)})</span> 저장을 눌러야 동료에게 보여요.</span>
        <button type="button" class="btn-link" id="btnDiscardDraft">버리기</button>`;
      note.hidden = false;
      document.getElementById('btnDiscardDraft').onclick = () => {
        if (!confirm('임시 글을 버리고 마지막으로 저장한 글로 되돌릴까요?')) return;
        FIELDS.forEach((k) => { f[k].value = savedVals[k]; });
        clearDraft();
        dirty = false;
        note.hidden = true;
        update();
      };
    } else if (draft) clearDraft();

    f.addEventListener('input', () => { dirty = true; update(); writeDraft(); });
    update();

    document.getElementById('btnPrompt').onclick = async () => {
      if (!f.original.value.trim()) { alert('먼저 원문을 작성해 주세요.'); return; }
      await copyText(buildReviewPrompt(topic, f.original.value));
      toast('복사함. AI 채팅창에 붙여넣기.');
    };
    document.getElementById('btnCopyOrig').onclick = () => {
      if (f.revised.value.trim() && !confirm('수정본 칸의 내용을 원문으로 덮어쓸까요?')) return;
      f.revised.value = f.original.value;
      dirty = true;
      update();
      writeDraft();
    };

    const leaveGuard = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', leaveGuard);
    window.addEventListener('hashchange', () => window.removeEventListener('beforeunload', leaveGuard), { once: true });

    f.onsubmit = async (e) => {
      e.preventDefault();
      if (!f.original.value.trim()) { alert('원문을 입력해 주세요.'); return; }
      try {
        await withUpload(() => Store.savePost({
          topic_id: topic.id,
          author,
          original: f.original.value,
          revised: f.revised.value.trim() ? f.revised.value : null,
          corrections: f.corrections.value.trim() ? f.corrections.value : null,
          notes: f.notes.value.trim() ? f.notes.value : null,
        }), '글 업로드 완료. 굿.');
      } catch (err) { alert(err.message); return; }
      clearTimeout(draftTimer);
      clearDraft();
      dirty = false;
      location.hash = `#/topic/${topic.id}`;
    };
    const del = document.getElementById('btnDelPost');
    if (del) {
      del.onclick = async () => {
        if (!confirm('이 글을 삭제할까요?')) return;
        await Store.deletePost(post.id);
        clearTimeout(draftTimer);
        clearDraft();
        dirty = false;
        toast('삭제함.');
        location.hash = `#/topic/${topic.id}`;
      };
    }
  }

  // ================================================================ videos
  function videoCardMini(v) {
    return `<div class="card video-mini">
      ${thumbButton(v)}
      <div class="video-body">
        ${v.category ? `<span class="badge">${esc(v.category)}</span>` : ''}
        <a class="video-title" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(videoTitle(v))}</a>
      </div>
    </div>`;
  }

  async function viewVideos() {
    renderChrome('videos');
    const videos = await Store.listVideos();
    const cats = ['전체', ...cfg.VIDEO_CATEGORIES];
    const counts = {};
    videos.forEach((v) => { counts[v.category] = (counts[v.category] || 0) + 1; });
    const q = videoFilter.q.toLowerCase();
    const list = videos.filter((v) =>
      (videoFilter.category === '전체' || v.category === videoFilter.category) &&
      (!q || `${v.title} ${v.memo} ${v.added_by}`.toLowerCase().includes(q)));

    const cards = list.map((v) => {
      const watched = v.watched_by || [];
      const marks = MEMBERS.map((n) => {
        const on = watched.includes(n);
        return `<button class="watch ${on ? 'on' : ''}" ${n === me ? `data-watch="${v.id}"` : 'disabled'} title="${n === me ? '시청 완료 표시' : ''}">${on ? '✓' : '○'} ${esc(n)}</button>`;
      }).join('');
      return `<div class="card video">
        ${thumbButton(v)}
        <div class="video-body">
          <div class="row-between">
            ${v.category ? `<span class="badge">${esc(v.category)}</span>` : '<span></span>'}
            <span class="row-gap">
              <button class="icon-btn" data-edit-video="${v.id}" title="수정">✎</button>
              <button class="icon-btn" data-del-video="${v.id}" title="삭제">🗑</button>
            </span>
          </div>
          <a class="video-title" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(videoTitle(v))}</a>
          ${v.memo ? `<p class="memo">${nl2br(v.memo)}</p>` : ''}
          <div class="row-between video-foot">
            <span class="muted small">${esc(v.added_by || '')} · ${new Date(v.created_at).toLocaleDateString('ko-KR')}</span>
            <span class="row-gap">${marks}</span>
          </div>
        </div>
      </div>`;
    }).join('');

    $app.innerHTML = `
      <div class="section-head">
        <h2>영어공부 영상</h2>
        <button class="btn btn-primary" id="btnAddVideo">+ 영상 추가</button>
      </div>
      <div class="filters">
        <div class="cat-chips">${cats.map((c) => `<button class="cat ${videoFilter.category === c ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}${c === '전체' ? ` ${videos.length}` : counts[c] ? ` ${counts[c]}` : ''}</button>`).join('')}</div>
        <input type="search" id="videoSearch" placeholder="제목·메모 검색" value="${esc(videoFilter.q)}">
      </div>
      ${cards ? `<div class="grid grid-3">${cards}</div>` : `<div class="card empty">${Mascot(videos.length ? 'dots' : 'basic', 90)}${videos.length ? '그런 영상 없음.' : '유튜브 링크 추가해서 같이 볼 영상 모으기.'}</div>`}`;

    document.getElementById('btnAddVideo').onclick = () => openVideoModal();
    $app.querySelectorAll('[data-cat]').forEach((b) => { b.onclick = () => { videoFilter.category = b.dataset.cat; render(); }; });
    const search = document.getElementById('videoSearch');
    search.oninput = () => {
      videoFilter.q = search.value;
      clearTimeout(search._t);
      search._t = setTimeout(async () => {
        await render();
        const s = document.getElementById('videoSearch');
        s.focus();
        s.setSelectionRange(s.value.length, s.value.length);
      }, 250);
    };
    $app.querySelectorAll('[data-watch]').forEach((b) => {
      b.onclick = async () => {
        const v = videos.find((x) => x.id === b.dataset.watch);
        const w = new Set(v.watched_by || []);
        if (w.has(me)) w.delete(me); else w.add(me);
        await Store.saveVideo({ id: v.id, watched_by: [...w] });
        render();
      };
    });
    $app.querySelectorAll('[data-edit-video]').forEach((b) => {
      b.onclick = () => openVideoModal(videos.find((x) => x.id === b.dataset.editVideo));
    });
    $app.querySelectorAll('[data-del-video]').forEach((b) => {
      b.onclick = async () => {
        const v = videos.find((x) => x.id === b.dataset.delVideo);
        if (!confirm(`"${v.title || '이 영상'}"을(를) 삭제할까요?`)) return;
        await Store.deleteVideo(v.id);
        toast('삭제함.');
        render();
      };
    });
    enrichVideos(videos);
  }

  function openVideoModal(video) {
    const v = video || { url: '', title: '', category: cfg.VIDEO_CATEGORIES[0], memo: '' };
    const m = modal(`<form id="videoForm">
      <h2>${video ? '영상 수정' : '영상 추가'}</h2>
      <label>유튜브 링크<input type="url" name="url" value="${esc(v.url)}" placeholder="영상 또는 재생목록 링크" required></label>
      <div class="video-preview" id="videoPreview"></div>
      <label>제목<input type="text" name="title" value="${esc(v.title || '')}" placeholder="링크를 넣으면 자동으로 채워져요"></label>
      <label>카테고리<select name="category">${cfg.VIDEO_CATEGORIES.map((c) => `<option ${c === v.category ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label>
      <label>메모 <span class="muted">(선택)</span><textarea name="memo" rows="3" placeholder="이 영상에서 배울 점, 추천 이유 등">${esc(v.memo || '')}</textarea></label>
      <p class="error" id="videoError"></p>
      <div class="row-between"><span></span><button type="submit" class="btn btn-primary">저장</button></div>
    </form>`);
    const f = m.el.querySelector('#videoForm');
    const preview = m.el.querySelector('#videoPreview');
    let titleTouched = !!v.title;
    f.title.addEventListener('input', () => { titleTouched = true; });

    let info = { title: '', thumbnail: '' };
    let lastKey = null;
    const onUrl = async () => {
      const yt = parseYoutube(f.url.value);
      m.el.querySelector('#videoError').textContent = f.url.value && !yt ? '유튜브 링크를 인식하지 못했어요.' : '';
      // 같은 링크면 다시 그리지 않음 (저장 버튼 누르는 순간 화면이 밀리지 않게)
      const key = yt ? `${yt.video}|${yt.playlist}` : '';
      if (key === lastKey) return;
      lastKey = key;
      if (!yt) { preview.innerHTML = ''; return; }
      const label = yt.playlist ? '<span class="pl-badge">재생목록</span>' : '';
      preview.innerHTML = yt.video ? `<img src="${thumbOf({ youtube_id: yt.video })}" alt="">${label}` : label;
      info = await fetchYoutubeInfo(cleanYoutubeUrl(yt));
      if (yt.playlist && info.thumbnail) preview.innerHTML = `<img src="${esc(info.thumbnail)}" alt="">${label}`;
      if (info.title && !titleTouched) f.title.value = info.title;
    };
    f.url.addEventListener('change', onUrl);
    f.url.addEventListener('paste', () => setTimeout(onUrl, 0));
    if (v.url) onUrl();

    f.onsubmit = async (e) => {
      e.preventDefault();
      const yt = parseYoutube(f.url.value);
      if (!yt) { m.el.querySelector('#videoError').textContent = '유튜브 링크를 확인해 주세요.'; return; }
      const payload = {
        youtube_id: yt.video,
        playlist_id: yt.playlist,
        thumb_url: yt.playlist ? info.thumbnail || (video && video.thumb_url) || '' : '',
        url: cleanYoutubeUrl(yt),
        title: f.title.value.trim(),
        category: f.category.value,
        memo: f.memo.value.trim(),
      };
      if (video) payload.id = video.id; else payload.added_by = me;
      try {
        await withUpload(() => Store.saveVideo(payload), '영상 등록. 굿.');
        m.close();
        render();
      } catch (err) { m.el.querySelector('#videoError').textContent = err.message; }
    };
    f.url.focus();
  }

  // ================================================================ 표현 노트 (모든 글의 수정 내역 모음)
  // quiz: 가리고 복습 모드, seed: 섞기 순서 (0이면 날짜순)
  let exprFilter = { kind: 'all', who: '전체', q: '', quiz: false, seed: 0 };
  async function viewExpressions() {
    renderChrome('expressions');
    const [topics, posts] = await Promise.all([Store.listTopics(), Store.listPosts()]);
    const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));
    const items = [];
    posts.forEach((p) => {
      const t = topicById[p.topic_id];
      if (!t) return;
      const c = parseCorrections(p.corrections);
      ['grammar', 'native', 'expr'].forEach((kind) => c[kind].forEach((x) => items.push(Object.assign({ kind, author: p.author, topic: t }, x))));
    });
    items.sort((a, b) => (a.topic.date === b.topic.date ? 0 : a.topic.date < b.topic.date ? 1 : -1));
    const counts = { all: items.length, grammar: 0, native: 0, expr: 0 };
    items.forEach((x) => { counts[x.kind]++; });
    const q = exprFilter.q.toLowerCase();
    const list = items.filter((x) =>
      (exprFilter.kind === 'all' || x.kind === exprFilter.kind) &&
      (exprFilter.who === '전체' || x.author === exprFilter.who) &&
      (!q || `${x.from || ''} ${x.to || ''} ${x.phrase || ''} ${x.note}`.toLowerCase().includes(q)));
    const KIND = { grammar: ['문법', 'k-grammar'], native: ['원어민', 'k-native'], expr: ['표현', 'k-expr'] };
    const quiz = exprFilter.quiz;
    if (quiz && exprFilter.seed) {
      const h = (str) => { let v = exprFilter.seed; for (const ch of str) v = Math.imul(v ^ ch.charCodeAt(0), 2654435761) >>> 0; return v; };
      const key = (x) => h(`${x.topic.id}|${x.author}|${x.kind}|${x.from || x.phrase}|${x.to || ''}`);
      list.sort((a, b) => key(a) - key(b));
    }
    // 복습 모드: 문법·원어민은 "고친 문장 + 설명"을, 표현은 "영어 표현"을 가리고 한국어 뜻만 보여줌
    const rows = list.map((x) => {
      const canQuiz = quiz && (x.kind !== 'expr' || !!x.note);
      const isExpr = x.kind === 'expr';
      const answer = isExpr
        ? `<span class="q-ans"><span class="c-phrase">${esc(x.phrase)}</span>${speakBtn(x.phrase)}</span>`
        : `<span class="q-ans"><span class="c-to">${esc(x.to)}</span>${speakBtn(x.to)}</span>`;
      const blank = canQuiz ? `<span class="q-blank">${isExpr ? '영어로는? 탭해서 확인' : '어떻게 고칠까? 탭해서 확인'}</span>` : '';
      const note = x.note ? `<div class="c-note${isExpr ? '' : ' q-ans'}">${glue(esc(x.note))}</div>` : '';
      const main = isExpr
        ? (canQuiz ? `${note}${blank}${answer}` : `${answer}${note}`)
        : `<span class="c-from">${esc(x.from)}</span> <span class="c-arrow">→</span> ${blank}${answer}${note}`;
      return `<li class="${KIND[x.kind][1]}${canQuiz ? ' q-item' : ''}">
        <span class="kind-tag">${KIND[x.kind][0]}</span>
        <div class="expr-main">
          ${main}
          <a class="expr-src" href="#/topic/${x.topic.id}">${fmtDate(x.topic.date)} · ${esc(x.topic.title)} · ${esc(x.author)}</a>
        </div>
      </li>`;
    }).join('');
    const tab = (k, label) => `<button class="cat ${exprFilter.kind === k ? 'active' : ''}" data-kind="${k}">${label} ${counts[k]}</button>`;
    const quizCount = quiz ? (rows.match(/ q-item"/g) || []).length : 0;
    $app.innerHTML = `
      <div class="section-head"><h2>표현 노트</h2></div>
      <p class="muted">글마다 정리한 문법 실수와 원어민 표현이 여기에 모여요. <b>가리고 복습</b>을 켜면 정답을 가려 두고 하나씩 떠올려 볼 수 있어요.</p>
      <div class="filters">
        <div class="cat-chips">${tab('all', '전체')}${tab('native', '원어민')}${tab('grammar', '문법')}${tab('expr', '표현')}
          <button class="cat cat-quiz ${quiz ? 'active' : ''}" id="btnQuiz" aria-pressed="${quiz}">${quiz ? '복습 끄기' : '가리고 복습'}</button></div>
        <div class="row-gap">
          <select id="exprWho">${['전체', ...MEMBERS].map((n) => `<option ${n === exprFilter.who ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>
          <input type="search" id="exprSearch" placeholder="검색" value="${esc(exprFilter.q)}">
        </div>
      </div>
      ${quiz && quizCount ? `<div class="quiz-bar">
          <span id="qProgress">확인 0 / ${quizCount}</span>
          <span class="row-gap"><button class="btn btn-sm" id="btnShuffle">섞기</button><button class="btn btn-sm" id="btnRevealAll">전부 보기</button></span>
        </div>` : ''}
      ${rows ? `<ul class="card expr-list${quiz ? ' quiz' : ''}">${rows}</ul>` : `<div class="card empty">${Mascot(items.length ? 'dots' : 'think', 90)}${items.length ? '조건에 맞는 표현 없음.' : '아직 정리된 표현이 없어요. 글쓰기에서 AI 답변 2번을 수정 내역 칸에 붙여넣어 보세요.'}</div>`}`;
    $app.querySelectorAll('[data-kind]').forEach((b) => { b.onclick = () => { exprFilter.kind = b.dataset.kind; render(); }; });
    document.getElementById('btnQuiz').onclick = () => { exprFilter.quiz = !exprFilter.quiz; exprFilter.seed = 0; render(); };
    if (quiz && quizCount) {
      const listEl = $app.querySelector('.expr-list');
      const progress = () => { document.getElementById('qProgress').textContent = `확인 ${listEl.querySelectorAll('.q-item.revealed').length} / ${quizCount}`; };
      listEl.onclick = (e) => {
        if (e.target.closest('a')) return;
        const li = e.target.closest('.q-item');
        if (!li) return;
        li.classList.toggle('revealed');
        progress();
      };
      document.getElementById('btnShuffle').onclick = () => { exprFilter.seed = (Math.random() * 2 ** 31) | 1; render(); };
      document.getElementById('btnRevealAll').onclick = () => { listEl.querySelectorAll('.q-item').forEach((li) => li.classList.add('revealed')); progress(); };
    }
    document.getElementById('exprWho').onchange = (e) => { exprFilter.who = e.target.value; render(); };
    const search = document.getElementById('exprSearch');
    search.oninput = () => {
      exprFilter.q = search.value;
      clearTimeout(search._t);
      search._t = setTimeout(async () => {
        await render();
        const el = document.getElementById('exprSearch');
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }, 250);
    };
  }

  // ================================================================ 문법 개념 (js/grammar.js)
  // **굵게** 만 지원하는 간단한 서식
  const fmt = (t) => glue(esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'));

  function viewGrammar(id) {
    renderChrome('grammar');
    const cats = window.GRAMMAR || [];
    const cat = cats.find((c) => c.id === id) || cats[0];
    const idx = cats.indexOf(cat);
    const prev = cats[idx - 1];
    const next = cats[idx + 1];
    const examples = (list) => (list && list.length ? `<ul class="g-examples">${list.map(([en, ko, note]) => `<li>
        <div class="g-en">${fmt(en)}${speakBtn(en)}</div>
        <div class="g-ko">${fmt(ko)}${note ? ` <span class="g-note">·\u00a0${fmt(note)}</span>` : ''}</div>
      </li>`).join('')}</ul>` : '');
    const sections = (cat.sections || []).map((sec) => `<div class="g-section">
        <h3>${fmt(sec.title)}</h3>
        ${sec.points ? `<ul class="g-points">${sec.points.map((pt) => `<li>${fmt(pt)}</li>`).join('')}</ul>` : ''}
        ${examples(sec.examples)}
      </div>`).join('');

    $app.innerHTML = `
      <div class="section-head"><h2>문법 개념</h2></div>
      <p class="muted">초보자에게 필요한 것부터 순서대로. 1번부터 차근차근.</p>
      <div class="cat-chips g-tabs">${cats.map((c, i) => `<a class="cat ${c === cat ? 'active' : ''}" href="#/grammar/${c.id}">${i + 1}. ${esc(c.title)}</a>`).join('')}</div>

      <article class="card g-card">
        <header class="g-head">
          <div>
            <div class="muted g-sub">${idx + 1} / ${cats.length} · ${esc(cat.sub || '')}</div>
            <h1>${esc(cat.title)}</h1>
            <p class="g-summary">${fmt(cat.summary)}</p>
          </div>
          ${Mascot('study', 90)}
        </header>

        <div class="g-basics">
          <div class="g-label">기초 개념</div>
          <ul>${cat.basics.map((b) => `<li>${fmt(b)}</li>`).join('')}</ul>
        </div>

        ${sections}

        ${cat.native && cat.native.length ? `<div class="corr corr-native"><div class="corr-title">원어민 감각</div><ul>${cat.native.map((n) => `<li>${fmt(n)}</li>`).join('')}</ul></div>` : ''}

        ${cat.mistakes && cat.mistakes.length ? `<div class="corr corr-grammar"><div class="corr-title">자주 하는 실수 <span class="corr-count">${cat.mistakes.length}</span></div><ul>${cat.mistakes.map(([wrong, right, why]) => `<li><span class="c-from">${esc(wrong)}</span> <span class="c-arrow">→</span> <span class="c-to">${esc(right)}</span>${speakBtn(right)}${why ? `<div class="c-note">${fmt(why)}</div>` : ''}</li>`).join('')}</ul></div>` : ''}

        <nav class="g-nav">
          ${prev ? `<a class="btn" href="#/grammar/${prev.id}">‹ ${esc(prev.title)}</a>` : '<span></span>'}
          ${next ? `<a class="btn btn-primary" href="#/grammar/${next.id}">${esc(next.title)} ›</a>` : '<span></span>'}
        </nav>
      </article>`;
    // 모바일에선 카테고리 탭이 가로 스크롤 한 줄 → 지금 보는 카테고리를 가운데로
    const tabs = $app.querySelector('.g-tabs');
    const active = tabs.querySelector('.active');
    if (active && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = active.offsetLeft - tabs.offsetLeft - (tabs.clientWidth - active.offsetWidth) / 2;
  }

  // ================================================================ router
  const routes = [
    [/^#?\/?$/, viewHome],
    [/^#\/writing$/, viewWriting],
    [/^#\/topic\/([^/]+)$/, viewTopic],
    [/^#\/write\/([^/]+)\/(.+)$/, viewEditor],
    [/^#\/videos$/, viewVideos],
    [/^#\/expressions$/, viewExpressions],
    [/^#\/grammar(?:\/([\w-]+))?$/, viewGrammar],
  ];

  async function render(scrollTop) {
    if (!me) {
      if (Store.mode === 'local') return viewPickMember();
      return Store.signedIn() ? viewNotMember() : viewLogin();
    }
    const hash = location.hash || '#/';
    for (const [re, view] of routes) {
      const m = hash.match(re);
      if (m) {
        // 빨리 끝나면 깜빡이지 않도록 조금 기다렸다가 로딩 스티커 표시
        let shown = false;
        const timer = booting ? null : setTimeout(() => { shown = true; showLoader('music', '로딩 중', 'dance'); }, 150);
        try { await view(...m.slice(1)); }
        catch (err) {
          console.error(err);
          $app.innerHTML = `<div class="card empty">${Mascot('sweat', 90)}문제가 생겼어요: ${esc(err.message)}</div>`;
        } finally {
          clearTimeout(timer);
          if (shown) hideLoader();
        }
        if (scrollTop === true) window.scrollTo(0, 0);
        return;
      }
    }
    location.hash = '#/';
  }

  window.addEventListener('hashchange', () => render(true));

  (async function start() {
    // 첫 화면: 춤추는 스티커 로딩
    showLoader('music', '로딩 중', 'dance', true, true);
    const t0 = Date.now();
    try { await Store.init(); } catch (e) { console.error(e); }
    me = await Store.member();
    if (me && Store.mode === 'local' && !MEMBERS.includes(me)) me = null;
    try { await seedDefaultVideos(); } catch (e) { console.error(e); }
    await render();
    await sleep(Math.max(0, 1000 - (Date.now() - t0)));
    hideLoader();
    booting = false;
  })();
})();
