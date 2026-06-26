-- Waitlist signups collected from the public marketing site.
create table public.waitlist (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  first_name     text not null,
  last_name      text not null,
  email          text not null,
  referral       text,
  city           text not null,
  state          text not null,
  num_properties integer not null check (num_properties >= 0),
  unique (email)
);

-- The public site authenticates with the anon key, so RLS must let anonymous
-- visitors INSERT their own signup — but never read, update, or delete rows.
alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
