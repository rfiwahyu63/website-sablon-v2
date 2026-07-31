"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { helpData } from "@/components/help/HelpData";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/library/contact";

export default function SearchBar () {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSearch = () => {
  const keyword = query.toLowerCase().trim();

  if (!keyword) return;

  setMessage("");

  const article = helpData.find((item) =>
    item.keywords.some((word) =>
      word.toLowerCase().includes(keyword)
    )
  );

  if (article) {
    setQuery(""); // Kosongkan input
    router.push(`/help/${article.slug}`);
    return;
  }

  setMessage(`"${query}"`);

  setTimeout(() => {
  setMessage("");
  }, 5000);
  }

  return (
    <div className="w-3/4 lg:w-md mt-4 mx-auto">
      <div className="flex items-center bg-transparent rounded-md px-2 py-1 shadow-[2px_2px_5px_rgba(0,0,0,0.2">
        <Search className="text-black" />

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setMessage(""); // hilangkan pesan saat user mulai mengetik lagi
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Cari panduan atau bantuan...?"
          className="w-full border text-gray-800 italic border-gray-300 rounded-md px-2 mx-2 outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-orange-500 cursor-pointer hover:bg-amber-700 text-white px-4 py-1 rounded-md"
        >
          Cari
        </button>
      </div>

      {message && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <h3 className="font-semibold text-red-700">
            ❌ Informasi tidak ditemukan
          </h3>

          <p className="mt-2 text-sm text-gray-700">{message}</p>

          <p className="mt-2 text-sm text-gray-600">
            Coba gunakan kata kunci lain atau hubungi kami melalui WhatsApp.
          </p>

          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            className="inline-block mt-4 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 transition"
          >
            Hubungi WhatsApp
          </Link>
        </div>
      )}
    </div>
  );
}
