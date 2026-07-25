import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const menus = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <aside className="w-56 h-screen bg-white border-r border-gray-200 flex flex-col items-center gap-10">
      {/* Logo */}
      <div className=" border-b border-amber-500">
        <Image
          src="/assets/logo-rfidesigntrans.png"
          alt="RFI Logo"
          width={120}
          height={50}
          priority
        />
      </div>

      {/* Menu */}
      <div className="">
        <ul className="flex flex-col gap-8">
          {menus.map((menu) => (
            <li key={menu.href}>
              <Link
                href={menu.href}
                className="rounded-md font-semibold transition-all hover:text-yellow-500 border-b border-amber-500 translate-y-2 "
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tombol */}
      <div className="flex flex-col gap-8 p-20">
        <button className="p-6 rounded-md bg-amber-400 text-black font-semibold hover:bg-amber-600 cursor-pointer transition-colors">
          Order Sekarang
        </button>
      </div>
    </aside>
  );
}
