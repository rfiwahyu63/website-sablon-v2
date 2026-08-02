import { supabase } from "./supabase";

export async function uploadFile(file, folder = "misc") {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  console.log("Path yang akan diupload:", fileName);

  const { error } = await supabase.storage
    .from("order-files")
    .upload(fileName, file);

  console.log(file);
  
  if (error) {
    console.error("Upload gagal:", error.message);
    throw error;
  }

  const { data } = supabase.storage.from("order-files").getPublicUrl(fileName);

  return data.publicUrl;
}
