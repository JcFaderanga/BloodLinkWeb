import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabaseUrl = "https://xyzwrvzugwgwynliyyzj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5endydnp1Z3dnd3lubGl5eXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5OTEyMTksImV4cCI6MjA0MjU2NzIxOX0.RPxzichJIYxm4XSwPKsmhZXe_mSTkKifnlzDAKg6AmE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
