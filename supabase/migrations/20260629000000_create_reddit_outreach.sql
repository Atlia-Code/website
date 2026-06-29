-- Reddit outreach channel tables.
-- This migration intentionally does not touch the public waitlist objects.

create schema if not exists outreach;
create extension if not exists citext with schema extensions;

create or replace function outreach.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists outreach.reddit_sequences (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  name        text not null,
  description text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists outreach.reddit_sequence_steps (
  id               uuid primary key default gen_random_uuid(),
  sequence_id      uuid not null references outreach.reddit_sequences(id) on delete cascade,
  step_number      integer not null check (step_number > 0),
  method           text not null,
  variant          text not null default '',
  subject_template text,
  prompt_template  text,
  wait_days        integer not null default 0 check (wait_days >= 0),
  is_active        boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (sequence_id, step_number)
);

create table if not exists outreach.reddit_leads (
  id                             uuid primary key default gen_random_uuid(),
  reddit_username                extensions.citext not null unique,
  reddit_profile_url             text,
  lead_category                  text not null default 'unknown'
                                 check (lead_category in (
                                   'self_managing',
                                   'landlord_with_pm',
                                   'property_manager',
                                   'unknown'
                                 )),
  lead_score                     numeric(5,2) not null default 0
                                 check (lead_score >= 0 and lead_score <= 100),
  lead_status                    text not null default 'lead_not_contacted'
                                 check (lead_status in (
                                   'lead_not_contacted',
                                   'outreach_drafted',
                                   'outreach_sent',
                                   'follow_up_due',
                                   'responded',
                                   'do_not_contact',
                                   'failed'
                                 )),
  primary_lead_generation_method text,
  primary_source_id              uuid,
  current_sequence_id            uuid references outreach.reddit_sequences(id),
  current_sequence_step          integer,
  last_outreach_method           text,
  last_outreach_at               timestamptz,
  next_follow_up_at              timestamptz,
  response_status                text not null default 'no_response'
                                 check (response_status in (
                                   'no_response',
                                   'responded',
                                   'positive',
                                   'negative'
                                 )),
  last_response_at               timestamptz,
  notes                          text,
  created_at                     timestamptz not null default now(),
  updated_at                     timestamptz not null default now()
);

create table if not exists outreach.reddit_lead_sources (
  id                       uuid primary key default gen_random_uuid(),
  reddit_lead_id           uuid not null references outreach.reddit_leads(id) on delete cascade,
  lead_generation_method   text not null,
  lead_generation_script   text not null,
  post_url                 text,
  post_title               text,
  post_body                text,
  lead_text                text,
  parent_text              text,
  is_original_poster       boolean not null default false,
  thread_role              text not null default 'unknown'
                           check (thread_role in (
                             'original_poster',
                             'commenter',
                             'reply',
                             'unknown'
                           )),
  extracted_reason         text,
  category_evidence        text,
  raw_context_json         jsonb not null default '{}'::jsonb,
  discovered_at            timestamptz not null default now()
);

alter table outreach.reddit_leads
  add constraint reddit_leads_primary_source_id_fkey
  foreign key (primary_source_id)
  references outreach.reddit_lead_sources(id)
  on delete set null;

create table if not exists outreach.reddit_outreach_events (
  id                 uuid primary key default gen_random_uuid(),
  reddit_lead_id     uuid not null references outreach.reddit_leads(id) on delete cascade,
  reddit_source_id   uuid references outreach.reddit_lead_sources(id) on delete set null,
  sequence_id        uuid references outreach.reddit_sequences(id) on delete set null,
  sequence_step      integer,
  event_type         text not null check (event_type in (
                       'outreach_drafted',
                       'outreach_sent',
                       'outreach_failed',
                       'response_received',
                       'status_updated'
                     )),
  method             text,
  variant            text,
  occurred_at        timestamptz not null default now(),
  subject            text,
  body               text,
  outcome            text,
  reddit_message_url text,
  error_message      text,
  metadata           jsonb not null default '{}'::jsonb,
  created_at         timestamptz not null default now()
);

create index if not exists reddit_leads_status_idx
  on outreach.reddit_leads (lead_status);
create index if not exists reddit_leads_category_idx
  on outreach.reddit_leads (lead_category);
create index if not exists reddit_leads_next_follow_up_idx
  on outreach.reddit_leads (next_follow_up_at)
  where next_follow_up_at is not null;
create index if not exists reddit_lead_sources_lead_id_idx
  on outreach.reddit_lead_sources (reddit_lead_id);
create index if not exists reddit_lead_sources_generation_method_idx
  on outreach.reddit_lead_sources (lead_generation_method);
create index if not exists reddit_outreach_events_lead_id_idx
  on outreach.reddit_outreach_events (reddit_lead_id);
create index if not exists reddit_outreach_events_method_idx
  on outreach.reddit_outreach_events (method, variant);
create index if not exists reddit_outreach_events_sequence_idx
  on outreach.reddit_outreach_events (sequence_id, sequence_step);

drop trigger if exists set_reddit_sequences_updated_at on outreach.reddit_sequences;
create trigger set_reddit_sequences_updated_at
before update on outreach.reddit_sequences
for each row execute function outreach.set_updated_at();

drop trigger if exists set_reddit_sequence_steps_updated_at on outreach.reddit_sequence_steps;
create trigger set_reddit_sequence_steps_updated_at
before update on outreach.reddit_sequence_steps
for each row execute function outreach.set_updated_at();

drop trigger if exists set_reddit_leads_updated_at on outreach.reddit_leads;
create trigger set_reddit_leads_updated_at
before update on outreach.reddit_leads
for each row execute function outreach.set_updated_at();

alter table outreach.reddit_sequences enable row level security;
alter table outreach.reddit_sequence_steps enable row level security;
alter table outreach.reddit_leads enable row level security;
alter table outreach.reddit_lead_sources enable row level security;
alter table outreach.reddit_outreach_events enable row level security;

revoke all on schema outreach from anon, authenticated;
revoke all on all tables in schema outreach from anon, authenticated;
grant usage on schema outreach to service_role;
grant all on all tables in schema outreach to service_role;
grant all on all routines in schema outreach to service_role;

insert into outreach.reddit_sequences (key, name, description)
values (
  'reddit_airbnb_hosts_research',
  'Reddit Airbnb Hosts Research',
  'Research-oriented outreach to Airbnb hosts, owners, and property managers found on Reddit.'
)
on conflict (key) do update set
  name = excluded.name,
  description = excluded.description,
  is_active = true;

with seq as (
  select id from outreach.reddit_sequences
  where key = 'reddit_airbnb_hosts_research'
)
insert into outreach.reddit_sequence_steps (
  sequence_id,
  step_number,
  method,
  variant,
  wait_days
)
select seq.id, step_number, method, variant, wait_days
from seq
cross join (
  values
    (1, 'A', 'industry_research_tools', 0),
    (2, 'B', 'short_followup', 4),
    (3, 'C', 'ops_pain_point', 7)
) as steps(step_number, method, variant, wait_days)
on conflict (sequence_id, step_number) do update set
  method = excluded.method,
  variant = excluded.variant,
  wait_days = excluded.wait_days,
  is_active = true;
