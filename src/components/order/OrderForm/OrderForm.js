"use client";

import { useState } from "react";
import { calculateOrderPrice } from "../priceCalculator";
import { supabase } from "@/lib/supabase";
import { uploadFile } from "@/lib/uploadFile";

import CustomerData from "./CustomerData";
import ProductData from "./ProductData";
import DesignData from "./DesignData";
import QuantityData from "./QuantityData";
import ShippingData from "./ShippingData";

/* INITIAL FORM DATA */

const initialFormData = {
  // CUSTOMER
  nama: "",
  whatsapp: "",
  alamat: "",

  // PRODUCT
  jenisOrder: "",
  bahan: "",
  warna: "",

  // DESIGN
  desainList: [
    {
      posisi: "",
      ukuran: "",
      file: null,
    },
  ],

  mockup: null,

  // QUANTITY
  jumlah: 0,
  ukuran: {},

  // SHIPPING
  pengiriman: "kirim",
  ongkir: 0,

  // ADDITIONAL
  catatan: "",
};

export default function OrderForm({ onSubmitOrder }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* HANDLE FORM INPUT */
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: value,
      };

      // GANTI JENIS ORDER
      if (name === "jenisOrder") {
        updatedData.bahan = "";

        updatedData.jumlah = 0;
        updatedData.ukuran = {};

        updatedData.desainList = [
          {
            posisi: "",
            ukuran: "",
            file: null,
          },
        ];

        updatedData.mockup = null;
      }

      // GANTI PENGIRIMAN
      if (name === "pengiriman" && value === "ambil") {
        updatedData.alamat = "";
        updatedData.ongkir = 0;
      }

      return updatedData;
    });
  }

  /* DESIGN */

  function handleDesignChange(index, field, value) {
    setFormData((prev) => {
      const desainList = [...prev.desainList];

      desainList[index] = {
        ...desainList[index],
        [field]: value,
      };

      return {
        ...prev,
        desainList,
      };
    });
  }

  function handleDesignFileChange(index, file) {
    setFormData((prev) => {
      const desainList = [...prev.desainList];

      desainList[index] = {
        ...desainList[index],
        file,
      };

      return {
        ...prev,
        desainList,
      };
    });
  }

  function addDesign() {
    setFormData((prev) => ({
      ...prev,

      desainList: [
        ...prev.desainList,
        {
          posisi: "",
          ukuran: "",
          file: null,
        },
      ],
    }));
  }

  function removeDesign(index) {
    setFormData((prev) => ({
      ...prev,

      desainList: prev.desainList.filter((_, i) => i !== index),
    }));
  }

  /* TOTAL QUANTITY */

  function getTotalQuantity() {
    // Bahan customer
    if (formData.bahan === "bahan-customer") {
      return Number(formData.jumlah || 0);
    }

    // Totebag
    if (formData.jenisOrder === "totebag") {
      return Number(formData.jumlah || 0);
    }

    // Hoodie
    if (formData.jenisOrder === "hoodie") {
      return Object.values(formData.ukuran || {}).reduce(
        (total, jumlah) => total + Number(jumlah || 0),
        0,
      );
    }

    // Kaos
    if (formData.jenisOrder === "kaos") {
      const quantityPendek = Object.values(
        formData.ukuran?.pendek || {},
      ).reduce((total, jumlah) => total + Number(jumlah || 0), 0);

      const quantityPanjang = Object.values(
        formData.ukuran?.panjang || {},
      ).reduce((total, jumlah) => total + Number(jumlah || 0), 0);

      return quantityPendek + quantityPanjang;
    }

    return 0;
  }

  async function submitOrderToSupabase() {
    const price = calculateOrderPrice({
      jenisOrder: formData.jenisOrder,
      bahan: formData.bahan,
      warna: formData.warna,
      jumlah: formData.jumlah,
      ukuran: formData.ukuran,
      desainList: formData.desainList,
      pengiriman: formData.pengiriman,
      ongkir: formData.ongkir,
    });

    const orderCode = await generateOrderCode();

    function generateOrderCode() {
      const now = new Date();
      const tanggal = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("");

      const nomorAcak = crypto
        .randomUUID()
        .replace(/-/g, "")
        .slice(0, 4)
        .toUpperCase();

      return `RFI-${tanggal}-${nomorAcak}`;
    }

    // 1. UPLOAD MOCKUP (kalau ada)
    const mockupUrl = formData.mockup
      ? await uploadFile(formData.mockup, "mockup")
      : null;

    // 2. INSERT KE TABLE ORDERS
    const paymentDeadline = new Date();
    paymentDeadline.setHours(paymentDeadline.getHours() + 48);

    const { data: orderRow, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_code: orderCode,
        status: "wait_payment",

        // Batas pembayaran 24 jam
        payment_deadline: paymentDeadline.toISOString(),

        customer_nama: formData.nama,
        customer_whatsapp: formData.whatsapp,
        customer_alamat: formData.alamat,

        jenis_order: formData.jenisOrder,
        bahan: formData.bahan,
        warna: formData.warna,

        mockup_url: mockupUrl,

        jumlah: formData.jumlah,
        ukuran: formData.ukuran,
        total_quantity: price.totalQuantity,

        pengiriman: formData.pengiriman,
        ongkir: price.ongkir,

        catatan: formData.catatan,

        harga_bahan: price.hargaBahan,
        harga_bahan_total: price.hargaBahanTotal,
        harga_desain_dasar: price.hargaDesainDasar,
        harga_desain_jual: price.hargaDesainJual,
        harga_desain_total: price.hargaDesainTotal,
        discount_percent: price.discountPercent,
        discount_amount: price.discountAmount,
        total_produksi: price.totalProduksi,
        total: price.total,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Insert order gagal:", orderError.message);
      throw orderError;
    }

    // 3. UPLOAD SETIAP FILE DESAIN + INSERT KE ORDER_DESIGNS
    for (const desain of formData.desainList) {
      const fileUrl = await uploadFile(desain.file, "desain");

      const { error: desainError } = await supabase
        .from("order_designs")
        .insert({
          order_id: orderRow.id,
          posisi: desain.posisi,
          ukuran: desain.ukuran,
          file_url: fileUrl,
        });

      if (desainError) {
        console.error("Insert desain gagal:", desainError.message);
        throw desainError;
      }
    }

    // BENTUK DATA UNTUK DITAMPILKAN DI ORDER SUMMARY
    return {
      orderId: orderRow.id,
      orderCode: orderRow.order_code,
      status: orderRow.status,

      customer: {
        nama: formData.nama,
        whatsapp: formData.whatsapp,
        alamat: formData.alamat,
      },

      product: {
        jenisOrder: formData.jenisOrder,
        bahan: formData.bahan,
        warna: formData.warna,
      },

      desain: {
        desainList: formData.desainList,
        mockup: formData.mockup,
      },

      quantity: {
        jumlah: formData.jumlah,
        ukuran: formData.ukuran,
        total: price.totalQuantity,
      },

      shipping: {
        pengiriman: formData.pengiriman,
        ongkir: price.ongkir,
      },

      catatan: formData.catatan,

      harga: {
        hargaBahan: price.hargaBahan,
        hargaBahanTotal: price.hargaBahanTotal,
        hargaDesainDasar: price.hargaDesainDasar,
        hargaDesainJual: price.hargaDesainJual,
        hargaDesainTotal: price.hargaDesainTotal,
        discountPercent: price.discountPercent,
        discountAmount: price.discountAmount,
        totalProduksi: price.totalProduksi,
        ongkir: price.ongkir,
        total: price.total,
      },
    };
  }

  /* HANDLE SUBMIT */

  async function handleSubmit(e) {
    e.preventDefault();
    // VALIDASI QUANTITY

    const totalQuantity = getTotalQuantity();

    if (totalQuantity < 1) {
      alert("Silakan masukkan jumlah pesanan minimal 1 pcs.");
      return;
    }

    // VALIDASI ALAMAT

    if (formData.pengiriman === "kirim" && !formData.alamat.trim()) {
      alert("Alamat lengkap wajib diisi untuk mempermudah proses pengiriman.");

      return;
    }

    // VALIDASI DESIGN

    if (formData.desainList.length < 1) {
      alert("Minimal tambahkan satu desain.");
      return;
    }

    // VALIDASI DETAIL DESIGN

    const desainTidakLengkap = formData.desainList.some(
      (desain) => !desain.posisi || !desain.ukuran || !desain.file,
    );

    if (desainTidakLengkap) {
      alert("Lengkapi posisi, ukuran, dan file untuk setiap desain.");

      return;
    }
    // SUBMIT KE SUPABASE
    setIsSubmitting(true);

    try {
      const orderRow = await submitOrderToSupabase();

      if (onSubmitOrder) {
        onSubmitOrder(orderRow);
      }
    } catch (err) {
      alert("Gagal menyimpan pesanan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* RENDER */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Buat Pesanan
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Lengkapilah detail formulir dibawah untuk melakukan pemesanan.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          {/* CUSTOMER */}

          <div className="border-b border-gray-200 p-6 sm:p-8">
            <CustomerData formData={formData} handleChange={handleChange} />
          </div>

          {/* PRODUCT */}

          <div className="border-b border-gray-200 p-6 sm:p-8">
            <ProductData formData={formData} handleChange={handleChange} />
          </div>

          {/* QUANTITY */}

          <div className="border-b border-gray-200 p-6 sm:p-8">
            <QuantityData formData={formData} setFormData={setFormData} />
          </div>

          {/* DESIGN */}

          <div className="border-b border-gray-200 p-6 sm:p-8">
            <DesignData
              formData={formData}
              setFormData={setFormData}
              handleDesignChange={handleDesignChange}
              handleDesignFileChange={handleDesignFileChange}
              addDesign={addDesign}
              removeDesign={removeDesign}
            />
          </div>

          {/* SHIPPING */}

          <div className="border-b border-gray-200 p-6 sm:p-8">
            <ShippingData formData={formData} handleChange={handleChange} />
          </div>

          {/* CATATAN — TAMBAHKAN INI */}
          <div className="border-b border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Catatan Tambahan
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Opsional — tulis permintaan khusus jika ada.
            </p>

            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              rows={4}
              placeholder="Contoh: tolong desain agak digeser ke kiri, dll."
              className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
            />
          </div>

          {/* SUBMIT */}

          <div className="bg-gray-50 p-6 sm:p-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting
                ? "Menyimpan pesanan..."
                : "Lihat Ringkasan Pesanan"}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Periksa kembali data pesanan sebelum dikirim.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
