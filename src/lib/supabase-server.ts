import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isPlaceholder(val: string | undefined): boolean {
  if (!val || val.trim().length === 0) return true;
  const lower = val.toLowerCase().trim();
  return lower.startsWith("your_") || lower === "placeholder";
}

export function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  if (isPlaceholder(supabaseUrl) || isPlaceholder(supabaseServiceKey)) return null;
  try {
    return createClient(supabaseUrl, supabaseServiceKey);
  } catch {
    return null;
  }
}

export const hasSupabase = Boolean(supabaseUrl && supabaseServiceKey);
