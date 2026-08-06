"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const statusLabel = {
  wait_payment: "Validasi Pembayaran Oleh Admin",
  dibayar: "Pembayaran Valid",
  diproses: "Order Dalam Proses",
  selesai: "Order Selesai",
  expired: "Order Kadaluarsa",
};

const steps = [
  { key: "wait_payment", label: "Validasi Pembayaran" },
  { key: "dibayar", label: "Pembayaran Valid" },
  { key: "diproses", label: "Order Dalam Proses" },
  { key: "selesai", label: "Order Selesai" },
  { key: "expired", label: "Order Kadaluarsa" },
  
];

export default function TrackOrderPage() {
  const { code } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_code", code)
        .single();

      if (error) {
        console.error("Order tidak ditemukan:", error.message);
      } else {
        setOrder(data);
      }

      setLoading(false);
    }

    fetchOrder();
  }, [code]);

  if (loading) return <div className="p-6">Memuat...</div>;

  if (!order) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Pesanan tidak ditemukan.</p>
      </div>
    );
  }

  return (
  <div className="mx-auto lg:ml-auto max-w-2xl p-6">
    {/* Kembali */}
      <Link
        href="/"
        className="mb-5 inline-block text-sm text-amber-500 hover:text-amber-900"
      >
        ← Kembali ke Beranda
      </Link>
    <h1 className="text-2xl font-bold"> Order Code: {order.order_code}</h1>
    <p className="mt-1 text-sm text-gray-500">
      Pantau status pesanan kamu di sini.
    </p>

    {(() => {
      const currentIndex = steps.findIndex((s) => s.key === order.status);

      return (
        <div className="mt-6 flex items-center justify-between">
          {steps.map((step, index) => {
            const isDone = index <= currentIndex;

            return (
              <div key={step.key} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                      isDone
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`mt-2 max-w-17.5 text-center text-[10px] ${
                      isDone ? "font-medium text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`mx-1 h-0.5 flex-1 ${
                      index < currentIndex ? "bg-gray-900" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    })()}

    <div className="mt-6 rounded-2xl border border-gray-200 p-6">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Status</span>
        <span className="font-medium">
          {statusLabel[order.status] || order.status}
        </span>
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-gray-500">Jenis Order</span>
        <span className="font-medium">{order.jenis_order}</span>
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-gray-500">Total</span>
        <span className="font-medium">
          Rp{Number(order.total || 0).toLocaleString("id-ID")}
        </span>
      </div>
    </div>

    <div className="mt-6 rounded-xl bg-gray-50 p-4">
      <p className="text-center text-xs leading-5 text-gray-500">
        Status pesanan akan otomatis berubah sesuai progres. Jika ada
        pertanyaan seputar pesanan kamu, silakan hubungi admin melalui
        WhatsApp.
      </p>
    </div>
  </div>
);
  }