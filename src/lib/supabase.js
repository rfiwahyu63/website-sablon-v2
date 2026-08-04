import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
);
console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY ADA?:", !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);