"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { statusLabel } from "@/lib/statusLabel";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("semua");

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal fetch orders:", error.message);
      } else {
        setOrders(data);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6">Memuat data...</div>;
  }

  const filteredOrders =
    filterStatus === "semua"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  async function handleLogout() {
  await supabase.auth.signOut();
  router.push("/admin/login");
  }
  
  return (
    <div className="p-6">
      <div className="flex lg:flex-col justify-between ">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <button
    onClick={handleLogout}
    className="lg:ml-auto lg:mr-15 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-300 cursor-pointer"
  >
    Logout
  </button>
  </div>
      <p className="mt-2 text-sm text-gray-500">Total order: {orders.length}</p>

      <div className="mt-4 flex gap-2">
        {["semua", "wait_payment", "dibayar", "diproses", "selesai"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                filterStatus === status
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {statusLabel[status] || status}
            </button>
          ),
        )}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="py-2 pr-4">Kode Order</th>
              <th className="py-2 pr-4">Nama</th>
              <th className="py-2 pr-4">WhatsApp</th>
              <th className="py-2 pr-4">Jenis</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                onClick={() => router.push(`/admin/${order.id}`)}
                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2 pr-4 font-medium">{order.order_code}</td>
                <td className="py-2 pr-4">{order.customer_nama}</td>
                <td className="py-2 pr-4">{order.customer_whatsapp}</td>
                <td className="py-2 pr-4">{order.jenis_order}</td>
                <td className="py-2 pr-4">
                  Rp{Number(order.total || 0).toLocaleString("id-ID")}
                </td>
                <td className="py-2 pr-4">
                  {statusLabel[order.status] || order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
