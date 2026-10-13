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
  youtube_id  text not null,
  url         text not null,
  title       text,
  category    text,
  memo        text,
  added_by    text,
  watched_by  text[] not null default '{}',
  created_at  timestamptz not null default now()
);

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
