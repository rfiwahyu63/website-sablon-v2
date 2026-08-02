"use client";

import { useState } from "react";
import { calculateOrderPrice } from "./priceCalculator";

export default function PaymentData({
  order,
  onBack,
  onSubmitPayment,
}) {
  const [metode, setMetode] = useState("");
  const [bukti, setBukti] = useState(null);

  const price = calculateOrderPrice(order);

  const formatRupiah = (value) =>
    `Rp${Number(value || 0).toLocaleString("id-ID")}`;

  function handleSubmit(e) {
    e.preventDefault();

    if (!metode) {
      alert("Silakan pilih metode pembayaran.");
      return;
    }

    if (!bukti) {
      alert("Silakan upload bukti pembayaran.");
      return;
    }

    onSubmitPayment({
      metode,
      bukti,
    });
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Pembayaran
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Lakukan pembayaran sesuai total pesanan, kemudian upload bukti
            pembayaran.
          </p>
        </div>

        {/* Total */}

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <p className="text-sm text-gray-500">
            Total Pembayaran
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {formatRupiah(price.total)}
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-400">
            Pastikan nominal pembayaran sesuai dengan total pesanan.
          </p>
        </section>

        {/* Metode Pembayaran */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Metode Pembayaran
          </h2>

          <div className="mt-5 space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <input
                type="radio"
                name="metodePembayaran"
                value="transfer-bank"
                checked={metode === "transfer-bank"}
                onChange={(e) => setMetode(e.target.value)}
                className="h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Transfer Bank
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Transfer ke rekening RFI Design.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50">
              <input
                type="radio"
                name="metodePembayaran"
                value="qris"
                checked={metode === "qris"}
                onChange={(e) => setMetode(e.target.value)}
                className="h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  QRIS
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Pembayaran melalui QRIS RFI Design.
                </p>
              </div>
            </label>
          </div>

          {/* Instruksi */}

          {metode && (
            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-900">
                Instruksi Pembayaran
              </p>

              {metode === "transfer-bank" && (
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>Bank: [Nama Bank]</p>
                  <p>No. Rekening: [Nomor Rekening]</p>
                  <p>Atas Nama: [Nama Pemilik Rekening]</p>
                </div>
              )}

              {metode === "qris" && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    Silakan scan QRIS RFI Design untuk melakukan pembayaran.
                  </p>

                  <div className="mt-4 flex h-48 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-sm text-gray-400">
                    QRIS RFI Design
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Bukti Pembayaran */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Bukti Pembayaran
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload screenshot atau foto bukti pembayaran.
          </p>

          <div className="mt-5">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                setBukti(e.target.files?.[0] || null);
              }}
              className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700"
            />

            {bukti && (
              <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3">
                <p className="truncate text-sm font-medium text-gray-700">
                  {bukti.name}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {(bukti.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Status */}

        <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm font-medium text-yellow-800">
            Pembayaran akan diverifikasi oleh admin.
          </p>

          <p className="mt-1 text-xs leading-5 text-yellow-700">
            Setelah bukti pembayaran dikirim, pesanan belum dianggap lunas
            sampai pembayaran berhasil diverifikasi.
          </p>
        </div>

        {/* Action */}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Kirim Bukti Pembayaran
          </button>
        </div>
      </div>
    </main>
  );
}