"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { statusLabel } from "@/lib/statusLabel";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("semua");

  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal fetch orders:", error.message);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Memuat data...
        </p>
      </div>
    );
  }

  const filteredOrders =
    filterStatus === "semua"
      ? orders
      : orders.filter(
          (order) => order.status === filterStatus
        );

  const totalOrder = orders.length;

  const menungguPembayaran = orders.filter(
    (order) => order.status === "wait_payment"
  ).length;

  const diproses = orders.filter(
    (order) => order.status === "diproses"
  ).length;

  const selesai = orders.filter(
    (order) => order.status === "selesai"
  ).length;

  const kadaluarsa = orders.filter(
    (order) => order.status === "expired"
  ).length;

  function getStatusStyle(status) {
    const styles = {
      wait_payment:
        "bg-yellow-100 text-yellow-700",

      dibayar:
        "bg-green-100 text-green-700",

      diproses:
        "bg-blue-100 text-blue-700",

      selesai:
        "bg-gray-100 text-gray-700",

      expired:
        "bg-red-100 text-red-700",
    };

    return (
      styles[status] ||
      "bg-gray-100 text-gray-700"
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Dashboard Admin
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kelola order RFI Design
            </p>
          </div>
        </div>

        {/* Statistik */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">

          {/* Total Order */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Order
            </p>

            <p className="mt-2 text-2xl font-bold">
              {totalOrder}
            </p>
          </div>

          {/* Menunggu Pembayaran */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Menunggu Pembayaran
            </p>

            <p className="mt-2 text-2xl font-bold">
              {menungguPembayaran}
            </p>
          </div>

          {/* Diproses */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Diproses
            </p>

            <p className="mt-2 text-2xl font-bold">
              {diproses}
            </p>
          </div>

          {/* Selesai */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Selesai
            </p>

            <p className="mt-2 text-2xl font-bold">
              {selesai}
            </p>
          </div>

          {/* Kadaluarsa */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Kadaluarsa
            </p>

            <p className="mt-2 text-2xl font-bold">
              {kadaluarsa}
            </p>
          </div>

        </div>

        {/* Filter */}
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Filter Order
          </p>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["semua", ...Object.keys(statusLabel)].map(
              (status) => (
                <button
                  key={status}
                  onClick={() =>
                    setFilterStatus(status)
                  }
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                    filterStatus === status
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status === "semua"
                    ? "Semua Order"
                    : statusLabel[status] || status}
                </button>
              )
            )}
          </div>
        </div>

        {/* Tabel Order */}
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold">
              Daftar Order
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {filteredOrders.length} order ditampilkan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* Table Head */}
              <thead className="bg-gray-50">
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3">
                    Kode Order
                  </th>

                  <th className="px-5 py-3">
                    Nama
                  </th>

                  <th className="px-5 py-3">
                    WhatsApp
                  </th>

                  <th className="px-5 py-3">
                    Jenis
                  </th>

                  <th className="px-5 py-3">
                    Total
                  </th>

                  <th className="px-5 py-3">
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-10 text-center text-sm text-gray-500"
                    >
                      Tidak ada order
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() =>
                        router.push(
                          `/admin/${order.id}`
                        )
                      }
                      className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-medium">
                        {order.order_code}
                      </td>

                      <td className="px-5 py-4">
                        {order.customer_nama}
                      </td>

                      <td className="px-5 py-4">
                        {order.customer_whatsapp}
                      </td>

                      <td className="px-5 py-4">
                        {order.jenis_order}
                      </td>

                      <td className="px-5 py-4">
                        Rp
                        {Number(
                          order.total || 0
                        ).toLocaleString("id-ID")}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {statusLabel[order.status] ||
                            order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </main>
  );
}