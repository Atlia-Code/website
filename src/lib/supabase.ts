import { createClient } from "@supabase/supabase-js";

// These are the project URL and the public "anon" key. They are safe to ship in
// the browser bundle: the anon key is publishable by design, and the database is
// protected by Row Level Security (the waitlist table only allows INSERTs). See
// supabase/migrations for the policy.
const SUPABASE_URL = "https://lzbqfkvccelrsrbapfpw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6YnFma3ZjY2VscnNyYmFwZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MzUwNzAsImV4cCI6MjA5ODAxMTA3MH0.vqeckeJiBWxEtE80g3m197oN603uQB1iaLC0EzAtl4w";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
