"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }) {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session && !isLoginPage) {
        router.push("/admin/login");
        return;
      }

      setChecking(false);
    }

    checkSession();
  }, [pathname]);

  if (isLoginPage) {
    return children;
  }

  if (checking) {
    return <div className="p-6">Memeriksa sesi login...</div>;
  }

  return children;
}