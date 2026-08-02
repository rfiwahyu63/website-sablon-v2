import orderData from "../OrderData";

export default function DesignData({
  formData,
  setFormData,
  handleDesignChange,
  handleDesignFileChange,
  addDesign,
  removeDesign,
}) {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Detail Desain
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          Tentukan posisi, ukuran, dan file untuk setiap desain.
        </p>
      </div>

      {/* Daftar desain */}
      <div className="space-y-5">
        {formData.desainList.map((desain, index) => {
          const selectedSize = orderData.ukuranDesain.find(
            (item) => item.id === desain.ukuran,
          );

          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 sm:p-6"
            >
              {/* Header desain */}
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Desain {index + 1}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Tentukan posisi dan ukuran desain.
                  </p>
                </div>

                {formData.desainList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDesign(index)}
                    className="shrink-0 text-sm font-medium text-red-500 transition hover:text-red-700"
                  >
                    Hapus
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Posisi */}
                <div>
                  <label
                    htmlFor={`posisi-${index}`}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Posisi Cetak
                  </label>

                  <select
                    id={`posisi-${index}`}
                    value={desain.posisi}
                    onChange={(e) =>
                      handleDesignChange(index, "posisi", e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  >
                    <option value="" disabled>
                      Pilih posisi cetak
                    </option>

                    <option value="depan">Depan</option>

                    <option value="belakang">Belakang</option>

                    <option value="dada-kiri">Dada Kiri</option>

                    <option value="dada-kanan">Dada Kanan</option>
                  </select>
                </div>

                {/* Ukuran */}
                <div>
                  <label
                    htmlFor={`ukuran-${index}`}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Ukuran Desain
                  </label>

                  <select
                    id={`ukuran-${index}`}
                    value={desain.ukuran}
                    onChange={(e) =>
                      handleDesignChange(index, "ukuran", e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  >
                    <option value="" disabled>
                      Pilih ukuran desain
                    </option>

                    {orderData.ukuranDesain.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upload */}
                <div>
                  <label
                    htmlFor={`file-${index}`}
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    File Desain
                  </label>

                  <input
                    id={`file-${index}`}
                    type="file"
                    accept="image/*,.pdf,.ai,.psd,.cdr"
                    onChange={(e) =>
                      handleDesignFileChange(index, e.target.files?.[0] || null)
                    }
                    required={!desain.file}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />

                  {/* File terpilih */}
                  {desain.file && (
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-700">
                          {desain.file.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {(desain.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDesignFileChange(index, null)}
                        className="shrink-0 text-sm font-medium text-red-500 transition hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  )}

                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    Format yang disarankan: JPG, PNG, PDF, AI, PSD, atau CDR.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tambah desain */}
      <button
        type="button"
        onClick={addDesign}
        className="w-full rounded-xl border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 transition hover:border-gray-500 hover:bg-gray-50"
      >
        + Tambah Desain
      </button>

      <p className="text-xs leading-5 text-gray-400">
        Tambahkan desain lain jika ingin mencetak di beberapa posisi produk.
      </p>

      {/* Mockup */}

      <div className="border-t border-gray-200 pt-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            Mockup / Contoh Hasil Jadi
          </h3>

          <p className="mt-1 text-xs leading-5 text-gray-400">
            Upload gambar contoh untuk memberikan gambaran posisi dan tampilan
            desain yang diinginkan.
          </p>
        </div>

        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => { 
              const file = e.target.files?.[0] || null; 
              setFormData((prev) => ({ 
                ...prev, mockup: file, 
              })); }}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700"
          />

          {formData.mockup && (
            <p className="mt-2 text-xs text-gray-500">
              File: {formData.mockup.name}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
