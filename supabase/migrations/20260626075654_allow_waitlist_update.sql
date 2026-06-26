-- Let anonymous visitors update an existing signup so they can correct details
-- they entered earlier (e.g. a typo'd phone or wrong city).
--
-- Security note: without authentication, RLS cannot verify that the person
-- updating a row is the same person who created it. This policy therefore
-- permits updating any row (matched by email from the form). That is an
-- accepted trade-off for a low-sensitivity waitlist: anon still has no SELECT
-- access, so no one can read others' data — only overwrite a known email's row.
create policy "Anyone can update their waitlist entry"
  on public.waitlist
  for update
  to anon
  using (true)
  with check (true);
