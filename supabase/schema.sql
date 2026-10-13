-- English Study Club — Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 Run 하세요.

create table if not exists public.topics (
  id          uuid primary key default gen_random_uuid(),
  date        date not null unique,              -- 글쓰기 날짜 (하루에 주제 1개)
  title       text not null,
  description text,
  created_by  text,
  created_at  timestamptz not null default now()
);

create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  topic_id    uuid not null references public.topics(id) on delete cascade,
  author      text not null,                     -- 멤버 이름 (config.js 의 MEMBERS.name)
  original    text not null default '',          -- 직접 쓴 원문
  revised     text,                              -- AI 검수 후 수정본
  notes       text,                              -- AI 피드백 / 배운 표현 메모
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (topic_id, author)
);

create table if not exists public.videos (
  id          uuid primary key default gen_random_uuid(),
  youtube_id  text,                              -- 단일 영상 ID
  playlist_id text,                              -- 재생목록 ID
  thumb_url   text,                              -- 재생목록 썸네일
  url         text not null,
  title       text,
  category    text,
  memo        text,
  added_by    text,
  watched_by  text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- 예전 스키마로 이미 테이블을 만든 경우를 위한 보정
alter table public.videos alter column youtube_id drop not null;
alter table public.videos add column if not exists playlist_id text;
alter table public.videos add column if not exists thumb_url text;

-- 로그인한 멤버만 읽기/쓰기 가능 (익명 접근 차단)
alter table public.topics enable row level security;
alter table public.posts  enable row level security;
alter table public.videos enable row level security;

drop policy if exists "members only" on public.topics;
drop policy if exists "members only" on public.posts;
drop policy if exists "members only" on public.videos;

create policy "members only" on public.topics for all to authenticated using (true) with check (true);
create policy "members only" on public.posts  for all to authenticated using (true) with check (true);
create policy "members only" on public.videos for all to authenticated using (true) with check (true);

-- 기본 영어공부 재생목록 (제목·썸네일은 사이트를 열면 자동으로 채워짐)
insert into public.videos (url, playlist_id, category, added_by, created_at)
select v.url, v.playlist_id, '기타', '한영', now() - make_interval(secs => v.ord)
from (values
  ('https://www.youtube.com/playlist?list=PLxoOU8azGw9Wnc1o0bdvfbBJBwa1Q-v9F', 'PLxoOU8azGw9Wnc1o0bdvfbBJBwa1Q-v9F', 0),
  ('https://www.youtube.com/playlist?list=PLxoOU8azGw9UQ1XEK0SmGje0lZnycvNc1', 'PLxoOU8azGw9UQ1XEK0SmGje0lZnycvNc1', 1),
  ('https://www.youtube.com/playlist?list=PLxoOU8azGw9X3mcBKRRjcIeD_xoFAcv3Q', 'PLxoOU8azGw9X3mcBKRRjcIeD_xoFAcv3Q', 2),
  ('https://www.youtube.com/playlist?list=PLxoOU8azGw9V7iNiPIlJsiBF39GL3GWna', 'PLxoOU8azGw9V7iNiPIlJsiBF39GL3GWna', 3),
  ('https://www.youtube.com/playlist?list=PLXF8cvSejlGkqCgLA793Tyuyvjo5NBKDV', 'PLXF8cvSejlGkqCgLA793Tyuyvjo5NBKDV', 4)
) as v(url, playlist_id, ord)
where not exists (select 1 from public.videos x where x.playlist_id = v.playlist_id);

-- 기본 영어공부 영상
insert into public.videos (url, youtube_id, category, added_by, created_at)
select v.url, v.youtube_id, '기타', '한영', now() + make_interval(secs => 10 - v.ord)
from (values
  ('https://www.youtube.com/watch?v=GzzaEedWRXQ', 'GzzaEedWRXQ', 0),
  ('https://www.youtube.com/watch?v=yv8aBYXPOZ8', 'yv8aBYXPOZ8', 1),
  ('https://www.youtube.com/watch?v=VFwgqMjWeEc', 'VFwgqMjWeEc', 2)
) as v(url, youtube_id, ord)
where not exists (select 1 from public.videos x where x.youtube_id = v.youtube_id);
