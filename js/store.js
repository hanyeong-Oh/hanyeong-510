// 데이터 저장소 — Supabase 설정이 있으면 공유 DB, 없으면 브라우저(localStorage)에 저장
window.Store = (function () {
  const cfg = window.APP_CONFIG;
  const remote = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const ME_KEY = 'english-study:me';

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
  const byCreatedDesc = (a, b) => (a.created_at < b.created_at ? 1 : -1);
  // 내 노트: 날짜 최신순, 같은 날이면 나중에 쓴 게 위
  const byNoteOrder = (a, b) => byDateDesc(a, b) || byCreatedDesc(a, b);

  // ---------------------------------------------------------------- local
  function localBackend() {
    const KEY = 'english-study:data:v1';
    const empty = () => ({ topics: [], posts: [], videos: [], notes: [], quiz_sets: [] });

    function load() {
      try { return Object.assign(empty(), JSON.parse(localStorage.getItem(KEY)) || {}); }
      catch (e) { return empty(); }
    }
    function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }
    const now = () => new Date().toISOString();

    // 멤버 이름이 바뀌었으면 저장된 데이터의 이름도 바꿔줌
    function applyRenames() {
      const map = cfg.MEMBER_RENAMES || {};
      const rn = (n) => (Object.prototype.hasOwnProperty.call(map, n) ? map[n] : n);
      if (!Object.keys(map).length) return;
      const d = load();
      const before = JSON.stringify(d);
      d.topics.forEach((t) => { t.created_by = rn(t.created_by); });
      d.posts.forEach((p) => { p.author = rn(p.author); });
      d.videos.forEach((v) => { v.added_by = rn(v.added_by); v.watched_by = (v.watched_by || []).map(rn); });
      d.notes.forEach((n) => { n.author = rn(n.author); });
      if (JSON.stringify(d) !== before) save(d);
      const me = localStorage.getItem(ME_KEY);
      if (me && rn(me) !== me) localStorage.setItem(ME_KEY, rn(me));
    }

    return {
      async init() { applyRenames(); },
      async member() { return localStorage.getItem(ME_KEY); },
      signedIn() { return true; },
      email() { return ''; },
      setMember(name) { localStorage.setItem(ME_KEY, name); },
      async signIn() {},
      async signOut() { localStorage.removeItem(ME_KEY); },

      async listTopics() { return load().topics.sort(byDateDesc); },
      async getTopic(id) { return load().topics.find((t) => t.id === id) || null; },
      async saveTopic(t) {
        const d = load();
        // 날짜마다 사람당 주제 하나 (owner 없는 예전 공통 주제도 날짜마다 하나)
        const owner = t.id ? (d.topics.find((x) => x.id === t.id) || {}).owner || null : t.owner || null;
        if (d.topics.some((x) => x.date === t.date && (x.owner || null) === owner && x.id !== t.id)) {
          throw new Error('그 날짜에 이미 내 주제가 있어요.');
        }
        if (t.id) {
          const i = d.topics.findIndex((x) => x.id === t.id);
          d.topics[i] = Object.assign({}, d.topics[i], t);
        } else {
          t = Object.assign({ id: uid(), created_at: now() }, t);
          d.topics.push(t);
        }
        save(d);
        return t;
      },
      async deleteTopic(id) {
        const d = load();
        d.topics = d.topics.filter((t) => t.id !== id);
        d.posts = d.posts.filter((p) => p.topic_id !== id);
        d.notes.forEach((n) => { if (n.topic_id === id) n.topic_id = null; }); // 메모는 남기고 연결만 끊음
        save(d);
      },

      async listPosts(topicId) {
        const posts = load().posts;
        return topicId ? posts.filter((p) => p.topic_id === topicId) : posts;
      },
      async savePost(p) {
        const d = load();
        const i = d.posts.findIndex((x) => x.topic_id === p.topic_id && x.author === p.author);
        const row = Object.assign(i >= 0 ? d.posts[i] : { id: uid(), created_at: now() }, p, { updated_at: now() });
        if (i >= 0) d.posts[i] = row; else d.posts.push(row);
        save(d);
        return row;
      },
      async deletePost(id) {
        const d = load();
        d.posts = d.posts.filter((p) => p.id !== id);
        save(d);
      },

      async listVideos() { return load().videos.sort(byCreatedDesc); },
      async saveVideo(v) {
        const d = load();
        if (v.id) {
          const i = d.videos.findIndex((x) => x.id === v.id);
          d.videos[i] = Object.assign({}, d.videos[i], v);
        } else {
          v = Object.assign({ id: uid(), created_at: now(), watched_by: [] }, v);
          d.videos.push(v);
        }
        save(d);
        return v;
      },
      async deleteVideo(id) {
        const d = load();
        d.videos = d.videos.filter((v) => v.id !== id);
        save(d);
      },

      // 개인 노트 — 로컬 모드에선 같은 브라우저를 쓰면 다른 멤버 노트도 저장돼 있으므로 이름으로 거름
      async listNotes(author) { return load().notes.filter((n) => n.author === author).sort(byNoteOrder); },
      async saveNote(n) {
        const d = load();
        let row;
        if (n.id) {
          const i = d.notes.findIndex((x) => x.id === n.id);
          row = d.notes[i] = Object.assign({}, d.notes[i], n, { updated_at: now() });
        } else {
          row = Object.assign({ id: uid(), created_at: now(), updated_at: now() }, n);
          d.notes.push(row);
        }
        save(d);
        return row;
      },
      async deleteNote(id) {
        const d = load();
        d.notes = d.notes.filter((n) => n.id !== id);
        save(d);
      },

      // 2주 시험 문제 ([구문]/[단어] 줄) — 사람·회차마다 하나
      async getQuizSet(author, periodStart) {
        const row = load().quiz_sets.find((q) => q.author === author && q.period_start === periodStart);
        return row ? row.items : null;
      },
      async saveQuizSet(author, periodStart, items) {
        const d = load();
        d.quiz_sets = d.quiz_sets.filter((q) => !(q.author === author && q.period_start === periodStart));
        d.quiz_sets.push({ author, period_start: periodStart, items, updated_at: now() });
        save(d);
      },

      exportData() { return load(); },
      importData(data) {
        if (!data || !Array.isArray(data.topics) || !Array.isArray(data.posts) || !Array.isArray(data.videos)) {
          throw new Error('올바른 백업 파일이 아니에요.');
        }
        save(Object.assign(empty(), data));
      },
    };
  }

  // ---------------------------------------------------------------- supabase
  function remoteBackend() {
    const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    let session = null;

    function check(res) {
      if (res.error) {
        if (res.error.code === '23505') throw new Error('그 날짜에 이미 내 주제가 있어요.');
        throw new Error(res.error.message);
      }
      return res.data;
    }

    return {
      async init() {
        const { data } = await sb.auth.getSession();
        session = data.session;
      },
      // 멤버 이름은 DB의 members 테이블(이메일 → 이름)에서 가져옴. 멤버가 아니면 null
      async member() {
        if (!session) return null;
        const email = (session.user.email || '').toLowerCase();
        const { data } = await sb.from('members').select('name').eq('email', email).maybeSingle();
        return data ? data.name : null;
      },
      signedIn() { return !!session; },
      email() { return session ? session.user.email : ''; },
      setMember() {},
      async signIn(email, password) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
          if (/not confirmed/i.test(error.message)) throw new Error('등록된 멤버 이메일이 아니에요.');
          throw new Error('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
        }
        session = data.session;
      },
      // 처음 한 번 비밀번호 만들기 (멤버 이메일은 인증 메일 없이 바로 로그인됨)
      async signUp(email, password) {
        const { error } = await sb.auth.signUp({ email, password });
        if (error) {
          if (/already registered|already been registered|exists/i.test(error.message)) throw new Error('이미 가입된 이메일이에요. 로그인해 주세요.');
          if (/password/i.test(error.message)) throw new Error('비밀번호는 6자 이상으로 정해주세요.');
          throw new Error(`가입 실패: ${error.message}`);
        }
        await this.signIn(email, password);
      },
      async signOut() {
        await sb.auth.signOut();
        session = null;
      },

      async listTopics() { return check(await sb.from('topics').select('*').order('date', { ascending: false })); },
      async getTopic(id) { return check(await sb.from('topics').select('*').eq('id', id).maybeSingle()); },
      async saveTopic(t) {
        const q = t.id
          ? sb.from('topics').update(t).eq('id', t.id)
          : sb.from('topics').insert(t);
        return check(await q.select().single());
      },
      async deleteTopic(id) { check(await sb.from('topics').delete().eq('id', id)); },

      async listPosts(topicId) {
        let q = sb.from('posts').select('*');
        if (topicId) q = q.eq('topic_id', topicId);
        return check(await q);
      },
      async savePost(p) {
        const row = Object.assign({}, p, { updated_at: new Date().toISOString() });
        delete row.id;
        return check(await sb.from('posts').upsert(row, { onConflict: 'topic_id,author' }).select().single());
      },
      async deletePost(id) { check(await sb.from('posts').delete().eq('id', id)); },

      async listVideos() { return check(await sb.from('videos').select('*').order('created_at', { ascending: false })); },
      async saveVideo(v) {
        const q = v.id
          ? sb.from('videos').update(v).eq('id', v.id)
          : sb.from('videos').insert(v);
        return check(await q.select().single());
      },
      async deleteVideo(id) { check(await sb.from('videos').delete().eq('id', id)); },

      // 개인 노트 — DB 정책(RLS)으로 본인 노트만 읽고 쓸 수 있음
      async listNotes(author) {
        return check(await sb.from('notes').select('*').eq('author', author)
          .order('date', { ascending: false }).order('created_at', { ascending: false }));
      },
      async saveNote(n) {
        const q = n.id
          ? sb.from('notes').update(Object.assign({}, n, { updated_at: new Date().toISOString() })).eq('id', n.id)
          : sb.from('notes').insert(n);
        return check(await q.select().single());
      },
      async deleteNote(id) { check(await sb.from('notes').delete().eq('id', id)); },

      async getQuizSet(author, periodStart) {
        const rows = check(await sb.from('quiz_sets').select('items').eq('author', author).eq('period_start', periodStart));
        return rows && rows[0] ? rows[0].items : null;
      },
      async saveQuizSet(author, periodStart, items) {
        check(await sb.from('quiz_sets').upsert({ author, period_start: periodStart, items, updated_at: new Date().toISOString() }, { onConflict: 'author,period_start' }));
      },
    };
  }

  const backend = remote ? remoteBackend() : localBackend();
  return Object.assign({ mode: remote ? 'remote' : 'local' }, backend);
})();
