alter table reddit.leads
  drop constraint if exists reddit_leads_lead_category_check;

alter table reddit.leads
  add constraint reddit_leads_lead_category_check
  check (lead_category in (
    'self_managing',
    'landlord_with_pm',
    'property_manager',
    'property_owner',
    'unknown'
  ));

create or replace function reddit.import_leads(
  p_leads jsonb,
  p_lead_generation_method text default 'legacy_full_leads_list',
  p_lead_generation_script text default 'full_leads_list.csv'
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
  v_lead_id uuid;
  v_source_id uuid;
  v_was_created boolean;
begin
  imported := 0;
  created := 0;

  for item in select * from jsonb_array_elements(p_leads)
  loop
    v_username := trim(coalesce(item->>'reddit_username', item->>'username', ''));
    if v_username = '' then
      continue;
    end if;
    if left(v_username, 2) = 'u/' then
      v_username := substring(v_username from 3);
    end if;

    v_category := coalesce(item->>'lead_category', item->>'category', 'unknown');
    if v_category not in ('self_managing', 'landlord_with_pm', 'property_manager', 'property_owner', 'unknown') then
      v_category := 'unknown';
    end if;

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
      primary_lead_generation_method = coalesce(leads.primary_lead_generation_method, excluded.primary_lead_generation_method)
    returning id, (xmax = 0) into v_lead_id, v_was_created;

    if v_was_created then
      created := created + 1;
    end if;

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
      coalesce(item->>'post_url', ''),
      coalesce(item->>'post_title', item->>'question', ''),
      coalesce(item->>'post_body', item->>'description', ''),
      coalesce(item->>'lead_text', item->>'full_comment', ''),
      coalesce(item->>'parent_text', ''),
      coalesce((item->>'is_original_poster')::boolean, false),
      coalesce(item->>'thread_role', 'unknown'),
      coalesce(item->>'extracted_reason', ''),
      coalesce(item->>'category_evidence', item->>'full_comment', ''),
      item
    )
    on conflict (
      reddit_lead_id,
      lead_generation_method,
      post_url,
      lead_text
    ) do update set
      lead_generation_script = excluded.lead_generation_script,
      post_title = excluded.post_title,
      post_body = excluded.post_body,
      parent_text = excluded.parent_text,
      is_original_poster = excluded.is_original_poster,
      thread_role = excluded.thread_role,
      extracted_reason = excluded.extracted_reason,
      category_evidence = excluded.category_evidence,
      raw_context_json = excluded.raw_context_json
    returning id into v_source_id;

    update reddit.leads
    set
      primary_source_id = coalesce(primary_source_id, v_source_id),
      primary_lead_generation_method = coalesce(primary_lead_generation_method, p_lead_generation_method)
    where id = v_lead_id;

    imported := imported + 1;
  end loop;

  return next;
end;
$$;

revoke all on function reddit.import_leads(jsonb, text, text) from anon, authenticated;
grant execute on function reddit.import_leads(jsonb, text, text) to service_role;
