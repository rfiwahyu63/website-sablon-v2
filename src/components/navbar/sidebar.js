"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  House,
  Handshake,
  Images,
  Phone,
  ShoppingCart,
  Menu,
} from "lucide-react";

const menus = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "Service",
    href: "/#service",
    child: true,
    icon: Handshake,
  },
  // {
  //   name: "Portfolio",
  //   href: "/#portfolio",
  //   child: true,
  //   icon: Images,
  // },
  {
    name: "Review",
    href: "/#review",
    child: true,
    icon: Images,
  },
  {
    name: "Contact",
    href: "/#contact",
    child: true,
    icon: Phone,
  },
  {
    name: "Order",
    href: "/order",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  // Untuk reponsive sidebar
  const [isOpen, setIsOpen] = useState(false);
  //
  // animasi garis bawah
  const parentClass =
    "after:content-[''] after:block after:mt-2 after:h-0.5 after:bg-amber-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-60";
  //
  return (
    <>
      <button
        className="fixed bottom-2 left-1/2 -translate-x-1/2  z-50 lg:hidden  bg-gray-500 text-white rounded-2xl px-43 py-2 shadow-xl hover:scale-105 hover:bg-gray-600 transition delay-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* sidebar mobile */}
      <aside
        className={`fixed bottom-0 left-0 w-full h-[70vh] rounded-t-3xl lg:hidden bg-primary z-50 gap-10 shadow-[0_-8px_20px_rgba(0,0,0,0.2)] transition-transform duration-700 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-[120%]"} `}
        onClick={() => setIsOpen(false)}
      >
        <div className="flex justify-center py-3">
          <div className="w-14 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* Logo */}
        <div className="pt-2 pb-6 flex justify-center">
          <Image
            src="/assets/logo-rfidesigntrans.png"
            alt="RFI Logo"
            width={140}
            height={50}
            priority
          />
        </div>

        <div className="w-full">
          <ul className="flex flex-col gap-5 ml-25">
            {menus.map((menu) => {
              const Icon = menu.icon;
              return (
                <li
                  key={menu.name}
                  className={`inline-block relative ${!menu.child ? parentClass : ""}`}
                >
                  <Link
                    href={menu.href}
                    className={`flex gap-4 cursor-pointer hover:text-amber-400 transition delay-75 ${menu.child ? "pl-10 text-sm text-gray-500" : "font-medium"}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{menu.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* sidebar dekstop */}

      <aside className="hidden lg:flex fixed left-0 top-0 flex-col overflow-y-auto w-56 h-dvh bg-transparent gap-20 rounded-md border border-gray-200">
        {/* Logo */}
        <div className="pb-6 flex justify-center">
          <Image
            src="/assets/logo-rfidesigntrans.png"
            alt="RFI Logo"
            width={140}
            height={50}
            priority
          />
        </div>

        <div className="w-full">
          <ul className="flex flex-col ml-8 gap-5">
            {menus.map((menu) => {
              const Icon = menu.icon;
              return (
                <li
                  key={menu.name}
                  className={`inline-block relative ${!menu.child ? parentClass : ""}`}
                >
                  <Link
                    href={menu.href}
                    className={`flex gap-4 cursor-pointer hover:text-amber-400 transition delay-75 ${menu.child ? "pl-10 text-sm text-gray-500" : "font-medium"}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{menu.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
