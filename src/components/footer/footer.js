import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="contact" className="mt-30 border-t border-gray-100 bg-gray-50 text-gray-500 lg:pl-56">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold text-orange-500">RFI Design</h2>

            <p className="mt-4 max-w-xs leading-relaxed">
              Melayani jasa cetak DTF berkualitas untuk kebutuhan
              bisnis, UMKM, clothing, maupun personal.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="https://instagram.com/username_kamu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-pink-500 hover:text-pink-500"
              >
                <FaInstagram size={16} />
              </Link>

              <Link
                href="https://facebook.com/username_kamu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-blue-500 hover:text-blue-500"
              >
                <FaFacebook size={16} />
              </Link>

              <Link
                href="https://tiktok.com/@username_kamu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-900 hover:text-gray-900"
              >
                <FaTiktok size={16} />
              </Link>
            </div>
          </div>

          {/* Menu */}

          <div className="hidden lg:block">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Menu
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/#" className="transition hover:text-orange-500">
                  Beranda
                </Link>
              </li>

              <li>
                <Link href="/#service" className="transition hover:text-orange-500">
                  Layanan
                </Link>
              </li>

              <li>
                <Link href="/#review" className="transition hover:text-orange-500">
                  Ulasan
                </Link>
              </li>

              <li>
                <Link href="/#kontak" className="transition hover:text-orange-500">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Hubungi Kami
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-red-500" size={18} />
                <p>Bogor, Jawa Barat</p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0 text-amber-500" size={18} />
                <p>wahyurifai63@gmail.com</p>
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
              >
                <FaWhatsapp size={18} />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-200 pt-6 text-center text-sm text-zinc-500">
          © 2026 RFI Media. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}