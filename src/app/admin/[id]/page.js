"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { statusLabel } from "@/lib/statusLabel";
import Link from "next/link";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal fetch order:", error.message);
      } else {
        setOrder(data);
      }

      const { data: designData, error: designError } = await supabase
      .from("order_designs")
      .select("*")
      .eq("order_id", id);

    if (designError) {
      console.error("Gagal fetch desain:", designError.message);
    } else {
      setDesigns(designData);
    }

    setLoading(false);
  }

  fetchOrder();
}, [id]);

  if (loading) return <div className="p-6">Memuat data...</div>;
  if (!order) return <div className="p-6">Order tidak ditemukan.</div>;

  async function handleUpdateStatus(newStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Gagal update status: " + error.message);
    } else {
      setOrder((prev) => ({ ...prev, status: newStatus }));
    }
  }

  async function handleDeleteOrder() {
    const konfirmasi = confirm("Yakin hapus order ini? Tidak bisa dibatalkan.");
    if (!konfirmasi) return;

    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      alert("Gagal hapus order: " + error.message);
    } else {
      router.push("/admin");
    }
  }

  async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    alert("Gagal download file: " + err.message);
  }
}

  return (
    <div className="p-6 max-w-2xl">
      <Link
        href="/admin"
        className="mb-4 inline-block text-sm text-amber-500 hover:text-amber-900"
      >
        ← Kembali ke Dashboard
      </Link>

      <h1 className="text-2xl font-bold">{order.order_code}</h1>

      <div className="mt-6 space-y-3 rounded-xl border border-gray-200 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Nama</span>
          <span className="font-medium">{order.customer_nama}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">WhatsApp</span>
          <span className="font-medium">{order.customer_whatsapp}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Jenis Order</span>
          <span className="font-medium">{order.jenis_order}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total</span>
          <span className="font-medium">
            Rp{Number(order.total || 0).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="font-medium">
            {statusLabel[order.status] || order.status}
          </span>
        </div>
      </div>

      {order.payment_bukti_url && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-gray-500">Bukti Pembayaran</p>
          <img
            src={order.payment_bukti_url}
            alt="Bukti pembayaran"
            className="max-w-sm rounded-xl border border-gray-200"
          />
          <button
  onClick={() => downloadFile(order.payment_bukti_url, `bukti-${order.order_code}.jpg`)}
  className="mt-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
>
  Download Bukti Pembayaran
</button>
        </div>
      )}

      {designs.length > 0 && (
  <div className="mt-6">
    <p className="mb-2 text-sm text-gray-500">File Desain</p>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {designs.map((desain) => (
        <div key={desain.id} className="rounded-xl border border-gray-200 p-3">
          <img
            src={desain.file_url}
            alt={desain.posisi}
            className="mb-2 h-24 w-full rounded-lg object-cover"
          />
          <p className="text-xs font-medium text-gray-700">{desain.posisi}</p>
          <p className="text-xs text-gray-400">{desain.ukuran}</p>

          <button
  onClick={() =>
    downloadFile(desain.file_url, `desain-${desain.posisi}-${order.order_code}.jpg`)
  }
  className="mt-1 text-xs text-gray-500 underline"
>
  Download Design
</button>
        </div>
      ))}
    </div>
  </div>
)}

      {order.mockup_url && (
  <div className="mt-6">
    <p className="mb-2 text-sm text-gray-500">Mockup</p>
    <img
      src={order.mockup_url}
      alt="Mockup"
      className="max-w-sm rounded-xl border border-gray-200"
    />
     <button
      onClick={() => downloadFile(order.mockup_url, `mockup-${order.order_code}.jpg`)}
      className="mt-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
    >
      Download Mockup
    </button>
  </div>
)}

      <div className="mt-8 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Ubah Status</p>

          <div className="flex gap-2">
            {["wait_payment", "dibayar", "diproses", "selesai"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(status)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                    order.status === status
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {statusLabel[status] || status}
                </button>
              ),
            )}
          </div>
        </div>

        <button
          onClick={handleDeleteOrder}
          className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Hapus Order
        </button>
      </div>
    </div>
  );
}
