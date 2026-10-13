-- English Study Club — Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 Run 하세요.

-- 멤버 목록: 로그인 이메일 → 화면 이름 (이메일은 이 테이블에만 저장)
create table if not exists public.members (
  email text primary key,      -- 소문자로 입력
  name  text not null          -- js/config.js 의 MEMBERS.name 과 같게
);

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
  corrections text,                              -- 수정 내역: [문법]/[원어민]/[표현] 줄 목록
  notes       text,                              -- 실수 패턴 · 평가 · 메모
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

-- 내 노트: 멤버 각자만 보는 메모 (영단어 · 문장 · 문법)
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  author      text not null,                     -- 멤버 이름 (본인만 읽고 쓸 수 있음)
  date        date not null default current_date,
  kind        text not null default 'word' check (kind in ('word', 'sentence', 'grammar', 'etc')),
  en          text not null default '',          -- 영단어 / 영어 문장 / 문법 포인트
  ko          text,                              -- 뜻 / 해석 / 설명
  memo        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists notes_author_date_idx on public.notes (author, date desc);

-- 예전 스키마로 이미 테이블을 만든 경우를 위한 보정
alter table public.videos alter column youtube_id drop not null;
alter table public.videos add column if not exists playlist_id text;
alter table public.videos add column if not exists thumb_url text;
alter table public.posts add column if not exists corrections text;

-- 로그인한 사람이 members 테이블에 있는지 확인
create or replace function public.is_member()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.members m
    where lower(m.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke execute on function public.is_member() from public, anon;
grant execute on function public.is_member() to authenticated;

-- 로그인한 사람의 멤버 이름 (내 노트 권한에 사용)
create or replace function public.my_member_name()
returns text
language sql stable security definer set search_path = ''
as $$
  select m.name from public.members m
  where lower(m.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  limit 1;
$$;
revoke execute on function public.my_member_name() from public, anon;
grant execute on function public.my_member_name() to authenticated;

-- 멤버 이메일로 가입하면 인증 메일 없이 바로 로그인 가능
create or replace function public.auto_confirm_members()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if exists (select 1 from public.members m where lower(m.email) = lower(new.email)) then
    new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  end if;
  return new;
end;
$$;
revoke execute on function public.auto_confirm_members() from public, anon, authenticated;
drop trigger if exists auto_confirm_members on auth.users;
create trigger auto_confirm_members
  before insert on auth.users
  for each row execute function public.auto_confirm_members();

-- 멤버만 읽기/쓰기 가능 (익명·멤버 아닌 계정은 아무것도 못 봄)
alter table public.members enable row level security;
alter table public.topics  enable row level security;
alter table public.posts   enable row level security;
alter table public.videos  enable row level security;
alter table public.notes   enable row level security;

drop policy if exists "members read members" on public.members;
drop policy if exists "members only" on public.topics;
drop policy if exists "members only" on public.posts;
drop policy if exists "members only" on public.videos;
drop policy if exists "owner only" on public.notes;

create policy "members read members" on public.members for select to authenticated using (public.is_member());
create policy "members only" on public.topics for all to authenticated using (public.is_member()) with check (public.is_member());
create policy "members only" on public.posts  for all to authenticated using (public.is_member()) with check (public.is_member());
create policy "members only" on public.videos for all to authenticated using (public.is_member()) with check (public.is_member());
-- 내 노트는 본인 것만
create policy "owner only" on public.notes for all to authenticated
  using (author = (select public.my_member_name())) with check (author = (select public.my_member_name()));

create index if not exists posts_topic_id_idx on public.posts (topic_id);

-- 멤버 등록 (예시 이메일을 실제 이메일로 바꿔서 실행)
-- insert into public.members (email, name) values
--   ('me@example.com', '오한영'),
--   ('coworker@example.com', '박정민');

-- 기본 영어공부 재생목록 (제목·썸네일은 사이트를 열면 자동으로 채워짐)
insert into public.videos (url, playlist_id, category, added_by, created_at)
select v.url, v.playlist_id, '기타', '오한영', now() - make_interval(secs => v.ord)
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
select v.url, v.youtube_id, '기타', '오한영', now() + make_interval(secs => 10 - v.ord)
from (values
  ('https://www.youtube.com/watch?v=GzzaEedWRXQ', 'GzzaEedWRXQ', 0),
  ('https://www.youtube.com/watch?v=yv8aBYXPOZ8', 'yv8aBYXPOZ8', 1),
  ('https://www.youtube.com/watch?v=VFwgqMjWeEc', 'VFwgqMjWeEc', 2)
) as v(url, youtube_id, ord)
where not exists (select 1 from public.videos x where x.youtube_id = v.youtube_id);

-- 기본 영어공부 영상·재생목록 (2차)
insert into public.videos (url, youtube_id, playlist_id, category, added_by, created_at)
select v.url, v.youtube_id, v.playlist_id, '기타', '오한영', now() + make_interval(secs => 20 - v.ord)
from (values
  ('https://www.youtube.com/playlist?list=PLg8Zuy2VA0n9R-oAhPrYoiU-dcwj7TE9l', null, 'PLg8Zuy2VA0n9R-oAhPrYoiU-dcwj7TE9l', 0),
  ('https://www.youtube.com/watch?v=fccvj1TKpkg', 'fccvj1TKpkg', null, 1),
  ('https://www.youtube.com/watch?v=3mWbOzQ6kKg', '3mWbOzQ6kKg', null, 2),
  ('https://www.youtube.com/playlist?list=PLhpp-vPvggtctjfjJeZePqCbwkJRRduNN', null, 'PLhpp-vPvggtctjfjJeZePqCbwkJRRduNN', 3)
) as v(url, youtube_id, playlist_id, ord)
where not exists (
  select 1 from public.videos x
  where x.youtube_id is not distinct from v.youtube_id and x.playlist_id is not distinct from v.playlist_id
);

-- 기본 영어공부 영상 (3차)
insert into public.videos (url, youtube_id, category, added_by, created_at)
select v.url, v.youtube_id, '기타', '오한영', now() + make_interval(secs => 30 - v.ord)
from (values
  ('https://www.youtube.com/watch?v=TIx-yVScq9g', 'TIx-yVScq9g', 0),
  ('https://www.youtube.com/watch?v=H6XNM8x3Bt4', 'H6XNM8x3Bt4', 1),
  ('https://www.youtube.com/watch?v=Gaw7MoofW8s', 'Gaw7MoofW8s', 2)
) as v(url, youtube_id, ord)
where not exists (select 1 from public.videos x where x.youtube_id = v.youtube_id);
