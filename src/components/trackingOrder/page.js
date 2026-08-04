"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function TrackOrderSearch() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSearch(e) {
    e.preventDefault();
    setError("");

    if (!query.trim()) return;

    setIsSearching(true);

    const { data, error: searchError } = await supabase
      .from("orders")
      .select("order_code, customer_nama, jenis_order, status, created_at")
      .or(`customer_whatsapp.eq.${query.trim()},customer_nama.ilike.%${query.trim()}%`)
      .order("created_at", { ascending: false });

    setIsSearching(false);

    if (searchError || !data || data.length === 0) {
      setError("Pesanan tidak ditemukan. Cek kembali nomor WA atau nama kamu.");
      return;
    }

    if (data.length === 1) {
      router.push(`/track/${data[0].order_code}`);
      return;
    }

    // Lebih dari 1 hasil — nanti kita tangani di langkah berikutnya
    console.log("Banyak hasil:", data);
  }

  return (
    <div className="mx-auto max-w-md mt-10">
        
      <form onSubmit={handleSearch} className="flex flex-col gap-2 px-4 sm:px-0">
  <label
    htmlFor="track-query"
    className="text-sm font-medium text-gray-700"
  >
    Cek Status Pesanan
  </label>

  <div className="flex flex-col gap-2 sm:flex-row">
    <input
      id="track-query"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Nomor WhatsApp atau Nama"
      className="w-full flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-900"
    />

    <button
      type="submit"
      disabled={isSearching}
      className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
    >
      {isSearching ? "..." : "Cek"}
    </button>
  </div>
</form>

      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}