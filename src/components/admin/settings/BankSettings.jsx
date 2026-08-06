"use client";

export default function BankSettings({
  rekening,
  updateRekening,
  addRekening,
  removeRekening,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Rekening
        </h2>

        <button
          type="button"
          onClick={addRekening}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          + Tambah Rekening
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {(rekening || []).map((rek, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-100 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">
                Rekening #{index + 1}
              </p>

              <button
                type="button"
                onClick={() => removeRekening(index)}
                className="text-xs text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>

            <div className="mt-3 space-y-3">
              <Field
                label="Bank"
                value={rek.bank}
                onChange={(value) =>
                  updateRekening(index, "bank", value)
                }
              />

              <Field
                label="Nomor Rekening"
                value={rek.nomor}
                onChange={(value) =>
                  updateRekening(index, "nomor", value)
                }
              />

              <Field
                label="Atas Nama"
                value={rek.atas_nama}
                onChange={(value) =>
                  updateRekening(
                    index,
                    "atas_nama",
                    value
                  )
                }
              />
            </div>
          </div>
        ))}

        {(!rekening || rekening.length === 0) && (
          <p className="text-sm text-gray-500">
            Belum ada rekening.
          </p>
        )}
      </div>
    </section>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-gray-500">
        {label}
      </label>

      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-900"
      />
    </div>
  );
}