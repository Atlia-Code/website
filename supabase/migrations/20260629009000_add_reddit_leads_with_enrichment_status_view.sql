create or replace view reddit.leads_with_enrichment_status as
select
  l.*,
  e.id as enrichment_id,
  (e.id is not null) as has_enrichment,
  (e.enrichment_status = 'completed') as is_enriched,
  e.enrichment_status,
  e.enriched_at,
  e.confidence as enrichment_confidence,
  e.experience_level as enrichment_experience_level,
  e.role_assessment as enrichment_role_assessment,
  e.summary as enrichment_summary,
  e.source_items_count as enrichment_source_items_count,
  e.source_window_days as enrichment_source_window_days,
  e.model as enrichment_model,
  e.prompt_version as enrichment_prompt_version,
  e.error_message as enrichment_error_message,
  e.created_at as enrichment_created_at,
  e.updated_at as enrichment_updated_at
from reddit.leads l
left join reddit.lead_enrichments e
  on e.reddit_lead_id = l.id;

comment on view reddit.leads_with_enrichment_status is
  'Canonical Reddit leads plus current enrichment status and dossier summary fields.';

revoke all on reddit.leads_with_enrichment_status from anon, authenticated;
grant select on reddit.leads_with_enrichment_status to service_role;

notify pgrst, 'reload schema';
