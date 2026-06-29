-- Let service-role REST clients access the outreach schema.
-- The outreach tables still have RLS enabled and no anon/authenticated grants.
alter role authenticator set pgrst.db_schemas = 'public,graphql_public,outreach';
notify pgrst, 'reload config';
