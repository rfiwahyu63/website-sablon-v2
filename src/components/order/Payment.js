"use client";

import { useState } from "react";

export default function Payment({ order, onBack, onConfirm }) {
  const [metode, setMetode] = useState("");
  const [bukti, setBukti] = useState(null);

  const total = Number(order?.harga?.total || 0);

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

    const pembayaran = {
      metode,
      bukti,
      status: "WAITING_CONFIRMATION",
    };

    if (onConfirm) {
      onConfirm(pembayaran);
    }
  }

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

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    1234567890
                  </p>

                  <p className="mt-3 text-xs text-gray-500">Atas Nama</p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    RFI Design
                  </p>
                </div>
              )}

              {metode === "qris" && (
                <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center">
                  <p className="text-sm text-gray-600">
                    QRIS pembayaran akan ditampilkan di sini.
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

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setBukti(e.target.files?.[0] || null);
              }}
              className="mt-5 block w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-600"
            />

            {bukti && (
              <p className="mt-3 text-xs text-gray-500">File: {bukti.name}</p>
            )}
          </section>

          {/* ACTION */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
            >
              Kembali
            </button>

            <button
              type="submit"
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Konfirmasi Pembayaran
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
