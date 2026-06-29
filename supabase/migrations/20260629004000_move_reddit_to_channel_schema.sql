-- Move Reddit outreach from shared outreach.reddit_* tables into a channel-owned
-- reddit schema with simple table/function names.

create schema if not exists reddit;

-- Remove functions that will be recreated with channel-owned names. Triggers
-- depending on set_updated_at are dropped and recreated below.
drop trigger if exists set_reddit_sequences_updated_at on outreach.reddit_sequences;
drop trigger if exists set_reddit_sequence_steps_updated_at on outreach.reddit_sequence_steps;
drop trigger if exists set_reddit_leads_updated_at on outreach.reddit_leads;
drop function if exists outreach.import_reddit_leads(jsonb, text, text);
drop function if exists outreach.set_updated_at();

-- Move tables first; PostgreSQL keeps IDs, rows, constraints, indexes, and FK
-- relationships attached to the moved relations.
alter table outreach.reddit_sequences set schema reddit;
alter table reddit.reddit_sequences rename to sequences;

alter table outreach.reddit_sequence_steps set schema reddit;
alter table reddit.reddit_sequence_steps rename to sequence_steps;

alter table outreach.reddit_leads set schema reddit;
alter table reddit.reddit_leads rename to leads;

alter table outreach.reddit_lead_sources set schema reddit;
alter table reddit.reddit_lead_sources rename to lead_sources;

alter table outreach.reddit_outreach_events set schema reddit;
alter table reddit.reddit_outreach_events rename to outreach_events;

create or replace function reddit.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_sequences_updated_at
before update on reddit.sequences
for each row execute function reddit.set_updated_at();

create trigger set_sequence_steps_updated_at
before update on reddit.sequence_steps
for each row execute function reddit.set_updated_at();

create trigger set_leads_updated_at
before update on reddit.leads
for each row execute function reddit.set_updated_at();

create or replace function reddit.import_leads(
  p_leads jsonb,
  p_lead_generation_method text,
  p_lead_generation_script text
)
returns table(imported integer, created integer)
language plpgsql
security definer
set search_path = reddit, public
as $$
declare
  item jsonb;
  v_username text;
  v_category text;
  v_post_url text;
  v_lead_text text;
  v_lead_id uuid;
  v_source_id uuid;
  v_created boolean;
begin
  imported := 0;
  created := 0;

  for item in select * from jsonb_array_elements(p_leads)
  loop
    v_username := trim(coalesce(
      item->>'reddit_username',
      item->>'username',
      ''
    ));
    if left(v_username, 2) = 'u/' then
      v_username := substring(v_username from 3);
    end if;
    if v_username = '' then
      continue;
    end if;

    v_category := coalesce(item->>'lead_category', item->>'category', 'unknown');
    if v_category not in ('self_managing', 'landlord_with_pm', 'property_manager', 'unknown') then
      v_category := 'unknown';
    end if;

    v_post_url := coalesce(item->>'post_url', '');
    v_lead_text := coalesce(item->>'lead_text', item->>'full_comment', '');
    v_created := false;

    insert into reddit.leads (
      reddit_username,
      reddit_profile_url,
      lead_category,
      lead_score,
      lead_status,
      primary_lead_generation_method,
      response_status
    )
    values (
      v_username,
      coalesce(item->>'reddit_profile_url', 'https://www.reddit.com/user/' || v_username || '/'),
      v_category,
      coalesce(nullif(item->>'lead_score', '')::numeric, 50),
      'lead_not_contacted',
      p_lead_generation_method,
      'no_response'
    )
    on conflict (reddit_username) do update set
      lead_category = case
        when excluded.lead_category <> 'unknown' then excluded.lead_category
        else leads.lead_category
      end,
      lead_score = greatest(leads.lead_score, excluded.lead_score),
      primary_lead_generation_method = coalesce(
        leads.primary_lead_generation_method,
        excluded.primary_lead_generation_method
      )
    returning id, (xmax = 0) into v_lead_id, v_created;

    select id into v_source_id
    from reddit.lead_sources
    where reddit_lead_id = v_lead_id
      and lead_generation_method = p_lead_generation_method
      and lead_generation_script = p_lead_generation_script
      and coalesce(post_url, '') = v_post_url
      and coalesce(lead_text, '') = v_lead_text
    order by discovered_at asc
    limit 1;

    if v_source_id is null then
      insert into reddit.lead_sources (
        reddit_lead_id,
        lead_generation_method,
        lead_generation_script,
        post_url,
        post_title,
        post_body,
        lead_text,
        parent_text,
        is_original_poster,
        thread_role,
        extracted_reason,
        category_evidence,
        raw_context_json
      )
      values (
        v_lead_id,
        p_lead_generation_method,
        p_lead_generation_script,
        v_post_url,
        coalesce(item->>'post_title', item->>'question', ''),
        coalesce(item->>'post_body', item->>'description', ''),
        v_lead_text,
        coalesce(item->>'parent_text', ''),
        coalesce((item->>'is_original_poster')::boolean, false),
        case
          when coalesce(item->>'thread_role', '') in ('original_poster', 'commenter', 'reply', 'unknown')
            then item->>'thread_role'
          when coalesce((item->>'is_original_poster')::boolean, false)
            then 'original_poster'
          else 'commenter'
        end,
        coalesce(item->>'extracted_reason', ''),
        coalesce(item->>'category_evidence', item->>'full_comment', item->>'lead_text', ''),
        item
      )
      returning id into v_source_id;
    end if;

    update reddit.leads
    set
      primary_source_id = coalesce(primary_source_id, v_source_id),
      primary_lead_generation_method = coalesce(primary_lead_generation_method, p_lead_generation_method)
    where id = v_lead_id;

    imported := imported + 1;
    if v_created then
      created := created + 1;
    end if;
  end loop;

  return next;
end;
$$;

alter table reddit.sequences enable row level security;
alter table reddit.sequence_steps enable row level security;
alter table reddit.leads enable row level security;
alter table reddit.lead_sources enable row level security;
alter table reddit.outreach_events enable row level security;

revoke all on schema reddit from anon, authenticated;
revoke all on all tables in schema reddit from anon, authenticated;
revoke all on all routines in schema reddit from anon, authenticated;
grant usage on schema reddit to service_role;
grant all on all tables in schema reddit to service_role;
grant all on all routines in schema reddit to service_role;

revoke all on function reddit.import_leads(jsonb, text, text) from public;
grant execute on function reddit.import_leads(jsonb, text, text) to service_role;

alter role authenticator set pgrst.db_schemas = 'public,graphql_public,reddit';
notify pgrst, 'reload config';

drop schema outreach;
