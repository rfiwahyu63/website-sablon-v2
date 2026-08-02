"use client";

import { calculateOrderPrice } from "./priceCalculator";
import orderData from "./OrderData";

export default function OrderSummary({ order, onBack, onContinue }) {
  const price = calculateOrderPrice({
    ...order,

    // Sementara calculator masih menggunakan struktur lama
    jenisOrder: order.product?.jenisOrder,
    bahan: order.product?.bahan,
    warna: order.product?.warna,
    ukuran: order.quantity?.ukuran,
    jumlah: order.quantity?.jumlah,
    desainList: order.desain?.desainList,
    pengiriman: order.shipping?.pengiriman,
    ongkir: order.shipping?.ongkir,
  });

  const formatRupiah = (value) =>
    `Rp${Number(value || 0).toLocaleString("id-ID")}`;

  /* DATA PRODUCT */

  const jenisOrder = orderData.jenisOrder.find(
    (item) => item.id === order.product?.jenisOrder,
  );

  const bahan = orderData.bahan.find(
    (item) => item.id === order.product?.bahan,
  );

  const warna = orderData.warna.find(
    (item) => item.id === order.product?.warna,
  );

  /* DATA DESAIN */

  const getDesainName = (ukuranId) => {
    const ukuran = orderData.ukuranDesain.find(
      (item) => item.id === ukuranId,
    );

    return ukuran?.name || ukuranId || "-";
  };

  /* TYPE ORDER */

  const jenisOrderId = order.product?.jenisOrder;

  const isTotebag = jenisOrderId === "totebag";

  const isHoodie = jenisOrderId === "hoodie";

  const isKaos = jenisOrderId === "kaos";

  const isBahanCustomer =
    order.product?.bahan === "bahan-customer";

  /* QUANTITY */

  const ukuran = order.quantity?.ukuran || {};

  const totalQuantity = order.quantity?.total || 0;

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Ringkasan Pesanan
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Periksa kembali data pesanan sebelum melanjutkan pembayaran.
          </p>
        </div>

        {/* CUSTOMER */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Data Customer
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                Nama
              </span>

              <span className="text-right text-sm font-medium text-gray-900">
                {order.customer?.nama || "-"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                WhatsApp
              </span>

              <span className="text-right text-sm font-medium text-gray-900">
                {order.customer?.whatsapp || "-"}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-500">
                Alamat
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-900">
                {order.customer?.alamat || "-"}
              </p>
            </div>

          </div>
        </section>

        {/* PRODUCT */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Detail Produk
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                Jenis Order
              </span>

              <span className="text-right text-sm font-medium text-gray-900">
                {jenisOrder?.name || "-"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                Bahan
              </span>

              <span className="text-right text-sm font-medium text-gray-900">
                {bahan?.name || "-"}
              </span>
            </div>

            {warna && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Warna
                </span>

                <span className="text-right text-sm font-medium text-gray-900">
                  {warna.name}
                </span>
              </div>
            )}

          </div>
        </section>

        {/* QUANTITY */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Jumlah Pesanan
          </h2>

          <div className="mt-5 space-y-4">

            {/* BAHAN CUSTOMER */}

            {isBahanCustomer && (
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Jumlah Cetak
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {totalQuantity} pcs
                  </span>
                </div>
              </div>
            )}

            {/* TOTEBAG */}

            {isTotebag && !isBahanCustomer && (
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Jumlah Totebag
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {totalQuantity} pcs
                  </span>
                </div>
              </div>
            )}

            {/* HOODIE */}

            {isHoodie && !isBahanCustomer && (
              <div className="rounded-xl bg-gray-50 p-4">

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Jumlah Hoodie
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {totalQuantity} pcs
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                  {Object.entries(ukuran)
                    .filter(([, jumlah]) => Number(jumlah) > 0)
                    .map(([size, jumlah]) => (
                      <span
                        key={size}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600"
                      >
                        {size}: {jumlah} pcs
                      </span>
                    ))}

                </div>

              </div>
            )}

            {/* KAOS PENDEK */}

            {isKaos &&
              price.quantityPendek > 0 && (
                <div className="rounded-xl bg-gray-50 p-4">

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Lengan Pendek
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      {price.quantityPendek} pcs
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {Object.entries(
                      ukuran.pendek || {},
                    )
                      .filter(
                        ([, jumlah]) =>
                          Number(jumlah) > 0,
                      )
                      .map(([size, jumlah]) => (
                        <span
                          key={size}
                          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600"
                        >
                          {size}: {jumlah} pcs
                        </span>
                      ))}

                  </div>

                </div>
              )}

            {/* KAOS PANJANG */}

            {isKaos &&
              price.quantityPanjang > 0 && (
                <div className="rounded-xl bg-gray-50 p-4">

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Lengan Panjang
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      {price.quantityPanjang} pcs
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {Object.entries(
                      ukuran.panjang || {},
                    )
                      .filter(
                        ([, jumlah]) =>
                          Number(jumlah) > 0,
                      )
                      .map(([size, jumlah]) => (
                        <span
                          key={size}
                          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600"
                        >
                          {size}: {jumlah} pcs
                        </span>
                      ))}

                  </div>

                </div>
              )}

            {/* TOTAL */}

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">

              <span className="text-sm font-medium text-gray-600">
                Total Pesanan
              </span>

              <span className="text-base font-bold text-gray-900">
                {totalQuantity} pcs
              </span>

            </div>

          </div>
        </section>

        {/* DESIGN */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Desain
          </h2>

          <div className="mt-5 space-y-3">

            {(order.desain?.desainList || []).map(
              (desain, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-gray-50 p-4"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Desain {index + 1}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Posisi:{" "}
                        {desain.posisi || "-"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Ukuran:{" "}
                        {getDesainName(
                          desain.ukuran,
                        )}
                      </p>
                    </div>

                    <span className="max-w-40 truncate text-right text-xs text-gray-500">
                      {desain.file?.name ||
                        "File desain"}
                    </span>

                  </div>

                </div>
              ),
            )}

          </div>

          {/* MOCKUP */}

          {order.desain?.mockup && (
            <div className="mt-4 rounded-xl bg-gray-50 p-4">

              <p className="text-sm font-medium text-gray-900">
                Mockup / Contoh Hasil Jadi
              </p>

              <p className="mt-1 truncate text-xs text-gray-500">
                {order.desain.mockup.name}
              </p>

            </div>
          )}
        </section>

        {/* SHIPPING */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Pengiriman
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                Metode
              </span>

              <span className="text-sm font-medium text-gray-900">
                {order.shipping?.pengiriman === "kirim"
                  ? "Dikirim"
                  : "Ambil Langsung"}
              </span>
            </div>

            {order.shipping?.pengiriman === "kirim" && (
              <div className="border-t border-gray-100 pt-4">

                <p className="text-xs text-gray-500">
                  Alamat Pengiriman
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-900">
                  {order.customer?.alamat || "-"}
                </p>

              </div>
            )}

          </div>
        </section>

        {/* CATATAN */}

        {order.catatan && (
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-lg font-semibold text-gray-900">
              Catatan
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              {order.catatan}
            </p>

          </section>
        )}

        {/* PRICE */}

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-lg font-semibold text-gray-900">
            Rincian Harga
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Bahan
              </span>

              <span className="text-sm font-medium text-gray-900">
                {formatRupiah(
                  price.hargaBahanTotal,
                )}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">
                Desain / Cetak
              </span>

              <span className="text-sm font-medium text-gray-900">
                {formatRupiah(
                  price.hargaDesainTotal,
                )}
              </span>
            </div>

            {price.discountAmount > 0 && (
              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-gray-500">
                  Diskon
                  {price.discountPercent > 0 &&
                    ` (${price.discountPercent}%)`}
                </span>

                <span className="text-sm font-medium text-gray-900">
                  -
                  {formatRupiah(
                    price.discountAmount,
                  )}
                </span>

              </div>
            )}

            {price.ongkir > 0 && (
              <div className="flex items-center justify-between gap-4">

                <span className="text-sm text-gray-500">
                  Ongkir
                </span>

                <span className="text-sm font-medium text-gray-900">
                  {formatRupiah(price.ongkir)}
                </span>

              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">

              <span className="text-sm font-semibold text-gray-700">
                Total
              </span>

              <span className="text-lg font-bold text-gray-900">
                {formatRupiah(price.total)}
              </span>

            </div>

          </div>

        </section>

        {/* ACTION */}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            Kembali Edit
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Lanjut Pembayaran
          </button>

        </div>

      </div>
    </main>
  );
}