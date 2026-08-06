"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAutoLogout } from "@/hooks/useAutoLogout";

export default function AdminLayout({ children }) {
  const { showWarning, countdown, stayLoggedIn } = useAutoLogout();

  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
    },
    {
      name: "Pengaturan",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white mt-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          {/* Logo */}
          <Link
            href="/admin"
            className="text-lg font-bold"
          >
            RFI Admin
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="ml-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Logout
            </button>
          </nav>

        </div>
      </header>

      {/* Content */}
      <main>
        {children}
      </main>

      {/* Auto Logout Warning */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">

            <h2 className="mb-2 text-lg font-semibold">
              Sesi akan berakhir
            </h2>

            <p className="mb-4 text-gray-600">
              Anda akan logout otomatis dalam{" "}
              <span className="font-bold">
                {countdown}
              </span>{" "}
              detik karena tidak ada aktivitas.
            </p>

            <button
              onClick={stayLoggedIn}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Tetap Login
            </button>

          </div>
        </div>
      )}

    </div>
  );
}