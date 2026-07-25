import Link from "next/link";
import Image from "next/image";
import { House, Handshake, Images, Phone, ShoppingCart } from "lucide-react";

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
export default function Hero() {
  return (
    <aside className=" flex flex-col items-center gap-20  w-56 h-screen bg-mist-100 border border-gray-200 shadow-[2px_0px_5px_rgba(0,0,0,0.2)]">
      {/* Logo */}
      <div className="border-b border-gray-300 pb-6 flex justify-center">
        <Image
          src="/assets/logo-rfidesigntrans.png"
          alt="RFI Logo"
          width={140}
          height={50}
          priority
        />
      </div>

      <div className="w-full">
        <ul className="flex flex-col items-center gap-8">

          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <Link
                key={menu.name}
                href={menu.href}
                className="flex items-center font-bold italic gap-4 cursor-pointer hover:text-amber-500 transition-colors">         
                <Icon className="w-5 h-5"/>
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="w-full flex flex-col p-2 ">
        <a
          className="text-center text-green-600 animate-floating text-2xl rounded-md font-bold cursor-pointer 
                            relative
                            after:content-['']
                            after:block
                            after:pb-2
                            after:border-b
                            after:border-amber-500
                            after:scale-x-0
                            after:transition-transform
                            after:duration-200
                            hover:after:scale-x-75"
          href="#"
        >
          Order Here !
        </a>
      </div>
    </aside>
  );
}
