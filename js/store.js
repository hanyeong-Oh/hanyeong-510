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

  // ---------------------------------------------------------------- local
  function localBackend() {
    const KEY = 'english-study:data:v1';
    const empty = () => ({ topics: [], posts: [], videos: [] });

    function load() {
      try { return Object.assign(empty(), JSON.parse(localStorage.getItem(KEY)) || {}); }
      catch (e) { return empty(); }
    }
    function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }
    const now = () => new Date().toISOString();

    return {
      async init() {},
      async member() { return localStorage.getItem(ME_KEY); },
      setMember(name) { localStorage.setItem(ME_KEY, name); },
      async signIn() {},
      async signOut() { localStorage.removeItem(ME_KEY); },

      async listTopics() { return load().topics.sort(byDateDesc); },
      async getTopic(id) { return load().topics.find((t) => t.id === id) || null; },
      async saveTopic(t) {
        const d = load();
        if (d.topics.some((x) => x.date === t.date && x.id !== t.id)) {
          throw new Error('이미 그 날짜에 주제가 있어요.');
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

      exportData() { return load(); },
      importData(data) {
        if (!data || !Array.isArray(data.topics) || !Array.isArray(data.posts) || !Array.isArray(data.videos)) {
          throw new Error('올바른 백업 파일이 아니에요.');
        }
        save(data);
      },
    };
  }

  // ---------------------------------------------------------------- supabase
  function remoteBackend() {
    const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    let session = null;

    function check(res) {
      if (res.error) {
        if (res.error.code === '23505') throw new Error('이미 그 날짜에 주제가 있어요.');
        throw new Error(res.error.message);
      }
      return res.data;
    }

    return {
      async init() {
        const { data } = await sb.auth.getSession();
        session = data.session;
      },
      async member() {
        if (!session) return null;
        const email = (session.user.email || '').toLowerCase();
        const m = cfg.MEMBERS.find((x) => (x.email || '').toLowerCase() === email);
        return m ? m.name : email.split('@')[0];
      },
      setMember() {},
      async signIn(email, password) {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw new Error('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
        session = data.session;
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
    };
  }

  const backend = remote ? remoteBackend() : localBackend();
  return Object.assign({ mode: remote ? 'remote' : 'local' }, backend);
})();
