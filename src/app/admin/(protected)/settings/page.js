"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import ContactSettings from "@/components/admin/settings/ContactSettings";
import BankSettings from "@/components/admin/settings/BankSettings";
import SocialSettings from "@/components/admin/settings/SocialSettings";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [info, setInfo] = useState({
    whatsapp: "",
    email: "",
    alamat: "",
    rekening: [],
    instagram: "",
    tiktok: "",
    facebook: "",
    whatsapp_channel: "",
    github: "",
  });

  useEffect(() => {
    async function fetchInfo() {
      const { data, error } = await supabase
        .from("business_info")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error(
          "Gagal fetch business info:",
          error.message
        );
      }

      if (data) {
        setInfo({
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          alamat: data.alamat || "",
          rekening: data.rekening || [],
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
          facebook: data.facebook || "",
          whatsapp_channel:
            data.whatsapp_channel || "",
          github: data.github || "",
        });
      }

      setLoading(false);
    }

    fetchInfo();
  }, []);

  function updateField(field, value) {
    setInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateRekening(index, field, value) {
    setInfo((prev) => {
      const updated = [...(prev.rekening || [])];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        rekening: updated,
      };
    });
  }

  function addRekening() {
    setInfo((prev) => ({
      ...prev,
      rekening: [
        ...(prev.rekening || []),
        {
          bank: "",
          nomor: "",
          atas_nama: "",
        },
      ],
    }));
  }

  function removeRekening(index) {
    setInfo((prev) => ({
      ...prev,
      rekening: (prev.rekening || []).filter(
        (_, i) => i !== index
      ),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("business_info")
      .update({
        whatsapp: info.whatsapp,
        email: info.email,
        alamat: info.alamat,
        rekening: info.rekening,
        instagram: info.instagram,
        tiktok: info.tiktok,
        facebook: info.facebook,
        whatsapp_channel: info.whatsapp_channel,
        github: info.github,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) {
      setMessage(
        "Gagal menyimpan: " + error.message
      );
    } else {
      setMessage("Berhasil disimpan.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="p-6">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Pengaturan
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Kelola informasi bisnis yang digunakan
        pada website.
      </p>

      <div className="mt-6 space-y-6">

        {/* Kontak */}
        <ContactSettings
          info={info}
          updateField={updateField}
        />

        {/* Rekening */}
        <BankSettings
          rekening={info.rekening}
          updateRekening={updateRekening}
          addRekening={addRekening}
          removeRekening={removeRekening}
        />

        {/* Media Sosial */}
        <SocialSettings
          info={info}
          updateField={updateField}
        />

        {/* Pesan */}
        {message && (
          <p
            className={`text-sm ${
              message.startsWith("Gagal")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Simpan */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {saving
            ? "Menyimpan..."
            : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}