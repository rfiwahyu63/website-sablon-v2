"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadFile } from "@/lib/uploadFile";
import { Copy, Check, Upload } from "lucide-react";

export default function Payment({ order, onBack, onConfirm }) {
  const [metode, setMetode] = useState("");
  const [bukti, setBukti] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = Number(order?.harga?.total || 0);

  const formatRupiah = (value) =>
    `Rp${Number(value || 0).toLocaleString("id-ID")}`;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!metode) {
      alert("Silakan pilih metode pembayaran.");
      return;
    }

    if (!bukti) {
      alert("Silakan upload bukti pembayaran.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. UPLOAD BUKTI TRANSFER
      const buktiUrl = await uploadFile(bukti, "bukti-transfer");

      // 2. UPDATE ROW ORDERS YANG SUDAH ADA
      const { error } = await supabase
        .from("orders")
        .update({
          payment_metode: metode,
          payment_bukti_url: buktiUrl,
          payment_status: "WAITING_CONFIRMATION",
        })
        .eq("id", order.orderId);

      if (error) {
        console.error("Update payment gagal:", error.message);
        throw error;
      }

      const pembayaran = {
        metode,
        buktiUrl,
        status: "WAITING_CONFIRMATION",
      };

      if (onConfirm) {
        onConfirm(pembayaran);
      }
    } catch (err) {
      alert("Gagal mengirim bukti pembayaran. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const [copied, setCopied] = useState(false);

  const handleCopyRekening = async () => {
    await navigator.clipboard.writeText("1234567890");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Pembayaran
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Selesaikan pembayaran untuk mengirimkan pesanan Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TOTAL PEMBAYARAN */}
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <p className="text-sm text-gray-500">Total yang harus dibayarkan</p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {formatRupiah(total)}
            </p>
          </section>
          {/* METODE PEMBAYARAN */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Metode Pembayaran
            </h2>

            <div className="mt-5 space-y-3">
              {/* TRANSFER */}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
                <input
                  type="radio"
                  name="metode"
                  value="transfer"
                  checked={metode === "transfer"}
                  onChange={(e) => setMetode(e.target.value)}
                  className="mt-1"
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Transfer Bank
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Transfer ke rekening RFI Design.
                  </p>
                </div>
              </label>

              {/* QRIS */}

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
                <input
                  type="radio"
                  name="metode"
                  value="qris"
                  checked={metode === "qris"}
                  onChange={(e) => setMetode(e.target.value)}
                  className="mt-1"
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">QRIS</p>

                  <p className="mt-1 text-xs text-gray-500">
                    Bayar menggunakan QRIS.
                  </p>
                </div>
              </label>
            </div>
          </section>
          {/* INFORMASI PEMBAYARAN */}
          {metode && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Informasi Pembayaran
              </h2>

              {metode === "transfer" && (
                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">Bank</p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    BCA
                  </p>

                  <p className="mt-3 text-xs text-gray-500">Nomor Rekening</p>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">
                      1234567890
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyRekening}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
                    >
                      {copied ? (
                        <>
                          <Check size={15} />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          Salin
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">Atas Nama</p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    RFI Design
                  </p>
                </div>
              )}

              {metode === "qris" && (
                <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center">
                  <p className="text-sm text-gray-600">
                    QRIS pembayaran akan ditampilkan di sini. Saat ini belum
                    tersedia.
                  </p>
                </div>
              )}
            </section>
          )}
        
          {/* BUKTI PEMBAYARAN */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Bukti Pembayaran
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              Upload screenshot atau foto bukti pembayaran.
            </p>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-gray-400 hover:bg-gray-100">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Upload size={22} className="text-gray-700" />
              </div>

              <p className="text-sm font-medium text-gray-900">
                Pilih bukti pembayaran
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Klik tombol di bawah untuk mencari file
              </p>

              <span className="mt-4 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                Pilih File
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setBukti(e.target.files?.[0] || null);
                }}
                className="hidden"
              />
            </label>

            {bukti && (
              <div className="mt-3 rounded-lg bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500">File yang dipilih:</p>

                <p className="mt-1 truncate text-sm font-medium text-gray-900">
                  {bukti.name}
                </p>
              </div>
            )}
          </section>
          
          {/* ACTION */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 cursor-pointer"
            >
              Kembali
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
            >
              {isSubmitting ? "Mengirim..." : "Konfirmasi Pembayaran"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
