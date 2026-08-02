import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
   <footer id="contact" className="mt-30 text-gray-500 lg:pl-56">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 px-20 py-10">
          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold text-orange-500">RFI Design</h2>

            <p className="mt-4 leading-relaxed">
              Melayani jasa cetak DTF berkualitas untuk kebutuhan
              bisnis, UMKM, clothing, maupun personal.
            </p>
          </div>

          {/* Menu */}

          <div className="hidden lg:block lg:mx-auto">
            <h3 className="font-semibold text-xl  mb-4">Menu</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/#">Beranda</Link>
              </li>

              <li>
                <Link href="/#service">Layanan</Link>
              </li>

              <li>
                <Link href="/#review">Ulasan</Link>
              </li>

              <li>
                <Link href="/#kontak">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}

          <div>
            <div className="space-y-4 ">
              <div className="flex gap-3">
                <MapPin className="text-red-500" size={20} />
                <p>Bogor, Jawa Barat</p>
              </div>

              <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white transition"
              >
                <FaWhatsapp size={18} />
                Chat WhatsApp
              </a>

              <div className="flex gap-3">
                <Mail className="text-amber-500" size={20} />
                <p>wahyurifai63@gmail.com</p>
              </div>

              <div className="flex gap-4 text-2xl">
                <Link
                  href="https://instagram.com/username_kamu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="hover:text-pink-700 duration-300" />
                </Link>

                <Link
                  href="https://facebook.com/username_kamu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="hover:text-blue-500 duration-300" />
                </Link>

                <Link
                  href="https://tiktok.com/@username_kamu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="hover:text-gray-800 duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-500 my-10 pt-6 text-center text-zinc-500 text-sm">
          © 2026 RFI Media. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
