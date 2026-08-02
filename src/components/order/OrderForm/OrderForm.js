"use client";

import { useState } from "react";
import { calculateOrderPrice } from "../priceCalculator";

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

  /* CREATE ORDER DATA */

  function createOrderData() {
    /* DATA UNTUK PRICE CALCULATOR */

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

    /* ORDER RESMI */

    return {
      // ORDER
      orderId: null,
      status: "WAITING_PAYMENT",

      // CUSTOMER
      customer: {
        nama: formData.nama,
        whatsapp: formData.whatsapp,
        alamat: formData.alamat,
      },

      // PRODUCT
      product: {
        jenisOrder: formData.jenisOrder,
        bahan: formData.bahan,
        warna: formData.warna,
      },

      // DESIGN
      desain: {
        desainList: formData.desainList,
        mockup: formData.mockup,
      },

      // QUANTITY
      quantity: {
        jumlah: formData.jumlah,
        ukuran: formData.ukuran,
        total: price.totalQuantity,
      },

      // SHIPPING
      shipping: {
        pengiriman: formData.pengiriman,
        ongkir: price.ongkir,
      },

      // ADDITIONAL
      catatan: formData.catatan,

      // PAYMENT
      pembayaran: {
        metode: "",
        bukti: null,
        status: "UNPAID",
      },

      // PRICE
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

  function handleSubmit(e) {
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

    /* BUAT ORDER RESMI */

    const orderData = createOrderData();

    /* KIRIM KE PARENT */

    if (onSubmitOrder) {
      onSubmitOrder(orderData);
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

          {/* SUBMIT */}

          <div className="bg-gray-50 p-6 sm:p-8">
            <button
              type="submit"
              className="w-full rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Lihat Ringkasan Pesanan
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
