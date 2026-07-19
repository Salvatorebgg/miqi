-- Miqi Learning initial schema
-- All user-owned tables are protected by Row Level Security keyed on auth.uid().

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  sound_muted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_tasks (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  category text not null check (category in ('math', 'english', 'reading', 'game')),
  title text not null,
  target integer not null default 1,
  completed integer not null default 0,
  "order" integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.course_progress (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  lesson_id text not null,
  read boolean not null default false,
  exercise_score numeric not null default 0,
  quiz_score numeric not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.exercise_attempts (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  exercise_id text not null,
  topic text not null,
  correct boolean not null,
  duration_seconds integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.vocabulary_progress (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id text not null,
  familiarity smallint not null default 0 check (familiarity in (0, 1, 2)),
  interval_days integer not null default 1,
  next_review_at timestamptz not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.reading_attempts (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  material_id text not null,
  kind text not null check (kind in ('scenario', 'news', 'paper')),
  correct integer not null default 0,
  total integer not null default 0,
  duration_seconds integer not null default 0,
  summary text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.game_sessions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  game text not null check (game in ('sudoku', 'maze')),
  difficulty text not null,
  duration_seconds integer not null default 0,
  moves integer not null default 0,
  score integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_articles (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id text not null,
  read boolean not null default false,
  saved boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists daily_tasks_user_updated on public.daily_tasks (user_id, updated_at);
create index if not exists course_progress_user_updated on public.course_progress (user_id, updated_at);
create index if not exists exercise_attempts_user_created on public.exercise_attempts (user_id, created_at);
create index if not exists vocabulary_progress_user_updated on public.vocabulary_progress (user_id, updated_at);
create index if not exists reading_attempts_user_created on public.reading_attempts (user_id, created_at);
create index if not exists game_sessions_user_created on public.game_sessions (user_id, created_at);
create index if not exists saved_articles_user_updated on public.saved_articles (user_id, updated_at);

-- Keep updated_at current on every write.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_daily_tasks before update on public.daily_tasks
  for each row execute function public.touch_updated_at();
create trigger touch_course_progress before update on public.course_progress
  for each row execute function public.touch_updated_at();
create trigger touch_vocabulary_progress before update on public.vocabulary_progress
  for each row execute function public.touch_updated_at();
create trigger touch_saved_articles before update on public.saved_articles
  for each row execute function public.touch_updated_at();
create trigger touch_profiles before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Create a profile for every new authenticated user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security: users can only reach their own rows.
alter table public.profiles enable row level security;
alter table public.daily_tasks enable row level security;
alter table public.course_progress enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.vocabulary_progress enable row level security;
alter table public.reading_attempts enable row level security;
alter table public.game_sessions enable row level security;
alter table public.saved_articles enable row level security;

create policy "users manage own profile" on public.profiles
  for all using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "users manage own daily tasks" on public.daily_tasks
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own course progress" on public.course_progress
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own exercise attempts" on public.exercise_attempts
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own vocabulary" on public.vocabulary_progress
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own reading attempts" on public.reading_attempts
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own game sessions" on public.game_sessions
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "users manage own saved articles" on public.saved_articles
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
