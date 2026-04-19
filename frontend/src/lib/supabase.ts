import { createClient } from "@supabase/supabase-js";

// Connect to supabase using URL and ANON key stored in .env
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);