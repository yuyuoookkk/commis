-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: every statement is idempotent.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(trim(name)) between 2 and 60),
  rating      smallint not null check (rating between 1 and 5),
  comment     text not null check (char_length(trim(comment)) between 10 and 1000),
  approved    boolean not null default false
);

create index if not exists reviews_approved_created_at_idx
  on public.reviews (created_at desc)
  where approved;

-- Who may use the /admin dashboard. Add a row per admin (see README step 4).
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.reviews enable row level security;
alter table public.admins enable row level security;

-- security definer so the policies below can test admin membership without
-- being blocked by the admins table's own row-level security.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins see their own row" on public.admins;
create policy "admins see their own row"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

-- Everyone, logged in or not, reads approved reviews only.
drop policy if exists "anon reads approved reviews" on public.reviews;
create policy "anon reads approved reviews"
  on public.reviews for select
  to anon, authenticated
  using (approved = true);

-- Visitors may submit, but `with check` forbids them publishing their own review.
drop policy if exists "anon submits pending reviews" on public.reviews;
create policy "anon submits pending reviews"
  on public.reviews for insert
  to anon, authenticated
  with check (approved = false);

-- Admins additionally see pending reviews, and may publish or remove any review.
-- A logged-in non-admin matches none of these, so they get the public view only.
drop policy if exists "admins read every review" on public.reviews;
create policy "admins read every review"
  on public.reviews for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins update reviews" on public.reviews;
create policy "admins update reviews"
  on public.reviews for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete reviews" on public.reviews;
create policy "admins delete reviews"
  on public.reviews for delete
  to authenticated
  using (public.is_admin());
