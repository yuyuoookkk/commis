-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(trim(name)) between 2 and 60),
  rating      smallint not null check (rating between 1 and 5),
  comment     text not null check (char_length(trim(comment)) between 10 and 1000),
  approved    boolean not null default false
);

-- Only approved reviews are ever sent to the browser.
create index if not exists reviews_approved_created_at_idx
  on public.reviews (created_at desc)
  where approved;

alter table public.reviews enable row level security;

-- Visitors read approved reviews only. Unapproved rows are invisible to them.
drop policy if exists "anon reads approved reviews" on public.reviews;
create policy "anon reads approved reviews"
  on public.reviews for select
  to anon
  using (approved = true);

-- Visitors may submit, but `with check` forbids them publishing their own review.
drop policy if exists "anon submits pending reviews" on public.reviews;
create policy "anon submits pending reviews"
  on public.reviews for insert
  to anon
  with check (approved = false);

-- No update or delete policy for anon, so both are denied. Approving a review
-- is done from the Supabase dashboard, which bypasses RLS.
