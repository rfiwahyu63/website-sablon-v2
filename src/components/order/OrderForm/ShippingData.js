export default function ShippingData({
  formData,
  handleChange,
}) {
  const isShipping = formData.pengiriman === "kirim";

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Pengiriman
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          Pilih cara menerima pesanan kamu.
        </p>
      </div>

      {/* Pilihan Pengiriman */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-700">
          Metode Pengambilan
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Kirim */}
          <label
            className={`cursor-pointer rounded-xl border p-4 transition ${
              isShipping
                ? "border-gray-900 bg-gray-50"
                : "border-gray-200 bg-white hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="pengiriman"
                value="kirim"
                checked={formData.pengiriman === "kirim"}
                onChange={handleChange}
                className="mt-1"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Kirim
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Pesanan dikirim ke alamat yang kamu berikan.
                </p>
              </div>
            </div>
          </label>

          {/* Ambil Langsung */}
          <label
            className={`cursor-pointer rounded-xl border p-4 transition ${
              !isShipping
                ? "border-gray-900 bg-gray-50"
                : "border-gray-200 bg-white hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="pengiriman"
                value="ambil"
                checked={formData.pengiriman === "ambil"}
                onChange={handleChange}
                className="mt-1"
              />

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Ambil Langsung
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Pesanan diambil langsung di tempat RFI Design.
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Alamat */}
      {isShipping && (
        <div>
          <label
            htmlFor="alamat"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Alamat Lengkap
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Nama jalan, nomor rumah, RT/RW, desa/kelurahan, kecamatan, kabupaten/kota, provinsi"
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          <p className="mt-2 text-xs leading-5 text-gray-400">
            Pastikan alamat lengkap dan mudah ditemukan oleh kurir.
          </p>
        </div>
      )}

      {/* Info Ambil Langsung */}
      {!isShipping && (
        <div className="rounded-xl bg-gray-50 px-4 py-4">
          <p className="text-sm leading-6 text-gray-600">
            Pesanan akan disiapkan untuk diambil langsung.
            Alamat pengiriman tidak diperlukan.
          </p>
        </div>
      )}
    </section>
  );
}
