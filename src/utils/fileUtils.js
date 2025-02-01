import { supabaseUrl } from "../lib/supabase";

export const getSupabaseFileUrl = (filePath) => {
    return `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}` ;
  };