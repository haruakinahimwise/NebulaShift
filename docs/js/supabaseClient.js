const SUPABASE_URL = "https://pqjxippgnphhwrkquddz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_aa2Leqyt4sht0rCcZKDpkw_Pw6R3BOw";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export { supabaseClient };
