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
    href: "/service",
    icon: Handshake,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: Images,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
  },
  {
    name: "Order",
    href: "/order",
    icon: ShoppingCart,
  },
];

export default function Navbar() {
  // Untuk reponsive sidebar
  const [isOpen, setIsOpen] = useState(false);
  //
  return (
    <div>
      <button
        className="fixed p-2 m-5 bg-amber-400 rounded-2xl shadow-[-1px_1px_8px_rgba(0,0,0,0.4)] hover:text-white transition delay-200 cursor-pointer lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}{" "}
      <>
        {/* sidebar mobile */}
        <aside
          className={`fixed top-0 left-0 w-48 h-screen lg:hidden bg-slate-400 z-50 gap-10 rounded-md border-gray-200 shadow-[3px_0px_5px_rgba(0,0,0,0.2)] transition-transform duration-700 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
          onClick={() => setIsOpen(false)}
        >
          {/* Logo */}
          <div className="border-b border-gray-50/50 pb-6 flex justify-center">
            <Image
              src="/assets/logo-rfidesigntrans.png"
              alt="RFI Logo"
              width={140}
              height={50}
              priority
            />
          </div>

          <div className="w-full">
            <ul className="flex flex-col items-center gap-15 mt-20">
              {menus.map((menu) => {
                const Icon = menu.icon;
                return (
                  <li
                    className="relative after:content-[''] after:block after:pb-2 after:border-b after:border-amber-500 after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-75"
                    key={menu.name}
                  >
                    <Link
                      href={menu.href}
                      className="flex items-center font-bold italic gap-4 cursor-pointer hover:text-amber-400 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-red" />
                      <span>{menu.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* sidebar dekstop */}
        <aside className="hidden lg:flex flex-col w-56 h-screen bg-slate-400 gap-20 rounded-md border-gray-200 shadow-[3px_0px_5px_rgba(0,0,0,0.2)]">
          {/* Logo */}
          <div className="border-b border-gray-300/50 pb-6 flex justify-center">
            <Image
              src="/assets/logo-rfidesigntrans.png"
              alt="RFI Logo"
              width={140}
              height={50}
              priority
            />
          </div>

          <div className="w-full">
            <ul className="flex flex-col items-center gap-15">
              {menus.map((menu) => {
                const Icon = menu.icon;
                return (
                  <li
                    className="relative after:content-[''] after:block after:pb-2 after:border-b after:border-amber-500 after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-75"
                    key={menu.name}
                  >
                    <Link
                      href={menu.href}
                      className="flex items-center font-bold italic gap-4 cursor-pointer hover:text-amber-400 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-red" />
                      <span>{menu.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-full flex flex-col p-2 ">
            <a
              className="text-center text-amber-400 animate-floating text-2xl rounded-md font-bold cursor-pointer relative after:content-[''] after:block after:pb-2 after:border-b after:border-amber-500 after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-75"
              href="#"
            >
              Order Now!
            </a>
          </div>
        </aside>
      </>
    </div>
  );
}
