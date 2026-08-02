import orderData from "../OrderData";

export default function ProductData({ formData, handleChange }) {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Detail Produk
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          Pilih jenis produk dan spesifikasi yang ingin dipesan.
        </p>
      </div>

      {/* Jenis Order */}
      <div>
        <label
          htmlFor="jenisOrder"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Jenis Order
        </label>

        <select
          id="jenisOrder"
          name="jenisOrder"
          value={formData.jenisOrder}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        >
          <option value="" disabled>
            Pilih jenis order
          </option>

          {orderData.jenisOrder.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Jenis Bahan */}
      <div>
        <label
          htmlFor="bahan"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Jenis Bahan
        </label>

        <select
          id="bahan"
          name="bahan"
          value={formData.bahan}
          onChange={handleChange}
          required
          disabled={!formData.jenisOrder}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="" disabled>
            {formData.jenisOrder
              ? "Pilih jenis bahan"
              : "Pilih jenis order terlebih dahulu"}
          </option>

          {orderData.bahan
            .filter(
              (item) =>
                item.jenisOrder === formData.jenisOrder ||
                item.jenisOrder === "all",
            )
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>

        <p className="mt-2 text-xs leading-5 text-gray-400">
          Harga bahan dihitung berdasarkan jenis produk dan jumlah pesanan.
        </p>
      </div>

      {/* Warna Produk */}
      <div>
        <label
          htmlFor="warna"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Warna Produk
        </label>

        <select
          id="warna"
          name="warna"
          value={formData.warna}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        >
          <option value="" disabled>
            Pilih warna produk
          </option>

          {orderData.warna.map((warna) => (
            <option key={warna.id} value={warna.id}>
              {warna.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
