"use client";

export default function SocialSettings({
  info,
  updateField,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Media Sosial
      </h2>

      <div className="mt-4 space-y-4">
        <Field
          label="Instagram (link)"
          value={info.instagram}
          onChange={(value) =>
            updateField("instagram", value)
          }
        />

        <Field
          label="TikTok (link)"
          value={info.tiktok}
          onChange={(value) =>
            updateField("tiktok", value)
          }
        />

        <Field
          label="Facebook (link)"
          value={info.facebook}
          onChange={(value) =>
            updateField("facebook", value)
          }
        />

        <Field
          label="WhatsApp Channel (link)"
          value={info.whatsapp_channel}
          onChange={(value) =>
            updateField("whatsapp_channel", value)
          }
        />

        <Field
          label="GitHub (link)"
          value={info.github}
          onChange={(value) =>
            updateField("github", value)
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