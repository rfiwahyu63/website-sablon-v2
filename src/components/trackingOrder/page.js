"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { statusLabel } from "@/lib/statusLabel";
import { X } from "lucide-react";

export default function TrackOrderSearch() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  const router = useRouter();

  async function handleSearch(e) {
    e.preventDefault();

    setError("");
    setOrders([]);

    const searchQuery = query.trim();

    if (!searchQuery) {
      setError("Masukkan nomor WhatsApp atau nama kamu.");
      return;
    }

    setIsSearching(true);

    const { data, error: searchError } = await supabase
      .from("orders")
      .select(
        "order_code, customer_nama, jenis_order, status, created_at"
      )
      .or(
        `customer_whatsapp.eq.${searchQuery},customer_nama.ilike.%${searchQuery}%`
      )
      .order("created_at", { ascending: false });

    setIsSearching(false);

    console.log("DATA:", data);
    console.log("ERROR:", searchError);

    if (searchError) {
      console.error("Supabase error:", searchError);
      setError("Terjadi kesalahan saat mencari pesanan.");
      return;
    }

    if (!data || data.length === 0) {
      setError(
        "Pesanan tidak ditemukan. Cek kembali nomor WA atau nama kamu."
      );
      return;
    }

    // Kalau hanya ada satu pesanan
    if (data.length === 1) {
      router.push(`/track/${data[0].order_code}`);
      return;
    }

    // Kalau ada beberapa pesanan
    setOrders(data);
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="mx-auto mt-10 max-w-md p-4 lg:mr-30 lg:mt-20 lg:rounded-xl lg:border lg:border-gray-300">
      {/* Form Pencarian */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2 px-4 sm:px-0"
      >
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

      {/* Error */}
      {error && (
        <p className="mt-3 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Hasil Pencarian */}
      {orders.length > 0 && (
        <div className="relative mt-5 space-y-3 rounded-xl border border-gray-200 p-4">
          {/* Tombol Close */}
          <button
            type="button"
            onClick={() => setOrders([])}
            aria-label="Tutup hasil pencarian"
            className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} />
          </button>

          <p className="pr-8 text-sm font-medium text-gray-700">
            Ditemukan {orders.length} pesanan
          </p>

          {orders.map((order) => (
            <button
              key={order.order_code}
              type="button"
              onClick={() => router.push(`/track/${order.order_code}`)}
              className="w-full rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-400 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.order_code}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {order.jenis_order}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {statusLabel[order.status] || order.status}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {formatDate(order.created_at)}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

