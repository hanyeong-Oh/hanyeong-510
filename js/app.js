(function () {
  const cfg = window.APP_CONFIG;
  const MEMBERS = cfg.MEMBERS.map((m) => m.name);
  const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const STATUS_LABEL = { none: '미작성', writing: '작성중', written: '작성완료', reviewed: '검수완료' };
  const $app = document.getElementById('app');

  let me = null;
  let homeWeekOffset = 0;
  let videoFilter = { category: '전체', q: '' };

  // 주제는 사람마다 각자 정함. TOPIC_MANAGER 는 예전 방식의 공통 주제(owner 없음)를 고칠 수 있는 멤버
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

  // 미작성 → 작성중(status: writing, 나만 내용이 보임) → 작성완료 → 검수완료(수정본 있음)
  function postStatus(p) {
    if (!p || !(p.original || '').trim()) return 'none';
    if (p.status === 'writing') return 'writing';
    return (p.revised || '').trim() ? 'reviewed' : 'written';
  }
  const isDone = (st) => st === 'written' || st === 'reviewed';

  // 작성 기한: 주제 날짜 다음 날까지 (cfg.DEADLINE_DAYS). 작성 완료하면 기한 표시는 사라져요
  const DEADLINE_DAYS = Number.isFinite(cfg.DEADLINE_DAYS) ? cfg.DEADLINE_DAYS : 1;
  const dueOf = (t) => toYMD(addDays(parseYMD(t.date), DEADLINE_DAYS));
  const fmtDue = (ymd) => { const d = parseYMD(ymd); return `${d.getMonth() + 1}/${d.getDate()}(${WEEKDAYS[d.getDay()]})`; };
  function dueBadge(t, st, { always = false } = {}) {
    if (isDone(st)) return '';
    const due = dueOf(t);
    const today = todayYMD();
    if (due < today) return '<span class="due due-over">마감 지남</span>';
    if (due === today) return '<span class="due due-today">오늘 마감</span>';
    if (due === toYMD(addDays(new Date(), 1))) return '<span class="due due-soon">내일 마감</span>';
    return always ? `<span class="due">${fmtDue(due)}까지</span>` : '';
  }

  // 주제는 사람마다 따로 (owner). owner 가 없는 주제는 예전 방식의 공통 주제(둘 다 씀)
  const writersOf = (t) => (t.owner ? [t.owner] : MEMBERS);
  function topicFor(topics, date, name) {
    return topics.find((t) => t.date === date && t.owner === name) || topics.find((t) => t.date === date && !t.owner) || null;
  }
  // 주제는 멤버끼리 서로 대신 정하고 고칠 수 있어요 (글은 각자 자기 주제에만)
  const canSetTopicFor = (name) => name === me || (MEMBERS.includes(me) && MEMBERS.includes(name));
  const canEditTopic = (t) => (t.owner ? canSetTopicFor(t.owner) : canManageTopics());
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

[답변 형식] 아래 순서와 형식을 정확히 지켜 주세요. 1번, 2번, 5번은 제가 사이트에 그대로 붙여넣어 자동으로 정리합니다.

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

5. 꼭 기억할 것
- 이 글을 바탕으로 제가 꼭 외워야 할 영단어·표현 3~5개와 핵심 문법 1~3개를 골라, 아래 형식의 줄만 코드 블록 하나에 넣어 주세요.
  [단어] 영단어 또는 표현 :: 뜻 :: 예문
  [핵심문법] 문법 포인트 :: 쉬운 한국어 설명 :: 예문
- 제 글에서 틀렸거나 어색했던 부분, 이 주제로 다시 쓸 때 바로 쓸 수 있는 것 위주로 골라 주세요.
- 예시:
  [단어] procrastinate :: 미루다 :: I tend to procrastinate on Mondays.
  [핵심문법] used to + 동사원형 :: 예전엔 ~했다 (지금은 안 함) :: I used to live in Busan.

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

  // AI 답변 5번(꼭 기억할 것)을 줄 단위로 읽어서 내 노트 항목으로
  //   [단어] 단어·표현 :: 뜻 :: 예문 / [핵심문법] 문법 포인트 :: 설명 :: 예문 / [문장] 문장 :: 해석
  const REMEMBER_KIND = { '단어': 'word', word: 'word', '핵심문법': 'grammar', '문법': 'grammar', grammar: 'grammar', '문장': 'sentence', sentence: 'sentence' };
  function parseRemember(text) {
    const out = [];
    (text || '').split('\n').forEach((raw) => {
      const line = raw.replace(/[*`]/g, '').trim();
      const m = line.match(/^(?:[-•]\s*)?(?:\d+[.)]\s*)?\[([^\]]+)\]\s*(.+)$/);
      if (!m) return;
      const kind = REMEMBER_KIND[m[1].replace(/\s+/g, '').toLowerCase()];
      if (!kind || /→|->|=>/.test(m[2].split('::')[0])) return; // 수정 내역(2번) 줄은 건너뜀
      const [en, ko, ...rest] = m[2].split('::').map((x) => x.trim());
      if (en) out.push({ kind, en, ko: ko || null, memo: rest.filter(Boolean).join(' / ') || null });
    });
    return out;
  }
  const noteKey = (en) => String(en || '').trim().toLowerCase();
  const isShort = (t) => String(t).trim().split(/\s+/).length <= 4;
  // 수정 내역 한 줄 → 내 노트 항목
  function corrToNote(kind, x) {
    if (kind === 'grammar') return { kind: 'grammar', en: x.to, ko: x.note || null, memo: `✗ ${x.from}` };
    if (kind === 'native') return { kind: isShort(x.to) ? 'word' : 'sentence', en: x.to, ko: x.note || null, memo: `원래: ${x.from}` };
    return { kind: isShort(x.phrase) ? 'word' : 'sentence', en: x.phrase, ko: x.note || null, memo: null };
  }

  // saved: 내 노트에 이미 있는 영어(noteKey) — 주면 줄마다 "+ 노트" 버튼을 붙임
  function renderCorrections(c, { compact, saved } = {}) {
    const saveBtn = (kind, i, en) => {
      if (!saved) return '';
      return saved.has(noteKey(en)) ? '<span class="corr-saved">✓ 노트</span>'
        : `<button type="button" class="corr-save" data-save="${kind}:${i}" title="내 노트에 저장">+ 노트</button>`;
    };
    const item = (kind) => (x, i) => `<li><span class="c-from">${esc(x.from)}</span> <span class="c-arrow">→</span> <span class="c-to">${esc(x.to)}</span>${speakBtn(x.to)}${saveBtn(kind, i, x.to)}${x.note ? `<div class="c-note">${glue(esc(x.note))}</div>` : ''}</li>`;
    const expr = (x, i) => `<li><span class="c-phrase">${esc(x.phrase)}</span>${speakBtn(x.phrase)}${saveBtn('expr', i, x.phrase)}${x.note ? `<div class="c-note">${glue(esc(x.note))}</div>` : ''}</li>`;
    const block = (title, cls, list, fn) => (list.length ? `<div class="corr ${cls}"><div class="corr-title">${title} <span class="corr-count">${list.length}</span></div><ul>${list.map(fn).join('')}</ul></div>` : '');
    const html = block('문법적으로 틀린 것', 'corr-grammar', c.grammar, item('grammar'))
      + block('원어민은 이렇게 써요', 'corr-native', c.native, item('native'))
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
  async function openTopicModal({ date, topic, owner } = {}) {
    const topics = await Store.listTopics();
    owner = topic ? topic.owner : (owner && canSetTopicFor(owner) ? owner : me);
    const datesOf = (name) => topics.filter((x) => writersOf(x).includes(name)).map((x) => x.date);
    const t = topic || { date: date || nextWritingDate(datesOf(owner)), title: '', description: '' };
    const owners = MEMBERS.filter(canSetTopicFor);
    const pickOwner = !topic && owners.length > 1;
    const heading = (name) => (topic ? '주제 수정' : name === me ? '내 주제 정하기' : `${name} 주제 정해 주기`);
    const guide = (name) => (name === me ? '이 날 내가 쓸 주제예요. 동료는 자기 주제를 따로 정해요.' : `이 날 ${name}이(가) 쓸 주제예요. 정해 두면 ${name}도 수정할 수 있어요.`);
    const m = modal(`<form id="topicForm">
      <h2 id="topicHeading">${esc(heading(owner))}</h2>
      ${topic ? (topic.owner && topic.owner !== me ? `<p class="muted small">${esc(topic.owner)}의 주제를 고치고 있어요.</p>` : '') : `<p class="muted small" id="topicGuide">${esc(guide(owner))}</p>`}
      ${pickOwner ? `<div class="field-label">누구 주제</div>
      <div class="cat-chips" id="ownerPick">${owners.map((n) => `<label class="cat ${n === owner ? 'active' : ''}"><input type="radio" name="owner" value="${esc(n)}" ${n === owner ? 'checked' : ''} hidden>${esc(n === me ? `${n} (나)` : n)}</label>`).join('')}</div>` : ''}
      <label>날짜<input type="date" name="date" value="${esc(t.date)}" required></label>
      <label>주제 (영어)<input type="text" name="title" value="${esc(t.title)}" placeholder="e.g. My morning routine" required></label>
      <label>설명 / 가이드 <span class="muted">(선택)</span><textarea name="description" rows="3" placeholder="어떤 내용을 쓰면 좋을지, 분량 등">${esc(t.description || '')}</textarea></label>
      <div class="row-between">
        <span></span>
        <button type="submit" class="btn btn-primary">저장</button>
      </div>
    </form>`);
    const f = m.el.querySelector('#topicForm');
    const pick = m.el.querySelector('#ownerPick');
    if (pick) {
      pick.onchange = () => {
        const prev = owner;
        owner = f.owner.value;
        pick.querySelectorAll('.cat').forEach((l) => l.classList.toggle('active', l.querySelector('input').checked));
        m.el.querySelector('#topicHeading').textContent = heading(owner);
        m.el.querySelector('#topicGuide').textContent = guide(owner);
        // 날짜를 안 건드렸으면 그 사람의 다음 빈 글쓰기 날로
        if (!date && f.date.value === nextWritingDate(datesOf(prev))) f.date.value = nextWritingDate(datesOf(owner));
      };
    }
    f.onsubmit = async (e) => {
      e.preventDefault();
      const payload = { date: f.date.value, title: f.title.value.trim(), description: f.description.value.trim() };
      if (topic) payload.id = topic.id; else { payload.created_by = me; payload.owner = owner; }
      try {
        const saved = await withUpload(() => Store.saveTopic(payload), '주제 등록. 굿.');
        m.close();
        if (!topic && saved && saved.id) location.hash = `#/topic/${saved.id}`; else render();
      } catch (err) { alert(owner && owner !== me ? err.message.replace('내 주제', `${owner} 주제`) : err.message); }
    };
    f.title.focus();
  }

  // ================================================================ home
  async function viewHome() {
    renderChrome('home');
    const [topics, posts, videos] = await Promise.all([Store.listTopics(), Store.listPosts(), Store.listVideos()]);
    const pbt = groupPosts(posts);
    const monday = addDays(startOfWeek(new Date()), homeWeekOffset * 7);
    const dates = writingDatesOfWeek(monday);
    const today = todayYMD();

    const NEXT_STEP = { none: '쓰러 가기 →', writing: '이어 쓰기 →', written: '검수본 입력 →' };
    const sessions = dates.map((ymd) => {
      const past = ymd < today;
      const isToday = ymd === today;
      const anyTopic = topics.some((t) => t.date === ymd);
      // 사람마다 한 줄: 그 사람 주제 + 상태
      const rows = MEMBERS.map((name) => {
        const t = topicFor(topics, ymd, name);
        const isMe = name === me;
        const who = `<span class="avatar">${esc(name.slice(0, 1))}</span>`;
        if (!t) {
          return `<li class="ms-row"><div class="ms-who">${who}<span class="muted">${isMe ? '내 주제 아직' : '주제 아직'}</span></div>
            ${isMe ? `<button class="btn btn-sm" data-new-topic="${ymd}">+ 내 주제</button>` : canSetTopicFor(name) ? `<button class="btn btn-sm" data-new-topic="${ymd}" data-owner="${esc(name)}">+ 주제 정해 주기</button>` : ''}</li>`;
        }
        const st = postStatus((pbt[t.id] || {})[name]);
        const action = isMe && st !== 'reviewed' ? `<a class="btn-link" href="#/write/${t.id}/${encodeURIComponent(name)}">${NEXT_STEP[st]}</a>` : '';
        return `<li class="ms-row"><div class="ms-who">${who}<a class="ms-topic" href="#/topic/${t.id}" title="${esc(t.title)}">${esc(t.title)}</a></div>
          <span class="ms-state">${chip(st)}${dueBadge(t, st)}${action}</span></li>`;
      }).join('');
      return `<div class="card session ${isToday ? 'session-today' : ''} ${past && !anyTopic ? 'session-missed' : ''}">
        <div class="session-date">${fmtDate(ymd)}${isToday ? '<span class="today-badge">오늘</span>' : ''}<span class="session-due">마감 ${fmtDue(toYMD(addDays(parseYMD(ymd), DEADLINE_DAYS)))}</span></div>
        <ul class="member-status">${rows}</ul>
      </div>`;
    }).join('');

    // 통계
    // 작성중인 글은 빼고 '작성 완료'한 글만 셈
    const stats = MEMBERS.map((name) => {
      const done = posts.filter((p) => p.author === name && isDone(postStatus(p)));
      const weekTopicIds = new Set(dates.map((d) => topicFor(topics, d, name)).filter(Boolean).map((t) => t.id));
      const written = done.length;
      const reviewed = done.filter((p) => postStatus(p) === 'reviewed').length;
      const week = done.filter((p) => weekTopicIds.has(p.topic_id)).length;
      const words = done.reduce((s, p) => s + wordCount(p.original), 0);
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

    const doneThisWeek = dates.every((d) => { const t = topicFor(topics, d, me); return t && postStatus((pbt[t.id] || {})[me]) === 'reviewed'; });

    // 오늘 할 일: 오늘 주제 → 이번 주 밀린 글 → 다음 주제 → 다음 글쓰기 날 (주제 없음)
    const myStatus = (t) => postStatus((pbt[t.id] || {})[me]);
    const myTopics = topics.filter((t) => writersOf(t).includes(me)).sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    const weekStart = toYMD(startOfWeek(new Date()));
    const todayTopic = topicFor(topics, today, me);
    const todayIsWritingDay = cfg.WRITING_DAYS.includes(new Date().getDay());
    const dueToday = myTopics.find((t) => t.date < today && dueOf(t) === today && !isDone(myStatus(t)));
    const overdue = myTopics.filter((t) => t.date < today && t.date >= weekStart && myStatus(t) !== 'reviewed').pop();
    const upcoming = myTopics.find((t) => t.date > today);
    let nextDay = null;
    for (let i = 1; i <= 14 && !nextDay; i++) { const d = addDays(new Date(), i); if (cfg.WRITING_DAYS.includes(d.getDay())) nextDay = toYMD(d); }
    const ACTION = { none: '쓰러 가기 →', writing: '이어 쓰기 →', written: '검수본 입력 →', reviewed: '결과 보기 →' };
    const newTopicTask = (ymd, label) => `<div class="hero-task">
          <div class="hero-label">${label} · ${fmtDate(ymd)}</div>
          <div class="hero-sub">아직 내 주제 없음.</div>
          <button class="btn btn-primary" data-new-topic="${ymd}">+ 내 주제 정하기</button>
        </div>`;
    const taskFor = (t, label) => {
      const st = myStatus(t);
      const href = st === 'reviewed' ? `#/topic/${t.id}` : `#/write/${t.id}/${encodeURIComponent(me)}`;
      return `<div class="hero-task">
          <div class="hero-label">${label}${chip(st)}${dueBadge(t, st, { always: true })}</div>
          <a class="hero-topic" href="#/topic/${t.id}">${esc(t.title)}</a>
          <a class="btn ${st === 'reviewed' ? '' : 'btn-primary'}" href="${href}">${ACTION[st]}</a>
        </div>`;
    };
    let task = '';
    if (todayTopic) task = taskFor(todayTopic, '오늘 내 주제');
    else if (dueToday) task = taskFor(dueToday, `${fmtDate(dueToday.date)} 내 주제`);
    else if (todayIsWritingDay) task = newTopicTask(today, '오늘 글쓰기');
    else if (overdue) task = taskFor(overdue, `${isDone(myStatus(overdue)) ? '검수 남은 글' : '밀린 글'} · ${fmtDate(overdue.date)}`);
    else if (upcoming) task = taskFor(upcoming, `다음 내 주제 · ${fmtDate(upcoming.date)}`);
    else if (nextDay) task = newTopicTask(nextDay, '다음 글쓰기');

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
    $app.querySelectorAll('[data-new-topic]').forEach((b) => { b.onclick = () => openTopicModal({ date: b.dataset.newTopic, owner: b.dataset.owner }); });
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
        const st = writersOf(t).map((n) => { const s = postStatus((pbt[t.id] || {})[n]); return `<span class="member-chip">${t.owner ? '' : esc(n)} ${chip(s)}${dueBadge(t, s)}</span>`; }).join('');
        return `<a class="topic-row" href="#/topic/${t.id}">
          <span class="topic-date">${fmtDate(t.date)}</span>
          <span class="topic-title"><span class="topic-owner">${t.owner ? esc(t.owner) : '같이'}</span>${esc(t.title)}</span>
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
        <button class="btn btn-primary" id="btnNewTopic">+ 내 주제</button>
      </div>
      <p class="muted">주 ${cfg.WRITING_DAYS.length}회 (${cfg.WRITING_DAYS.map((d) => WEEKDAYS[d]).join('·')}) 각자 자기 주제를 정해서 글을 쓰고, AI로 검수한 수정본을 함께 기록해요.</p>
      ${html || `<div class="card empty">${Mascot('dots', 90)}아직 주제 없음. 내 주제부터 정해 보세요.</div>`}`;
    const btnNew = document.getElementById('btnNewTopic');
    if (btnNew) btnNew.onclick = () => openTopicModal();
  }

  // ================================================================ topic detail
  // 내 글을 쓰기 전엔 상대 글을 가려 둠 (따라 쓰기 방지). "그래도 보기"를 누른 주제는 이 세션 동안 보임
  const revealedTopics = new Set();
  // 드래그해서 단어장에 넣는 버튼 — 선택이 풀리면 숨김 (리스너는 한 번만 등록)
  let selSaveBtn = null;
  document.addEventListener('selectionchange', () => {
    if (selSaveBtn && !String(window.getSelection() || '').trim()) setTimeout(() => { if (selSaveBtn) selSaveBtn.hidden = true; }, 200);
  });
  async function viewTopic(id) {
    renderChrome('writing');
    const [topic, posts, myNotes] = await Promise.all([Store.getTopic(id), Store.listPosts(id), MEMBERS.includes(me) ? Store.listNotes(me).catch((e) => { console.error(e); return []; }) : []]);
    if (!topic) { $app.innerHTML = `<div class="card empty">${Mascot('sad', 90)}주제를 찾을 수 없어요... <a href="#/writing">목록으로</a></div>`; return; }
    const byAuthor = Object.fromEntries(posts.map((p) => [p.author, p]));
    const iHaveWritten = isDone(postStatus(byAuthor[me]));
    const writers = writersOf(topic);
    // 이 글에서 내 노트로 챙긴 것 (나만 보임)
    let topicNotes = myNotes.filter((n) => n.topic_id === topic.id);
    const savedKeys = new Set(topicNotes.map((n) => noteKey(n.en)));
    const myCorr = byAuthor[me] ? parseCorrections(byAuthor[me].corrections) : null;

    const cards = writers.map((name) => {
      const p = byAuthor[name];
      const st = postStatus(p);
      const href = `#/write/${topic.id}/${encodeURIComponent(name)}`;
      const isMe = name === me;
      let body;
      if (st === 'none') {
        body = `<div class="empty-inline">${Mascot(isMe ? 'cmon' : 'dots', 80)}${isMe ? '아직 안 씀.' : '아직 작성 전.'}</div>`;
      } else if (!isMe && st === 'writing') {
        body = `<div class="empty-inline">${Mascot('study', 80)}작성 중이에요. 다 쓰면 보여요.</div>`;
      } else if (!isMe && !iHaveWritten && writers.includes(me) && MEMBERS.includes(me) && !revealedTopics.has(topic.id)) {
        body = `<div class="spoiler">${Mascot('what', 76)}
            <p><b>내 글 먼저 쓰고 보기.</b><br><span class="muted small">먼저 보면 나도 모르게 따라 쓰게 돼요.</span></p>
            <div class="row-gap wrap">
              <a class="btn btn-sm btn-primary" href="#/write/${topic.id}/${encodeURIComponent(me)}">내 글 쓰러 가기</a>
              <button class="btn btn-sm" data-reveal>그래도 보기</button>
            </div>
          </div>`;
      } else {
        const hasRev = !!(p.revised || '').trim(); // 작성중이어도 내 글은 비교까지 보여줌
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
          ${isMe ? renderCorrections(myCorr, { saved: savedKeys }) : renderCorrections(parseCorrections(p.corrections))}
          ${p.notes ? `<div class="notes"><div class="notes-title">실수 패턴 · 메모.</div>${nl2br(p.notes)}</div>` : ''}
          ${isMe && MEMBERS.includes(me) ? '<div class="remember" id="rememberBox"></div>' : ''}`;
      }
      const btnLabel = isMe ? { none: '글쓰기', writing: '이어 쓰기', written: '검수본 입력', reviewed: '수정하기' }[st] : '편집';
      const showBtn = isMe || isDone(st);
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
          <div class="muted">${fmtDate(topic.date)} · 마감 ${fmtDate(dueOf(topic))}까지 · ${topic.owner ? `<b>${esc(topic.owner)}</b>의 주제` : '같이 쓰는 주제'}</div>
          <h1>${esc(topic.title)}</h1>
          ${topic.description ? `<p>${nl2br(topic.description)}</p>` : ''}
        </div>
        ${canEditTopic(topic) ? `<div class="row-gap">
          <button class="btn btn-sm" id="btnEditTopic">주제 수정</button>
          <button class="btn btn-sm btn-danger" id="btnDelTopic">삭제</button>
        </div>` : ''}
      </div>
      <div class="grid ${writers.length > 1 ? 'grid-2' : 'grid-1'}">${cards}</div>`;

    $app.querySelectorAll('[data-reveal]').forEach((b) => { b.onclick = () => { revealedTopics.add(topic.id); render(); }; });
    setupRemember();
    $app.querySelectorAll('[data-tabs]').forEach((tabs) => {
      const card = tabs.closest('.post');
      tabs.querySelectorAll('button').forEach((b) => {
        b.onclick = () => {
          tabs.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
          card.querySelectorAll('[data-pane]').forEach((pn) => { pn.hidden = pn.dataset.pane !== b.dataset.tab; });
        };
      });
    });
    if (!canEditTopic(topic)) return;
    document.getElementById('btnEditTopic').onclick = () => openTopicModal({ topic });

    // ---- 이 글에서 꼭 기억할 것 (내 카드 안) ----
    function setupRemember() {
      const box = document.getElementById('rememberBox');
      if (!box) return;
      const KIND_CLASS = { word: 'k-word', sentence: 'k-sentence', grammar: 'k-gram', etc: 'k-etc' };
      const kindRadio = (k, label, on) => `<label class="cat ${on ? 'active' : ''}"><input type="radio" name="kind" value="${k}" ${on ? 'checked' : ''} hidden>${label}</label>`;
      box.innerHTML = `
        <div class="remember-head"><b>이 글에서 꼭 기억할 것</b><span class="muted small">내 노트에 저장 · 나만 보여요</span></div>
        <ul class="note-list remember-list" id="rememberList"></ul>
        <form class="remember-add" id="rememberForm" autocomplete="off">
          <div class="note-kinds">${kindRadio('word', '단어', true)}${kindRadio('grammar', '문법', false)}${kindRadio('sentence', '문장', false)}</div>
          <input name="en" lang="en" spellcheck="true" placeholder="영단어 · 문법 포인트 · 문장" required>
          <input name="ko" placeholder="뜻 · 설명 (선택)">
          <button type="submit" class="btn btn-sm btn-primary">추가</button>
        </form>
        <details class="remember-paste">
          <summary>AI 답변 5번 한 번에 붙여넣기</summary>
          <textarea rows="4" id="rememberPaste" placeholder="[단어] procrastinate :: 미루다 :: I tend to procrastinate.\n[핵심문법] used to + 동사원형 :: 예전엔 ~했다 :: I used to live in Busan."></textarea>
          <div class="row-between"><span class="corr-preview" id="rememberParse"></span><button type="button" class="btn btn-sm" id="btnRememberPaste">한 번에 추가</button></div>
        </details>`;
      const list = document.getElementById('rememberList');
      const myCard = box.closest('.post');
      const draw = () => {
        topicNotes.sort((a, b) => (a.created_at < b.created_at ? -1 : 1)); // 챙긴 순서대로
        list.innerHTML = topicNotes.length ? topicNotes.map((n) => `<li class="note ${KIND_CLASS[n.kind] || ''}" data-id="${esc(n.id)}">
            <span class="kind-tag">${(NOTE_KINDS[n.kind] || NOTE_KINDS.etc).label}</span>
            <div class="note-main">
              <div class="note-en">${nl2br(n.en)}${n.kind !== 'grammar' ? speakBtn(n.en) : ''}</div>
              ${n.ko ? `<div class="note-ko">${nl2br(n.ko)}</div>` : ''}
              ${n.memo ? `<div class="note-memo">${nl2br(n.memo)}</div>` : ''}
            </div>
            <div class="note-actions"><button type="button" class="icon-btn" data-rdel title="삭제" aria-label="삭제">✕</button></div>
          </li>`).join('')
          : '<li class="remember-empty muted small">수정 내역의 <b>+ 노트</b>를 누르거나, 글에서 단어를 드래그하거나, 아래에 직접 적어 보세요.</li>';
      };
      draw();

      // 저장 (같은 영어는 한 번만)
      async function addNotes(items) {
        let added = 0;
        for (const it of items) {
          const key = noteKey(it.en);
          if (!key || savedKeys.has(key)) continue;
          const saved = await Store.saveNote(Object.assign({ author: me, date: topic.date, topic_id: topic.id }, it));
          topicNotes.push(saved);
          savedKeys.add(key);
          added++;
        }
        draw();
        // 수정 내역 버튼도 ✓ 로
        myCard.querySelectorAll('.corr-save').forEach((b) => {
          const [kind, i] = b.dataset.save.split(':');
          const x = myCorr[kind][+i];
          if (x && savedKeys.has(noteKey(kind === 'expr' ? x.phrase : x.to))) b.outerHTML = '<span class="corr-saved">✓ 노트</span>';
        });
        toast(added ? `내 노트에 ${added}개 저장.` : '이미 저장돼 있어요.');
        return added;
      }

      // 수정 내역 "+ 노트"
      myCard.addEventListener('click', async (e) => {
        const b = e.target.closest('.corr-save');
        if (!b || !myCorr) return;
        const [kind, i] = b.dataset.save.split(':');
        const x = myCorr[kind] && myCorr[kind][+i];
        if (!x) return;
        b.disabled = true;
        try { await addNotes([corrToNote(kind, x)]); } catch (err) { alert(err.message); b.disabled = false; }
      });

      // 직접 적기
      const f = document.getElementById('rememberForm');
      f.querySelectorAll('input[name=kind]').forEach((r) => {
        r.onchange = () => f.querySelectorAll('.note-kinds .cat').forEach((c) => c.classList.toggle('active', c.querySelector('input').checked));
      });
      f.onsubmit = async (e) => {
        e.preventDefault();
        const en = f.en.value.trim();
        if (!en) return;
        const btn = f.querySelector('button[type=submit]');
        btn.disabled = true;
        try {
          await addNotes([{ kind: f.querySelector('input[name=kind]:checked').value, en, ko: f.ko.value.trim() || null, memo: null }]);
          f.en.value = ''; f.ko.value = '';
          f.en.focus();
        } catch (err) { alert(err.message); }
        btn.disabled = false;
      };

      // AI 답변 5번 붙여넣기
      const paste = document.getElementById('rememberPaste');
      const parseInfo = () => {
        const items = parseRemember(paste.value);
        const cnt = (k) => items.filter((x) => x.kind === k).length;
        document.getElementById('rememberParse').innerHTML = paste.value.trim()
          ? (items.length ? `인식됨: 단어 ${cnt('word')} · 문법 ${cnt('grammar')} · 문장 ${cnt('sentence')}` : '<span class="error">[단어] / [핵심문법] 으로 시작하는 줄이 없어요.</span>')
          : '';
        return items;
      };
      paste.oninput = parseInfo;
      document.getElementById('btnRememberPaste').onclick = async () => {
        const items = parseInfo();
        if (!items.length) { paste.focus(); return; }
        try { await addNotes(items); paste.value = ''; parseInfo(); } catch (err) { alert(err.message); }
      };

      // 삭제
      list.onclick = async (e) => {
        const del = e.target.closest('[data-rdel]');
        if (!del) return;
        const li = del.closest('.note');
        const n = topicNotes.find((x) => x.id === li.dataset.id);
        if (!n || !confirm(`"${n.en.slice(0, 40)}" 를 내 노트에서 지울까요?`)) return;
        try { await Store.deleteNote(n.id); } catch (err) { alert(err.message); return; }
        topicNotes = topicNotes.filter((x) => x.id !== n.id);
        savedKeys.delete(noteKey(n.en));
        draw();
      };

      // 내 글에서 드래그한 단어·문장 → "+ 단어장"
      const selBtn = document.createElement('button');
      selBtn.type = 'button';
      selBtn.className = 'sel-save';
      selBtn.textContent = '+ 단어장';
      selBtn.hidden = true;
      $app.appendChild(selBtn);
      let selText = '';
      const onSelect = () => setTimeout(() => {
        const sel = window.getSelection();
        const t = sel ? sel.toString().replace(/\s+/g, ' ').trim() : '';
        const pane = sel && sel.rangeCount && sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('.post .text-body');
        if (!t || t.length > 120 || !/[A-Za-z]/.test(t) || !pane || !myCard.contains(pane)) { selBtn.hidden = true; return; }
        selText = t;
        const r = sel.getRangeAt(0).getBoundingClientRect();
        selBtn.style.top = `${r.bottom + window.scrollY + 6}px`;
        selBtn.style.left = `${Math.max(8, Math.min(r.left + window.scrollX, document.documentElement.clientWidth - 110))}px`;
        selBtn.hidden = false;
      }, 10);
      myCard.addEventListener('mouseup', onSelect);
      myCard.addEventListener('touchend', onSelect);
      selSaveBtn = selBtn;
      selBtn.onmousedown = (e) => e.preventDefault(); // 누르는 순간 선택이 풀리지 않게
      selBtn.onclick = () => {
        f.en.value = selText;
        const kind = isShort(selText) ? 'word' : 'sentence';
        f.querySelector(`input[name=kind][value=${kind}]`).checked = true;
        f.querySelectorAll('.note-kinds .cat').forEach((c) => c.classList.toggle('active', c.querySelector('input').checked));
        selBtn.hidden = true;
        window.getSelection().removeAllRanges();
        f.scrollIntoView({ block: 'center', behavior: 'smooth' });
        f.ko.focus({ preventScroll: true });
        toast('뜻을 적고 추가를 누르세요.');
      };
    }
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
          <div class="muted">${fmtDate(topic.date)} · 마감 ${fmtDate(dueOf(topic))}까지 ${dueBadge(topic, postStatus(post))} · <b>${esc(author)}</b>${author !== me ? ' (다른 멤버의 글)' : ''}</div>
          <h1>${esc(topic.title)}</h1>
          ${topic.description ? `<p>${nl2br(topic.description)}</p>` : ''}
        </div>
      </div>

      <form id="editForm" class="editor">
        <div class="draft-note" id="draftNote" hidden></div>
        <div class="card step">
          <div class="step-head"><span class="step-no">1</span><h3>직접 쓰기</h3><span class="muted small" id="wcOrig"></span></div>
          <textarea name="original" rows="10" lang="en" spellcheck="true" autocapitalize="sentences" placeholder="주제에 맞춰 영어로 자유롭게 써보세요. 틀려도 괜찮아요!">${esc(post.original)}</textarea>
          ${author === me ? `<div class="step-save">
            <span class="muted small">아직 쓰는 중이면 저장해 두세요. 동료에겐 "작성중"만 보여요.</span>
            <button type="submit" class="btn" data-status="writing">작성중 저장</button>
          </div>` : ''}
        </div>

        <div class="card step">
          <div class="step-head"><span class="step-no">2</span><h3>AI 검수</h3></div>
          <p class="muted small">버튼을 누르면 내 글 + 검수 부탁 문장이 복사돼요. ChatGPT · Claude · Gemini 채팅창에 붙여넣으세요.<br>
            AI 답변의 <b>1번</b>은 수정본 칸, <b>2번</b>은 수정 내역 칸, <b>3~4번</b>은 메모 칸${author === me ? ', <b>5번</b>은 꼭 기억할 것 칸' : ''}에 붙여넣으면 돼요.</p>
          <div class="row-gap wrap">
            <button type="button" class="btn btn-primary" id="btnPrompt">AI에게 보낼 질문 복사</button>
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
          ${author === me ? `<label>꼭 기억할 것 <span class="muted">(AI 답변 5번, 선택 · 저장하면 내 노트로 들어가요)</span>
            <textarea name="remember" rows="5" placeholder="[단어] procrastinate :: 미루다 :: I tend to procrastinate on Mondays.
[핵심문법] used to + 동사원형 :: 예전엔 ~했다 (지금은 안 함) :: I used to live in Busan."></textarea>
          </label>
          <div class="corr-preview" id="rememberPreview"></div>` : ''}
        </div>

        <div class="card step" id="previewCard" hidden>
          <div class="step-head"><span class="step-no">✓</span><h3>변경사항 미리보기</h3><span class="muted small" id="changeCount"></span></div>
          <div class="text-body diff" id="diffPreview"></div>
        </div>

        ${author === me ? '<p class="muted small save-hint"><b>작성 완료</b>: 다 썼어요 (동료에게 글이 보여요)</p>' : ''}
        <div class="editor-actions">
          ${post.id ? '<button type="button" class="btn btn-danger" id="btnDelPost">글 삭제</button>' : '<span></span>'}
          <div class="row-gap wrap">
            <a class="btn" href="#/topic/${topic.id}">취소</a>
            ${author === me
              ? '<button type="submit" class="btn btn-primary" data-status="done">작성 완료</button>'
              : '<button type="submit" class="btn btn-primary">저장</button>'}
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
      if (f.remember) {
        const r = parseRemember(f.remember.value);
        const cnt = (k) => r.filter((x) => x.kind === k).length;
        document.getElementById('rememberPreview').innerHTML = f.remember.value.trim()
          ? (r.length ? `인식됨: 단어 ${cnt('word')} · 문법 ${cnt('grammar')} · 문장 ${cnt('sentence')} → 저장하면 내 노트로` : '<span class="error">[단어] / [핵심문법] 으로 시작하는 줄을 찾지 못했어요.</span>')
          : '';
      }
    };
    // 임시 저장: 업로드 전 글을 이 브라우저에 자동 보관 (AI 창 다녀오다 날아가지 않게)
    const draftKey = `english-study:draft:${topic.id}:${author}`;
    const FIELDS = ['original', 'revised', 'corrections', 'notes', ...(f.remember ? ['remember'] : [])];
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
      note.innerHTML = `${Mascot('think', 44)}<span><b>업로드 안 한 임시 글을 불러왔어요.</b> <span class="muted">(${esc(when)})</span> <b>작성 완료</b>를 눌러야 동료에게 보여요.</span>
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

    const leaveGuard = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', leaveGuard);
    window.addEventListener('hashchange', () => window.removeEventListener('beforeunload', leaveGuard), { once: true });

    // 어느 버튼으로 저장했는지 (작성중 / 작성 완료). 다른 멤버 글 편집은 원래 상태 유지
    let submitStatus = null;
    f.querySelectorAll('button[data-status]').forEach((b) => { b.addEventListener('click', () => { submitStatus = b.dataset.status; }); });
    f.onsubmit = async (e) => {
      e.preventDefault();
      if (!f.original.value.trim()) { alert('원문을 입력해 주세요.'); return; }
      const status = (e.submitter && e.submitter.dataset.status) || submitStatus || post.status || 'done';
      try {
        await withUpload(async () => {
          await Store.savePost({
            topic_id: topic.id,
            author,
            status,
            original: f.original.value,
            revised: f.revised.value.trim() ? f.revised.value : null,
            corrections: f.corrections.value.trim() ? f.corrections.value : null,
            notes: f.notes.value.trim() ? f.notes.value : null,
          });
          // 꼭 기억할 것 → 내 노트 (이 글에 이미 있는 영어는 건너뜀)
          const items = f.remember ? parseRemember(f.remember.value) : [];
          if (items.length) {
            const have = new Set((await Store.listNotes(me)).filter((n) => n.topic_id === topic.id).map((n) => noteKey(n.en)));
            for (const it of items) {
              if (have.has(noteKey(it.en))) continue;
              have.add(noteKey(it.en));
              await Store.saveNote(Object.assign({ author: me, date: topic.date, topic_id: topic.id }, it));
            }
          }
        }, status === 'writing' ? '작성중으로 저장. 이어서 써요.' : '글 업로드 완료. 굿.');
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
      if (!t || (p.author !== me && postStatus(p) === 'writing')) return; // 동료의 작성중 글은 아직 안 보임
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

  // ================================================================ 내 노트 (나만 보는 메모장)
  const NOTE_KINDS = {
    word: { label: '단어', en: '영단어 · 표현', enPh: 'e.g. procrastinate', ko: '뜻', koPh: '미루다, 질질 끌다', memoPh: '예문, 비슷한 말, 발음 팁…', speak: true },
    sentence: { label: '문장', en: '영어 문장', enPh: "e.g. I'm swamped with work today.", ko: '해석', koPh: '오늘 일이 너무 많아.', memoPh: '어디서 봤는지, 언제 쓰는지…', speak: true },
    grammar: { label: '문법', en: '문법 포인트', enPh: 'e.g. used to + 동사원형 vs be used to + -ing', ko: '설명', koPh: '~하곤 했다 / ~에 익숙하다', memoPh: '예문, 헷갈렸던 점…' },
    etc: { label: '기타', en: '내용', enPh: '무엇이든', ko: '설명', koPh: '', memoPh: '' },
  };
  // day: 날짜별 보기 (null = 전체 날짜)
  let noteFilter = { kind: 'all', q: '', hide: false, day: null };
  let noteKind = 'word';   // 입력 칸에서 마지막으로 고른 종류·날짜는 다음 입력 때도 유지
  let noteDate = null;     // null = 오늘

  // 입력 칸 (새 노트 / 수정 모달 공용)
  function noteFields(n) {
    const k = NOTE_KINDS[n.kind] || NOTE_KINDS.word;
    return `<div class="note-kinds" role="radiogroup">${Object.entries(NOTE_KINDS).map(([key, v]) => `<label class="cat ${key === n.kind ? 'active' : ''}"><input type="radio" name="kind" value="${key}" ${key === n.kind ? 'checked' : ''} hidden>${v.label}</label>`).join('')}
        <input type="date" name="date" value="${esc(n.date)}" required aria-label="날짜"></div>
      <label><span data-l="en">${k.en}</span><textarea name="en" rows="${n.kind === 'word' ? 1 : 2}" lang="en" spellcheck="true" required placeholder="${esc(k.enPh)}">${esc(n.en || '')}</textarea></label>
      <label><span data-l="ko">${k.ko}</span> <span class="muted">(선택)</span><textarea name="ko" rows="1" placeholder="${esc(k.koPh)}">${esc(n.ko || '')}</textarea></label>
      <label>메모 <span class="muted">(선택)</span><textarea name="memo" rows="2" placeholder="${esc(k.memoPh)}">${esc(n.memo || '')}</textarea></label>`;
  }
  // 종류를 바꾸면 칸 이름·예시만 바꿈 (써둔 내용은 그대로)
  function bindNoteForm(f, onSubmit) {
    const apply = () => {
      const kind = f.querySelector('input[name=kind]:checked').value;
      const k = NOTE_KINDS[kind];
      f.querySelectorAll('.note-kinds .cat').forEach((c) => c.classList.toggle('active', c.querySelector('input').checked));
      f.querySelector('[data-l=en]').textContent = k.en;
      f.querySelector('[data-l=ko]').textContent = k.ko;
      f.en.placeholder = k.enPh; f.ko.placeholder = k.koPh; f.memo.placeholder = k.memoPh;
      f.en.rows = kind === 'word' ? 1 : 2;
      return kind;
    };
    f.querySelectorAll('input[name=kind]').forEach((r) => { r.onchange = () => { apply(); f.en.focus(); }; });
    // Ctrl/⌘ + Enter 로 저장. 단어는 한 줄이라 Enter 만 눌러도 저장
    f.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.isComposing) return;
      const kind = f.querySelector('input[name=kind]:checked').value;
      if (e.metaKey || e.ctrlKey || (kind === 'word' && e.target === f.en)) { e.preventDefault(); f.requestSubmit(); }
    });
    f.onsubmit = (e) => {
      e.preventDefault();
      const en = f.en.value.trim();
      if (!en) { f.en.focus(); return; }
      onSubmit({ kind: f.querySelector('input[name=kind]:checked').value, date: f.date.value || todayYMD(), en, ko: f.ko.value.trim() || null, memo: f.memo.value.trim() || null });
    };
    return apply;
  }

  async function viewNotes() {
    renderChrome('notes');
    let [notes, topics] = await Promise.all([Store.listNotes(me), Store.listTopics()]);
    const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));
    const today = todayYMD();

    $app.innerHTML = `
      <div class="section-head"><h2>내 노트</h2><span class="muted" id="noteCount"></span></div>
      <p class="muted">나만 보는 메모장. 영단어 · 영어 문장 · 문법을 그날그날 적어 두세요. 동료에게는 안 보여요.</p>
      <form class="card note-form" id="noteForm">
        ${noteFields({ kind: noteKind, date: noteDate || today })}
        <div class="row-between">
          <span class="muted small">${navigator.platform && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'} + Enter 로 저장</span>
          <button type="submit" class="btn btn-primary">메모하기</button>
        </div>
      </form>
      <div class="filters">
        <div class="cat-chips" id="noteTabs"></div>
        <div class="row-gap">
          <input type="search" id="noteSearch" placeholder="노트 검색" value="${esc(noteFilter.q)}">
        </div>
      </div>
      <div class="note-days" id="noteDays"></div>
      <div id="noteList"></div>`;

    const KIND_CLASS = { word: 'k-word', sentence: 'k-sentence', grammar: 'k-gram', etc: 'k-etc' };
    const row = (n) => {
      const k = NOTE_KINDS[n.kind] || NOTE_KINDS.etc;
      const hasAns = !!(n.ko || n.memo);
      const q = noteFilter.hide && hasAns;
      return `<li class="note ${KIND_CLASS[n.kind] || ''}${q ? ' q-item' : ''}" data-id="${esc(n.id)}">
        <span class="kind-tag">${k.label}</span>
        <div class="note-main">
          <div class="note-en">${nl2br(n.en)}${k.speak ? speakBtn(n.en) : ''}</div>
          ${q ? '<span class="q-blank">뜻은? 탭해서 확인</span>' : ''}
          ${n.ko ? `<div class="note-ko q-ans">${nl2br(n.ko)}</div>` : ''}
          ${n.memo ? `<div class="note-memo q-ans">${nl2br(n.memo)}</div>` : ''}
          ${n.topic_id && topicById[n.topic_id] ? `<a class="note-src" href="#/topic/${esc(n.topic_id)}">📝 ${esc(topicById[n.topic_id].title)}</a>` : ''}
        </div>
        <div class="note-actions">
          <button type="button" class="icon-btn" data-edit title="수정" aria-label="수정">✎</button>
          <button type="button" class="icon-btn" data-del title="삭제" aria-label="삭제">✕</button>
        </div>
      </li>`;
    };

    function drawList() {
      const counts = { all: notes.length, word: 0, sentence: 0, grammar: 0, etc: 0 };
      notes.forEach((n) => { counts[n.kind] = (counts[n.kind] || 0) + 1; });
      const todayN = notes.filter((n) => n.date === today).length;
      document.getElementById('noteCount').textContent = notes.length ? `전체 ${notes.length} · 오늘 ${todayN}` : '';
      const tab = (k, label) => `<button type="button" class="cat ${noteFilter.kind === k ? 'active' : ''}" data-nkind="${k}">${label} ${counts[k]}</button>`;
      document.getElementById('noteTabs').innerHTML = tab('all', '전체') + Object.entries(NOTE_KINDS).map(([k, v]) => tab(k, v.label)).join('')
        + `<button type="button" class="cat cat-quiz ${noteFilter.hide ? 'active' : ''}" id="btnNoteHide" aria-pressed="${noteFilter.hide}">${noteFilter.hide ? '가리기 끄기' : '뜻 가리기'}</button>`;

      const q = noteFilter.q.trim().toLowerCase();
      const list = notes.filter((n) => (noteFilter.kind === 'all' || n.kind === noteFilter.kind)
        && (!q || `${n.en} ${n.ko || ''} ${n.memo || ''}`.toLowerCase().includes(q)));
      const days = [];
      list.forEach((n) => {
        let d = days[days.length - 1];
        if (!d || d.date !== n.date) { d = { date: n.date, items: [] }; days.push(d); }
        d.items.push(n);
      });

      // 날짜 고르기 바: 전체 + 메모가 있는 날 (최신순)
      const sel = noteFilter.day;
      const short = (ymd) => { const x = parseYMD(ymd); return `${x.getMonth() + 1}/${x.getDate()} (${WEEKDAYS[x.getDay()]})`; };
      const dayChip = (d) => `<button type="button" class="cat ${sel === d.date ? 'active' : ''}" data-day="${d.date}">${d.date === today ? '오늘' : short(d.date)} <small>${d.items.length}</small></button>`;
      document.getElementById('noteDays').innerHTML = days.length || sel
        ? `<button type="button" class="cat ${sel ? '' : 'active'}" data-day="">전체 날짜 <small>${list.length}</small></button>${days.map(dayChip).join('')}`
        : '';
      const bar = document.getElementById('noteDays');
      const act = bar.querySelector('.active');
      if (act && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = act.offsetLeft - bar.offsetLeft - (bar.clientWidth - act.offsetWidth) / 2;

      const listCls = `card note-list${noteFilter.hide ? ' quiz' : ''}`;
      const empty = (msg) => `<div class="card empty">${Mascot(notes.length ? 'dots' : 'study', 90)}${msg}</div>`;
      let html;
      if (sel) {
        // 하루 보기: 그날 메모를 종류별로 나눠서
        const idx = days.findIndex((d) => d.date === sel);
        const day = days[idx];
        const newer = idx > 0 ? days[idx - 1] : (idx === -1 ? days.find((d) => d.date > sel) : null);
        const older = idx >= 0 ? days[idx + 1] : days.find((d) => d.date < sel);
        const groups = day ? Object.entries(NOTE_KINDS).map(([k, v]) => [k, v, day.items.filter((n) => n.kind === k)]).filter(([, , items]) => items.length) : [];
        html = `<section class="note-day note-day-one">
            <div class="note-day-head">
              <b>${fmtDate(sel)}</b>${sel === today ? '<span class="today-badge">오늘</span>' : ''}<span class="muted">${day ? day.items.length : 0}개</span>
              <span class="note-day-nav">
                <button type="button" class="btn btn-sm" data-day="${older ? older.date : ''}" ${older ? '' : 'disabled'} title="이전 날">‹ 이전 날</button>
                <button type="button" class="btn btn-sm" data-day="${newer ? newer.date : ''}" ${newer ? '' : 'disabled'} title="다음 날">다음 날 ›</button>
              </span>
            </div>
            ${groups.length ? groups.map(([, v, items]) => `<div class="note-kind-group">
                <div class="note-kind-head">${v.label} <span class="muted">${items.length}</span></div>
                <ul class="${listCls}">${items.map(row).join('')}</ul>
              </div>`).join('') : empty('이 날은 조건에 맞는 메모가 없어요.')}
          </section>`;
      } else {
        html = days.length
          ? days.map((d) => `<section class="note-day">
              <button type="button" class="note-day-head note-day-link" data-day="${d.date}" title="이 날만 보기"><b>${fmtDate(d.date)}</b>${d.date === today ? '<span class="today-badge">오늘</span>' : ''}<span class="muted">${d.items.length}개 ›</span></button>
              <ul class="${listCls}">${d.items.map(row).join('')}</ul>
            </section>`).join('')
          : empty(notes.length ? '조건에 맞는 메모 없음.' : '아직 메모 없음. 오늘 본 단어 하나부터.');
      }
      document.getElementById('noteList').innerHTML = html;
    }
    drawList();

    // 새 메모
    const f = document.getElementById('noteForm');
    bindNoteForm(f, async (data) => {
      const btn = f.querySelector('button[type=submit]');
      btn.disabled = true;
      try {
        const saved = await Store.saveNote(Object.assign({ author: me }, data));
        notes = [saved, ...notes].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (a.created_at < b.created_at ? 1 : -1)));
        noteKind = data.kind;
        noteDate = data.date === today ? null : data.date;
        if (noteFilter.day && noteFilter.day !== data.date) noteFilter.day = data.date; // 저장한 날로 이동해서 바로 보이게
        f.en.value = ''; f.ko.value = ''; f.memo.value = '';
        drawList();
        toast('메모함.');
      } catch (err) { alert(err.message); }
      btn.disabled = false;
      f.en.focus();
    });

    // 날짜별 보기
    const pickDay = (e) => {
      const b = e.target.closest('[data-day]');
      if (!b || b.disabled) return false;
      noteFilter.day = b.dataset.day || null;
      drawList();
      document.getElementById('noteDays').scrollIntoView({ block: 'nearest' });
      return true;
    };
    document.getElementById('noteDays').onclick = pickDay;

    // 필터 · 검색 · 가리기
    document.getElementById('noteTabs').onclick = (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.id === 'btnNoteHide') noteFilter.hide = !noteFilter.hide;
      else noteFilter.kind = b.dataset.nkind;
      drawList();
    };
    const search = document.getElementById('noteSearch');
    search.oninput = () => { noteFilter.q = search.value; drawList(); };

    // 수정 · 삭제 · 가린 뜻 보기
    document.getElementById('noteList').onclick = async (e) => {
      if (!e.target.closest('.note') && pickDay(e)) return;
      const li = e.target.closest('.note');
      if (!li) return;
      const n = notes.find((x) => x.id === li.dataset.id);
      if (!n) return;
      if (e.target.closest('[data-del]')) {
        if (!confirm(`"${n.en.slice(0, 40)}" 메모를 삭제할까요?`)) return;
        try { await Store.deleteNote(n.id); } catch (err) { alert(err.message); return; }
        notes = notes.filter((x) => x.id !== n.id);
        drawList();
        toast('삭제함.');
        return;
      }
      if (e.target.closest('[data-edit]')) {
        const m = modal(`<form id="noteEdit"><h2>메모 수정</h2>${noteFields(n)}
          <div class="row-between"><span></span><button type="submit" class="btn btn-primary">저장</button></div></form>`);
        const ef = m.el.querySelector('#noteEdit');
        bindNoteForm(ef, async (data) => {
          try {
            const saved = await Store.saveNote(Object.assign({ id: n.id }, data));
            notes = notes.map((x) => (x.id === n.id ? Object.assign({}, x, saved) : x))
              .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (a.created_at < b.created_at ? 1 : -1)));
            m.close();
            drawList();
            toast('수정함.');
          } catch (err) { alert(err.message); }
        });
        ef.en.focus();
        return;
      }
      if (li.classList.contains('q-item') && !e.target.closest('a, button')) li.classList.toggle('revealed');
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
    // 강의 그림: [이미지 경로, 설명] → 누르면 원본 크기로
    const figures = (list) => (list && list.length ? `<div class="g-figs">${list.map(([src, cap]) => `<figure class="g-fig">
        <a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="${esc(cap || '')}" loading="lazy"></a>
        ${cap ? `<figcaption>${fmt(cap)}</figcaption>` : ''}
      </figure>`).join('')}</div>` : '');
    // 관련 영상: [유튜브 영상 ID 또는 재생목록 ID(PL…), 제목] → 누르면 유튜브로
    const videoLinks = (cat.videos || []).map(([id, title]) => {
      const isList = /^(PL|UU|OL)/.test(id) && id.length > 15;
      const url = isList ? `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}` : `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
      const thumb = isList ? '<span class="g-vthumb g-vthumb-list">▶<small>재생목록</small></span>'
        : `<img class="g-vthumb" src="https://i.ytimg.com/vi/${encodeURIComponent(id)}/mqdefault.jpg" alt="" loading="lazy" onerror="this.outerHTML='<span class=&quot;g-vthumb g-vthumb-list&quot;>▶</span>'">`;
      return `<li><a href="${url}" target="_blank" rel="noopener">${thumb}<span class="g-vtitle">${esc(title)}</span></a></li>`;
    }).join('');
    const sections = (cat.sections || []).map((sec) => `<div class="g-section">
        <h3>${fmt(sec.title)}</h3>
        ${sec.points ? `<ul class="g-points">${sec.points.map((pt) => `<li>${fmt(pt)}</li>`).join('')}</ul>` : ''}
        ${figures(sec.images)}
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

        ${videoLinks ? `<div class="g-videos"><div class="g-label">🎬 관련 영상 <span class="muted small">누르면 유튜브로 열려요</span></div><ul>${videoLinks}</ul></div>` : ''}

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
    [/^#\/notes$/, viewNotes],
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
