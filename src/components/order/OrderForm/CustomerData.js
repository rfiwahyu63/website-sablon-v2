export default function CustomerData({
  formData,
  handleChange,
}) {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Data Customer
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          Masukkan informasi untuk keperluan pemesanan.
        </p>
      </div>

      {/* Nama Lengkap */}
      <div>
        <label
          htmlFor="nama"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Nama Lengkap
        </label>

        <input
          id="nama"
          name="nama"
          type="text"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          required
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label
          htmlFor="whatsapp"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Nomor WhatsApp
        </label>

        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="Contoh: 08xxxxxxoooo"
          required
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />

        <p className="mt-2 text-xs leading-5 text-gray-400">
          Nomor ini digunakan untuk konfirmasi dan informasi pesanan.
        </p>
      </div>
    </section>
  );
}