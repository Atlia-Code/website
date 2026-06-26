-- The public site needs to be able to (a) add a signup and (b) let someone
-- correct details they entered earlier — without ever being able to READ other
-- signups. A blanket anon UPDATE policy can't do this: PostgREST can't locate a
-- row to update without SELECT access, and granting SELECT would expose every
-- signup's email publicly.
--
-- Instead we route writes through one SECURITY DEFINER function. It runs as its
-- owner (bypassing RLS) and only ever touches public.waitlist by email, so anon
-- gets exactly one narrow capability: insert-or-update a waitlist entry.

-- Drop the broad anon UPDATE policy added in the previous migration; the RPC
-- replaces it and keeps the table locked down.
drop policy if exists "Anyone can update their waitlist entry" on public.waitlist;

create or replace function public.join_waitlist(
  p_first_name     text,
  p_last_name      text,
  p_email          text,
  p_phone          text,
  p_referral       text,
  p_city           text,
  p_state          text,
  p_num_properties integer
)
returns text                 -- 'inserted' on first signup, 'updated' on re-submit
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(p_email));
begin
  if exists (select 1 from public.waitlist where email = v_email) then
    update public.waitlist set
      first_name     = p_first_name,
      last_name      = p_last_name,
      phone          = p_phone,
      referral       = p_referral,
      city           = p_city,
      state          = p_state,
      num_properties = p_num_properties
    where email = v_email;
    return 'updated';
  end if;

  -- First signup: the INSERT fires the confirmation-email webhook trigger.
  insert into public.waitlist
    (first_name, last_name, email, phone, referral, city, state, num_properties)
  values
    (p_first_name, p_last_name, v_email, p_phone, p_referral, p_city, p_state, p_num_properties);
  return 'inserted';
end;
$$;

-- Only the anon (public site) role may call it; nobody else by default.
revoke all on function public.join_waitlist(
  text, text, text, text, text, text, text, integer) from public;
grant execute on function public.join_waitlist(
  text, text, text, text, text, text, text, integer) to anon;
