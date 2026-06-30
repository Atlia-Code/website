-- Store one current Reddit profile enrichment dossier per lead.

create table if not exists reddit.lead_enrichments (
  id                        uuid primary key default gen_random_uuid(),
  reddit_lead_id            uuid not null unique references reddit.leads(id) on delete cascade,
  enrichment_status         text not null default 'pending'
                            check (enrichment_status in ('pending', 'completed', 'failed')),
  summary                   text,
  role_assessment           text,
  pain_points_json          jsonb not null default '[]'::jsonb,
  tools_or_platforms_json   jsonb not null default '[]'::jsonb,
  property_clues_json       jsonb not null default '[]'::jsonb,
  experience_level          text,
  conversation_angles_json  jsonb not null default '[]'::jsonb,
  red_flags_json            jsonb not null default '[]'::jsonb,
  evidence_json             jsonb not null default '[]'::jsonb,
  confidence                text,
  source_items_json         jsonb not null default '[]'::jsonb,
  source_items_count        integer not null default 0 check (source_items_count >= 0),
  source_window_days        integer not null default 180 check (source_window_days > 0),
  model                     text,
  prompt_version            text,
  error_message             text,
  enriched_at               timestamptz,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists lead_enrichments_lead_id_idx
  on reddit.lead_enrichments (reddit_lead_id);
create index if not exists lead_enrichments_status_idx
  on reddit.lead_enrichments (enrichment_status);
create index if not exists lead_enrichments_enriched_at_idx
  on reddit.lead_enrichments (enriched_at)
  where enriched_at is not null;

drop trigger if exists set_lead_enrichments_updated_at on reddit.lead_enrichments;
create trigger set_lead_enrichments_updated_at
before update on reddit.lead_enrichments
for each row execute function reddit.set_updated_at();

alter table reddit.lead_enrichments enable row level security;

revoke all on reddit.lead_enrichments from anon, authenticated;
grant all on reddit.lead_enrichments to service_role;

notify pgrst, 'reload schema';
