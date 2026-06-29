create or replace view reddit.leads_with_source_methods as
select
  l.*,
  coalesce(source_summary.source_count, 0) as source_count,
  coalesce(source_summary.lead_generation_methods, array[]::text[]) as lead_generation_methods,
  coalesce(source_summary.lead_generation_scripts, array[]::text[]) as lead_generation_scripts,
  source_summary.first_source_discovered_at,
  source_summary.last_source_discovered_at
from reddit.leads l
left join lateral (
  select
    count(*)::integer as source_count,
    array_agg(distinct s.lead_generation_method order by s.lead_generation_method)
      filter (where s.lead_generation_method is not null and s.lead_generation_method <> '') as lead_generation_methods,
    array_agg(distinct s.lead_generation_script order by s.lead_generation_script)
      filter (where s.lead_generation_script is not null and s.lead_generation_script <> '') as lead_generation_scripts,
    min(s.discovered_at) as first_source_discovered_at,
    max(s.discovered_at) as last_source_discovered_at
  from reddit.lead_sources s
  where s.reddit_lead_id = l.id
) source_summary on true;

comment on view reddit.leads_with_source_methods is
  'Canonical Reddit leads plus aggregated source attribution across all lead-generation scripts.';

revoke all on reddit.leads_with_source_methods from anon, authenticated;
grant select on reddit.leads_with_source_methods to service_role;
