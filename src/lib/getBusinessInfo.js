import { supabase } from "@/lib/supabase";

export async function getBusinessInfo() {
  const { data, error } = await supabase
    .from("business_info")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Gagal fetch business info:", error.message);
    return null;
  }

  return data;
}
