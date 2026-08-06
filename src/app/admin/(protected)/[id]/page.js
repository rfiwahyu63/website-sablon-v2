"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { supabase } from "@/lib/supabase";
import { statusLabel } from "@/lib/statusLabel";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const router = useRouter();

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
        setDesigns(designData || []);
      }

      setLoading(false);
    }

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6">Memuat data...</div>;
  }

  if (!order) {
    return <div className="p-6">Order tidak ditemukan.</div>;
  }

  async function handleUpdateStatus(newStatus) {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Gagal update status: " + error.message);
    } else {
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    }
  }

  async function handleDeleteOrder() {
    const konfirmasi = confirm(
      "Yakin hapus order ini? Tidak bisa dibatalkan.",
    );

    if (!konfirmasi) return;

    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      alert("Gagal hapus order: " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert(
        "Order tidak terhapus. Kemungkinan izin akses (RLS) belum diatur.",
      );
      return;
    }

    router.push("/admin");
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

  const statusColor = {
  wait_payment: "bg-yellow-100",
  dibayar: "bg-blue-100",
  diproses: "bg-indigo-100",
  selesai: "bg-green-100",
  expired: "bg-red-100",
};

  return (
    <div className="mx-auto mt-10 max-w-3xl p-6">
      {/* Kembali */}
      <Link
        href="/admin"
        className="mb-5 inline-block text-sm text-amber-500 hover:text-amber-900"
      >
        ← Kembali ke Daftar Order
      </Link>

      {/* HEADER */}
      <div className="mb-6">
        <p className="text-xs text-gray-500">Detail Order</p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900">
          {order.order_code}
        </h1>

        <p className="mt-1 text-xs text-gray-400">
          ID: {order.id}
        </p>
      </div>

      <div className="space-y-6">
        {/* DATA CUSTOMER */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Data Customer
          </h2>

          <div className="mt-5 space-y-4">
            <InfoRow label="Nama" value={order.customer_nama} />

            <InfoRow
              label="WhatsApp"
              value={order.customer_whatsapp}
            />

            {order.customer_alamat && (
              <InfoRow
                label="Alamat"
                value={order.customer_alamat}
              />
            )}
          </div>
        </section>

        {/* DETAIL PRODUK */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Detail Produk
          </h2>

          <div className="mt-5 space-y-4">
            <InfoRow
              label="Jenis Order"
              value={order.jenis_order}
            />

            {order.bahan && (
              <InfoRow
                label="Bahan"
                value={order.bahan}
              />
            )}

            {order.warna && (
              <InfoRow
                label="Warna"
                value={order.warna}
              />
            )}
          </div>
        </section>

        {/* JUMLAH PESANAN */}
{order.ukuran && (
  <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-900">
      Jumlah Pesanan
    </h2>

    <div className="mt-5 space-y-3">
      {typeof order.ukuran === "string" ? (
        <p className="text-sm text-gray-700">
          {order.ukuran}
        </p>
      ) : (
        Object.entries(order.ukuran).map(([lengan, ukuranData]) => (
          <div
            key={lengan}
            className="rounded-xl bg-gray-50 p-4"
          >
            <p className="text-sm font-medium capitalize text-gray-900">
              Lengan {lengan}
            </p>

            <div className="mt-2 space-y-1">
              {Object.entries(ukuranData).map(
                ([ukuran, jumlah]) => (
                  <div
                    key={ukuran}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-500">
                      Ukuran {ukuran}
                    </span>

                    <span className="font-medium text-gray-900">
                      {jumlah} pcs
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        ))
      )}

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-900">
            Total
          </span>

          <span className="font-bold text-gray-900">
            {Object.values(order.ukuran)
              .flatMap((lengan) => Object.values(lengan))
              .reduce((total, jumlah) => total + Number(jumlah), 0)}{" "}
            pcs
          </span>
        </div>
      </div>
    </div>
  </section>
)}

        {/* DESAIN */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            File Desain
          </h2>

          {designs.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {designs.map((desain) => (
                <div
                  key={desain.id}
                  className="rounded-xl border border-gray-200 p-3"
                >
                  <Image
                    src={desain.file_url}
                    alt={desain.posisi || "Desain"}
                    width={500}
                    height={300}
                    className="h-40 w-full rounded-lg object-cover"
                  />

                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900">
                      {desain.posisi}
                    </p>

                    {desain.ukuran && (
                      <p className="mt-1 text-xs text-gray-400">
                        Ukuran: {desain.ukuran}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      downloadFile(
                        desain.file_url,
                        `desain-${desain.posisi}-${order.order_code}.jpg`,
                      )
                    }
                    className="mt-3 text-xs text-gray-500 underline"
                  >
                    Download Desain
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              Tidak ada file desain.
            </p>
          )}
        </section>

        {/* MOCKUP */}
        {order.mockup_url && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Mockup
            </h2>

            <div className="mt-5">
              <Image
                src={order.mockup_url}
                alt="Mockup"
                width={500}
                height={300}
                className="max-w-full rounded-xl border border-gray-200"
              />

              <button
                onClick={() =>
                  downloadFile(
                    order.mockup_url,
                    `mockup-${order.order_code}.jpg`,
                  )
                }
                className="mt-3 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Download Mockup
              </button>
            </div>
          </section>
        )}

        {/* PENGIRIMAN */}
        {(order.pengiriman || order.ongkir) && (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Pengiriman
            </h2>

            <div className="mt-5 space-y-4">
              {order.pengiriman && (
                <InfoRow
                  label="Metode Pengiriman"
                  value={order.pengiriman}
                />
              )}

              {order.ongkir && (
                <InfoRow
                  label="Ongkir"
                  value={`Rp${Number(order.ongkir).toLocaleString(
                    "id-ID",
                  )}`}
                />
              )}
            </div>
          </section>
        )}

        {/* CATATAN */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Catatan Customer
          </h2>

          {order.catatan ? (
            <div className="mt-4 rounded-xl bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {order.catatan}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              Tidak ada catatan dari customer.
            </p>
          )}
        </section>

        {/* PEMBAYARAN */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Pembayaran
          </h2>

          <div className="mt-5 space-y-4">
            {order.payment_method && (
              <InfoRow
                label="Metode Pembayaran"
                value={order.payment_method}
              />
            )}

            {order.payment_bukti_url ? (
              <div>
                <p className="mb-3 text-xs text-gray-500">
                  Bukti Pembayaran
                </p>

                <Image
                  src={order.payment_bukti_url}
                  alt="Bukti pembayaran"
                  width={500}
                  height={300}
                  className="max-w-full rounded-xl border border-gray-200"
                />

                <button
                  onClick={() =>
                    downloadFile(
                      order.payment_bukti_url,
                      `bukti-${order.order_code}.jpg`,
                    )
                  }
                  className="mt-3 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Download Bukti Pembayaran
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada bukti pembayaran.
              </p>
            )}
          </div>
        </section>

        {/* RINGKASAN HARGA */}
<section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">
    Ringkasan Harga
  </h2>

  <div className="mt-5 space-y-3">
    {order.harga_bahan && (
      <div className="flex items-start justify-between text-sm">
        <span className="text-gray-500">
          Bahan (Rp{Number(order.harga_bahan).toLocaleString("id-ID")} × {order.jumlah || 1})
        </span>
        <span className="font-medium text-gray-900">
          Rp{Number(order.harga_bahan * (order.jumlah || 1)).toLocaleString("id-ID")}
        </span>
      </div>
    )}

    {order.harga_desain && (
      <div className="flex items-start justify-between text-sm">
        <span className="text-gray-500">
          Desain (Rp{Number(order.harga_desain).toLocaleString("id-ID")} × {order.jumlah || 1})
        </span>
        <span className="font-medium text-gray-900">
          Rp{Number(order.harga_desain * (order.jumlah || 1)).toLocaleString("id-ID")}
        </span>
      </div>
    )}

    <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
      <span className="text-gray-600">Subtotal Produk</span>
      <span className="font-medium text-gray-900">
        Rp{Number(
          ((order.harga_bahan || 0) + (order.harga_desain || 0)) * (order.jumlah || 1)
        ).toLocaleString("id-ID")}
      </span>
    </div>

    {order.ongkir && (
      <InfoRow
        label="Ongkir"
        value={`Rp${Number(order.ongkir).toLocaleString("id-ID")}`}
      />
    )}

    {order.diskon && (
      <InfoRow
        label="Diskon"
        value={`- Rp${Number(order.diskon).toLocaleString("id-ID")}`}
      />
    )}

    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <span className="font-semibold text-gray-900">Total</span>
      <span className="text-lg font-bold text-gray-900">
        Rp{Number(order.total || 0).toLocaleString("id-ID")}
      </span>
    </div>
  </div>
</section>

        {/* STATUS */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Status Order
          </h2>

          <div className={`mt-4 rounded-xl p-4 ${statusColor[order.status] || "bg-gray-50"}`}>
            <p className="text-xs text-gray-500">
              Status Saat Ini
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {statusLabel[order.status] || order.status}
            </p>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm font-medium text-gray-700">
              Ubah Status
            </p>

            <div className="flex flex-wrap gap-2">
              {Object.keys(statusLabel).map((status) => (
                <button
                  key={status}
                  onClick={() => handleUpdateStatus(status)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                    order.status === status
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {statusLabel[status] || status}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* HAPUS */}
        <div className="pb-10">
          <button
            onClick={handleDeleteOrder}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Hapus Order
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 text-sm">
      <span className="shrink-0 text-gray-500">
        {label}
      </span>

      <span className="text-right font-medium text-gray-900">
        {value || "-"}
      </span>
    </div>
  );
}