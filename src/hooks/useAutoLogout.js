'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

const TIMEOUT_MS = 30 * 60 * 1000;      // 30 menit total idle
const WARNING_BEFORE_MS = 60 * 1000;    // tampilkan warning 60 detik sebelum logout

export function useAutoLogout() {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      window.location.href = '/admin/login';
    };

    const clearAllTimers = () => {
      clearTimeout(logoutTimerRef.current);
      clearTimeout(warningTimerRef.current);
      clearInterval(countdownIntervalRef.current);
    };

    const startCountdown = () => {
      setShowWarning(true);
      setCountdown(WARNING_BEFORE_MS / 1000);

      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const resetTimer = () => {
      // kalau warning sedang tampil, aktivitas user tidak otomatis membatalkan
      // (biar user harus klik "Tetap Login" secara sadar) — hapus baris ini
      // kalau mau aktivitas apapun langsung reset timer meski warning sudah muncul
      if (showWarning) return;

      clearAllTimers();

      warningTimerRef.current = setTimeout(startCountdown, TIMEOUT_MS - WARNING_BEFORE_MS);
      logoutTimerRef.current = setTimeout(doLogout, TIMEOUT_MS);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearAllTimers();
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [showWarning]);

  const stayLoggedIn = () => {
    setShowWarning(false);
    setCountdown(60);
    // effect di atas akan otomatis re-run resetTimer karena showWarning berubah,
    // tapi kita panggil manual biar timer langsung jalan lagi tanpa nunggu event user
    window.dispatchEvent(new Event('mousemove'));
  };

  return { showWarning, countdown, stayLoggedIn };
}
