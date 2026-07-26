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

export default function Sidebar () {
  // Untuk reponsive sidebar
  const [isOpen, setIsOpen] = useState(false);
  //
  return (
    <div>
      <button className="fixed p-2 m-6 bg-transparent rounded-xl shadow-[-1px_1px_8px_rgba(0,0,0,0.4)] hover:text-white transition delay-200 cursor-pointer lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}{" "}
      <>
        {/* sidebar mobile */}

        <aside className={`fixed top-0 left-0 w-48 h-screen lg:hidden bg-primary z-50 gap-10 rounded-md shadow-[3px_0px_5px_rgba(0,0,0,0.2)] transition-transform duration-700 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
          onClick={() => setIsOpen(false)}
        >
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
            <ul className="flex flex-col gap-15 ml-8 mt-20">
              {menus.map((menu) => {
                const Icon = menu.icon;
                return (
                  <li 
                    key={menu.name}
                    className="inline-block relative after:content-[''] after:block after:mt-2 after:h-0.5 after:bg-amber-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-80" >
                    <Link
                      href={menu.href}
                      className="flex font-bold italic gap-4 cursor-pointer hover:text-amber-400 transition delay-75"
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
            <ul className="flex flex-col ml-8 gap-10">
              {menus.map((menu) => {
                const Icon = menu.icon;
                return (
                  <li
                    
                      key={menu.name}
                      className="inline-block relative after:content-[''] after:block after:mt-2 after:h-0.5 after:bg-amber-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-50">
                    <Link
                      href={menu.href}
                      className="flex items-center font-bold italic gap-4 cursor-pointer hover:text-amber-400 transition delay-75"
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
    </div>
  );
}
