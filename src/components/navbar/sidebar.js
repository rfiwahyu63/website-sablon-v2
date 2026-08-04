"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  House,
  Handshake,
  Images,
  Phone,
  ShoppingCart,
  Menu,
  Info,
  X,
} from "lucide-react";

const menus = [
  { name: "Beranda", href: "/", icon: House },
  { name: "Layanan", href: "/#service", child: true, icon: Handshake },
  { name: "Ulasan", href: "/#review", child: true, icon: Images },
  { name: "Kontak", href: "/#contact", child: true, icon: Phone },
  { name: "Pesanan", href: "/order", icon: ShoppingCart },
  { name: "Bantuan", href: "/help", icon: Info },
];

function MenuList({ pathname, onItemClick }) {
  return (
    <ul className="flex w-full flex-col gap-1">
      {menus.map((menu) => {
        const Icon = menu.icon;
        const isActive = pathname === menu.href;

        return (
          <li key={menu.name}>
            <Link
              href={menu.href}
              onClick={onItemClick}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition ${
                menu.child ? "ml-6 text-sm" : "font-medium"
              } ${
                isActive
                  ? "bg-amber-50 text-amber-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-amber-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{menu.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Tombol menu mobile */}
      <button
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-white shadow-lg transition hover:bg-gray-800 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
        <span className="text-sm font-medium">Menu</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar mobile */}
      <aside
        className={`fixed bottom-0 left-0 z-50 h-[70vh] w-full rounded-t-3xl bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-center pb-6">
          <Image
            src="/assets/logo-rfidesigntrans.png"
            alt="RFI Logo"
            width={140}
            height={50}
            priority
          />
        </div>

        <div className="px-6">
          <MenuList pathname={pathname} onItemClick={() => setIsOpen(false)} />
        </div>
      </aside>

      {/* Sidebar desktop */}
      <aside className="fixed left-0 top-0 hidden h-dvh w-56 flex-col border-r border-gray-100 bg-white lg:flex">
        <div className="flex justify-center py-8">
          <Image
            src="/assets/logo-rfidesigntrans.png"
            alt="RFI Logo"
            width={140}
            height={50}
            priority
          />
        </div>

        <div className="px-4">
          <MenuList pathname={pathname} />
        </div>
      </aside>
    </>
  );
}