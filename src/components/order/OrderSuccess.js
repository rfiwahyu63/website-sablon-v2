"use client";

export default function OrderSuccess({ order }) {
  const formatRupiah = (value) =>
    `Rp${Number(value || 0).toLocaleString("id-ID")}`;

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">

        {/* HEADER */}

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <span className="text-2xl text-green-600">
              ✓
            </span>
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Pesanan Berhasil
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Data pesanan kamu sudah kami terima.
          </p>
        </div>

        {/* ORDER ID */}

        <section className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Order ID
          </p>

          <p className="mt-2 text-xl font-bold tracking-wide text-gray-900">
            {order?.orderId || "-"}
          </p>

          <p className="mt-3 text-xs text-gray-400">
            Simpan Order ID ini untuk mengecek pesanan kamu.
          </p>
        </section>

        {/* STATUS */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Status Pesanan
          </h2>

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">
              Status
            </span>

            <span className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700">
              Menunggu Konfirmasi Pembayaran
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">
              Pembayaran
            </span>

            <span className="text-sm font-medium capitalize text-gray-900">
              {order?.pembayaran?.metode || "-"}
            </span>
          </div>
        </section>

        {/* TOTAL */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Detail Pembayaran
          </h2>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-sm font-medium text-gray-600">
              Total Pembayaran
            </span>

            <span className="text-lg font-bold text-gray-900">
              {formatRupiah(order?.harga?.total)}
            </span>
          </div>
        </section>

        {/* INFORMATION */}

        <div className="mt-6 rounded-xl bg-gray-50 p-4">
          <p className="text-center text-xs leading-5 text-gray-500">
            Bukti pembayaran akan diperiksa oleh admin. Setelah pembayaran
            dikonfirmasi, pesanan akan masuk ke proses produksi.
          </p>
        </div>

      </div>
    </main>
  );
}