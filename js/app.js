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
  const pad = (n) => String(n).padStart(2, '0');
  function toYMD(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
  function parseYMD(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function startOfWeek(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); return addDays(x, -((x.getDay() + 6) % 7)); }
  function fmtDate(ymd) { const d = parseYMD(ymd); return `${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEKDAYS[d.getDay()]})`; }
  function fmtShort(d) { return `${d.getMonth() + 1}/${d.getDate()}`; }
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

  function modal(html, { wide } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'modal-backdrop';
    wrap.innerHTML = `<div class="modal ${wide ? 'modal-wide' : ''}" role="dialog"><button class="modal-close" aria-label="닫기">&times;</button>${html}</div>`;
    const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    wrap.addEventListener('click', (e) => { if (e.target === wrap || e.target.closest('.modal-close')) close(); });
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
  function youtubeId(url) {
    const s = (url || '').trim();
    if (/^[\w-]{11}$/.test(s)) return s;
    try {
      const u = new URL(s);
      const host = u.hostname.replace(/^www\.|^m\./, '');
      if (host === 'youtu.be') return u.pathname.slice(1, 12) || null;
      if (host.endsWith('youtube.com') || host === 'youtube-nocookie.com') {
        if (u.searchParams.get('v')) return u.searchParams.get('v').slice(0, 11);
        const m = u.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]{11})/);
        if (m) return m[1];
      }
    } catch (e) { /* not a URL */ }
    return null;
  }
  const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  async function fetchYoutubeTitle(url) {
    const endpoints = [
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`,
      `https://noembed.com/embed?url=${encodeURIComponent(url)}`,
    ];
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep);
        if (!res.ok) continue;
        const data = await res.json();
        if (data.title) return data.title;
      } catch (e) { /* try next */ }
    }
    return '';
  }

  // ================================================================ AI prompt
  function buildReviewPrompt(topic, original) {
    return [
      'You are a friendly English writing tutor for a Korean office worker.',
      `Today's topic: "${topic.title}"${topic.description ? ` (${topic.description})` : ''}`,
      '',
      'Please review my writing below.',
      '1. Give me a corrected version that sounds natural. Keep my original meaning and tone.',
      '2. List each correction with a short explanation in Korean (원래 표현 → 수정 표현: 이유).',
      '3. Suggest 3 useful expressions related to this topic, with example sentences.',
      '',
      'My writing:',
      '"""',
      original.trim(),
      '"""',
    ].join('\n');
  }

  // ================================================================ chrome
  function renderChrome(active) {
    document.getElementById('brandName').textContent = cfg.SITE_NAME;
    document.getElementById('brandMascot').innerHTML = Mascot('happy', 46);
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
        <span>💾 <b>로컬 모드</b> — 데이터가 이 브라우저에만 저장돼요. 동료와 함께 쓰려면 README의 Supabase 설정을 따라주세요.</span>
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
          toast('백업을 가져왔어요.');
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
      ${Mascot('think', 110)}
      <h1>누구인가요?</h1>
      <p class="muted">글을 쓸 멤버를 선택하세요.</p>
      <div class="member-pick">${MEMBERS.map((m) => `<button class="btn btn-lg" data-member="${esc(m)}">${esc(m)}</button>`).join('')}</div>
    </div>`;
    $app.querySelectorAll('[data-member]').forEach((b) => {
      b.onclick = () => { Store.setMember(b.dataset.member); me = b.dataset.member; render(); };
    });
  }

  function viewLogin() {
    renderChrome('');
    $app.innerHTML = `<form class="center-card card" id="loginForm">
      ${Mascot('basic', 110)}
      <h1>로그인</h1>
      <p class="muted">스터디 멤버 계정으로 로그인하세요.</p>
      <label>이메일<input type="email" name="email" required autocomplete="username"></label>
      <label>비밀번호<input type="password" name="password" required autocomplete="current-password"></label>
      <p class="error" id="loginError"></p>
      <button class="btn btn-primary btn-block" type="submit">로그인</button>
    </form>`;
    document.getElementById('loginForm').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target;
      try {
        await Store.signIn(f.email.value.trim(), f.password.value);
        me = await Store.member();
        render();
      } catch (err) {
        document.getElementById('loginError').textContent = err.message;
      }
    };
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
        const saved = await Store.saveTopic(payload);
        m.close();
        toast('주제를 저장했어요.');
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
            <p class="muted">${canManageTopics() ? '흠. 아직 주제가 없어요.' : `${esc(TOPIC_MANAGER)}님이 주제를 정할 예정이에요.`}</p>
            ${canManageTopics() ? `<button class="btn btn-sm" data-new-topic="${ymd}">+ 주제 정하기</button>` : ''}
          </div>${Mascot('think', 64)}</div>`;
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
    $app.innerHTML = `
      <div class="hero">
        <div>
          <div class="hero-title">${esc(me)}! 오늘도 영어 한 줄</div>
          <div class="hero-sub">${doneThisWeek ? '이번 주 글쓰기 다 했다! 굿.' : `주 ${dates.length}번, 쓰고 → AI 검수 → 비교하며 복습하기`}</div>
        </div>
        ${Mascot(doneThisWeek ? 'good' : 'happy', 120)}
      </div>
      <section>
        <div class="section-head">
          <h2>${Paw()} 이번 주 글쓰기</h2>
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
        <div class="section-head"><h2>${Paw()} 진행 현황</h2></div>
        <div class="grid grid-2">${stats}</div>
      </section>
      <section>
        <div class="section-head"><h2>${Paw()} 최근 추가된 영상</h2><a class="btn-link" href="#/videos">전체 보기 →</a></div>
        ${recentVideos ? `<div class="grid grid-4">${recentVideos}</div>` : `<div class="card empty">${Mascot('basic', 80)}<span>아직 영상이 없어요...</span><a href="#/videos">영상 추가하기</a></div>`}
      </section>`;

    document.getElementById('prevWeek').onclick = () => { homeWeekOffset--; render(); };
    document.getElementById('nextWeek').onclick = () => { homeWeekOffset++; render(); };
    const tw = document.getElementById('thisWeek');
    if (tw) tw.onclick = () => { homeWeekOffset = 0; render(); };
    $app.querySelectorAll('[data-new-topic]').forEach((b) => { b.onclick = () => openTopicModal({ date: b.dataset.newTopic }); });
    bindVideoPlayers();
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
        <h2>${Paw()} 영어 글쓰기</h2>
        ${canManageTopics() ? '<button class="btn btn-primary" id="btnNewTopic">+ 새 주제</button>' : ''}
      </div>
      <p class="muted">주 ${cfg.WRITING_DAYS.length}회 (${cfg.WRITING_DAYS.map((d) => WEEKDAYS[d]).join('·')}) 주제에 맞춰 글을 쓰고, AI로 검수한 수정본을 함께 기록해요.</p>
      ${html || `<div class="card empty">${Mascot('think', 90)}아직 주제가 없어요. ${canManageTopics() ? '첫 주제를 정해보세요!' : `${esc(TOPIC_MANAGER)}님이 주제를 정할 예정이에요.`}</div>`}`;
    const btnNew = document.getElementById('btnNewTopic');
    if (btnNew) btnNew.onclick = () => openTopicModal();
  }

  // ================================================================ topic detail
  async function viewTopic(id) {
    renderChrome('writing');
    const [topic, posts] = await Promise.all([Store.getTopic(id), Store.listPosts(id)]);
    if (!topic) { $app.innerHTML = `<div class="card empty">${Mascot('sad', 90)}주제를 찾을 수 없어요... <a href="#/writing">목록으로</a></div>`; return; }
    const byAuthor = Object.fromEntries(posts.map((p) => [p.author, p]));

    const cards = MEMBERS.map((name) => {
      const p = byAuthor[name];
      const st = postStatus(p);
      const href = `#/write/${topic.id}/${encodeURIComponent(name)}`;
      const isMe = name === me;
      let body;
      if (st === 'none') {
        body = `<div class="empty-inline">${Mascot(isMe ? 'think' : 'basic', 80)}${isMe ? '아직 글을 쓰지 않았어요.' : '아직 작성 전이에요...'}</div>`;
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
          <div class="meta muted small">${wordCount(p.original)} words${p.updated_at ? ` · 마지막 수정 ${new Date(p.updated_at).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ''}</div>
          ${p.notes ? `<div class="notes"><div class="notes-title">💡 AI 피드백 / 배운 점</div>${nl2br(p.notes)}</div>` : ''}`;
      }
      const btnLabel = isMe ? (st === 'none' ? '✍️ 글쓰기' : st === 'written' ? '🤖 검수본 입력' : '수정하기') : '편집';
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
      toast('삭제했어요.');
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
        <div class="card step">
          <div class="step-head"><span class="step-no">1</span><h3>직접 쓰기</h3><span class="muted small" id="wcOrig"></span></div>
          <textarea name="original" rows="10" placeholder="주제에 맞춰 영어로 자유롭게 써보세요. 틀려도 괜찮아요!">${esc(post.original)}</textarea>
        </div>

        <div class="card step">
          <div class="step-head"><span class="step-no">2</span><h3>AI 검수</h3></div>
          <p class="muted small">아래 버튼으로 검수 요청 문구를 복사해서 ChatGPT · Claude · Gemini 등에 붙여넣으세요.
            받은 수정본과 피드백을 아래에 입력하면 원문과 비교해서 보여줘요.</p>
          <div class="row-gap wrap">
            <button type="button" class="btn" id="btnPrompt">📋 AI 검수 요청문 복사</button>
            <button type="button" class="btn" id="btnCopyOrig">원문을 수정본 칸에 복사</button>
          </div>
          <label>AI 검수 후 수정본
            <textarea name="revised" rows="10" placeholder="AI가 고쳐준 문장을 붙여넣으세요">${esc(post.revised || '')}</textarea>
          </label>
          <label>AI 피드백 / 배운 표현 메모 <span class="muted">(선택)</span>
            <textarea name="notes" rows="5" placeholder="예) go to home → go home : home은 부사라 to가 필요 없음">${esc(post.notes || '')}</textarea>
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
      document.getElementById('wcOrig').textContent = `${wordCount(f.original.value)} words`;
      const has = f.revised.value.trim() && f.original.value.trim();
      document.getElementById('previewCard').hidden = !has;
      if (has) {
        const parts = TextDiff.diff(f.original.value, f.revised.value);
        document.getElementById('diffPreview').innerHTML = parts.map((p) => (p.type === 'eq' ? esc(p.text) : `<${p.type}>${esc(p.text)}</${p.type}>`)).join('');
        document.getElementById('changeCount').textContent = `${TextDiff.countChanges(parts)}곳 변경`;
      }
    };
    f.addEventListener('input', () => { dirty = true; update(); });
    update();

    document.getElementById('btnPrompt').onclick = async () => {
      if (!f.original.value.trim()) { alert('먼저 원문을 작성해 주세요.'); return; }
      await copyText(buildReviewPrompt(topic, f.original.value));
      toast('검수 요청문을 복사했어요. AI 채팅창에 붙여넣으세요!');
    };
    document.getElementById('btnCopyOrig').onclick = () => {
      if (f.revised.value.trim() && !confirm('수정본 칸의 내용을 원문으로 덮어쓸까요?')) return;
      f.revised.value = f.original.value;
      dirty = true;
      update();
    };

    const leaveGuard = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', leaveGuard);
    window.addEventListener('hashchange', () => window.removeEventListener('beforeunload', leaveGuard), { once: true });

    f.onsubmit = async (e) => {
      e.preventDefault();
      if (!f.original.value.trim()) { alert('원문을 입력해 주세요.'); return; }
      await Store.savePost({
        topic_id: topic.id,
        author,
        original: f.original.value,
        revised: f.revised.value.trim() ? f.revised.value : null,
        notes: f.notes.value.trim() ? f.notes.value : null,
      });
      dirty = false;
      toast('저장했어요!');
      location.hash = `#/topic/${topic.id}`;
    };
    const del = document.getElementById('btnDelPost');
    if (del) {
      del.onclick = async () => {
        if (!confirm('이 글을 삭제할까요?')) return;
        await Store.deletePost(post.id);
        dirty = false;
        toast('삭제했어요.');
        location.hash = `#/topic/${topic.id}`;
      };
    }
  }

  // ================================================================ videos
  function videoCardMini(v) {
    return `<div class="card video-mini">
      <button class="thumb" data-play="${esc(v.youtube_id)}" data-title="${esc(v.title || '')}">
        <img src="${thumb(v.youtube_id)}" alt="" loading="lazy"><span class="play">▶</span>
      </button>
      <div class="video-body">
        ${v.category ? `<span class="badge">${esc(v.category)}</span>` : ''}
        <div class="video-title">${esc(v.title || '(제목 없음)')}</div>
      </div>
    </div>`;
  }

  function bindVideoPlayers() {
    $app.querySelectorAll('[data-play]').forEach((b) => {
      b.onclick = () => {
        modal(`<h2 class="player-title">${esc(b.dataset.title || '')}</h2>
          <div class="player"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.play)}?autoplay=1&rel=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`, { wide: true });
      };
    });
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
        <button class="thumb" data-play="${esc(v.youtube_id)}" data-title="${esc(v.title || '')}">
          <img src="${thumb(v.youtube_id)}" alt="" loading="lazy"><span class="play">▶</span>
        </button>
        <div class="video-body">
          <div class="row-between">
            ${v.category ? `<span class="badge">${esc(v.category)}</span>` : '<span></span>'}
            <span class="row-gap">
              <button class="icon-btn" data-edit-video="${v.id}" title="수정">✎</button>
              <button class="icon-btn" data-del-video="${v.id}" title="삭제">🗑</button>
            </span>
          </div>
          <a class="video-title" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.title || '(제목 없음)')}</a>
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
        <h2>${Paw()} 영어공부 영상</h2>
        <button class="btn btn-primary" id="btnAddVideo">+ 영상 추가</button>
      </div>
      <div class="filters">
        <div class="cat-chips">${cats.map((c) => `<button class="cat ${videoFilter.category === c ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)}${c === '전체' ? ` ${videos.length}` : counts[c] ? ` ${counts[c]}` : ''}</button>`).join('')}</div>
        <input type="search" id="videoSearch" placeholder="제목·메모 검색" value="${esc(videoFilter.q)}">
      </div>
      ${cards ? `<div class="grid grid-3">${cards}</div>` : `<div class="card empty">${Mascot(videos.length ? 'sad' : 'happy', 90)}${videos.length ? '조건에 맞는 영상이 없어요...' : '유튜브 링크를 추가해서 함께 볼 영상을 모아보세요!'}</div>`}`;

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
        toast('삭제했어요.');
        render();
      };
    });
    bindVideoPlayers();
  }

  function openVideoModal(video) {
    const v = video || { url: '', title: '', category: cfg.VIDEO_CATEGORIES[0], memo: '' };
    const m = modal(`<form id="videoForm">
      <h2>${video ? '영상 수정' : '영상 추가'}</h2>
      <label>유튜브 링크<input type="url" name="url" value="${esc(v.url)}" placeholder="https://www.youtube.com/watch?v=..." required></label>
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

    const onUrl = async () => {
      const id = youtubeId(f.url.value);
      preview.innerHTML = id ? `<img src="${thumb(id)}" alt="">` : '';
      m.el.querySelector('#videoError').textContent = f.url.value && !id ? '유튜브 링크를 인식하지 못했어요.' : '';
      if (id && !titleTouched) {
        const title = await fetchYoutubeTitle(f.url.value.trim());
        if (title && !titleTouched) f.title.value = title;
      }
    };
    f.url.addEventListener('change', onUrl);
    f.url.addEventListener('paste', () => setTimeout(onUrl, 0));
    if (v.url) onUrl();

    f.onsubmit = async (e) => {
      e.preventDefault();
      const id = youtubeId(f.url.value);
      if (!id) { m.el.querySelector('#videoError').textContent = '유튜브 링크를 확인해 주세요.'; return; }
      const payload = {
        youtube_id: id,
        url: f.url.value.trim(),
        title: f.title.value.trim(),
        category: f.category.value,
        memo: f.memo.value.trim(),
      };
      if (video) payload.id = video.id; else payload.added_by = me;
      try {
        await Store.saveVideo(payload);
        m.close();
        toast('영상을 저장했어요.');
        render();
      } catch (err) { m.el.querySelector('#videoError').textContent = err.message; }
    };
    f.url.focus();
  }

  // ================================================================ router
  const routes = [
    [/^#?\/?$/, viewHome],
    [/^#\/writing$/, viewWriting],
    [/^#\/topic\/([^/]+)$/, viewTopic],
    [/^#\/write\/([^/]+)\/(.+)$/, viewEditor],
    [/^#\/videos$/, viewVideos],
  ];

  async function render(scrollTop) {
    if (!me) return Store.mode === 'remote' ? viewLogin() : viewPickMember();
    const hash = location.hash || '#/';
    for (const [re, view] of routes) {
      const m = hash.match(re);
      if (m) {
        try { await view(...m.slice(1)); }
        catch (err) {
          console.error(err);
          $app.innerHTML = `<div class="card empty">${Mascot('sad', 90)}문제가 생겼어요: ${esc(err.message)}</div>`;
        }
        if (scrollTop === true) window.scrollTo(0, 0);
        return;
      }
    }
    location.hash = '#/';
  }

  window.addEventListener('hashchange', () => render(true));

  (async function start() {
    try { await Store.init(); } catch (e) { console.error(e); }
    me = await Store.member();
    if (me && Store.mode === 'local' && !MEMBERS.includes(me)) me = null;
    render();
  })();
})();
