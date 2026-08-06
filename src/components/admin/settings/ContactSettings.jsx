export default function ContactSettings({ info, updateField }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Kontak
      </h2>

      <div className="mt-4 space-y-4">
        <Field
          label="WhatsApp (format 08xxx)"
          value={info.whatsapp}
          onChange={(value) =>
            updateField("whatsapp", value)
          }
        />

        <Field
          label="Email"
          value={info.email}
          onChange={(value) =>
            updateField("email", value)
          }
        />

        <Field
          label="Alamat"
          value={info.alamat}
          onChange={(value) =>
            updateField("alamat", value)
          }
        />
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