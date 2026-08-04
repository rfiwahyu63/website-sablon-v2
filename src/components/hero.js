import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function Hero() {
  return (
    <section className="bg-transparent px-6 py-16 lg:px-10 lg:py-24">
      <div className="flex max-w-6xl flex-col items-center gap-12 lg:flex-row">
        {/* Kiri */}
        <div className="lg:w-1/2">
          <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600">
            Cetak DTF • Kualitas Premium
          </span>

          <h1
            className={`${montserrat.className} mt-5 text-3xl leading-tight text-gray-900 lg:text-5xl`}
          >
            Cetak <span className="text-amber-500">Sablon Digital</span>{" "}
            Berkualitas untuk Bisnis & Kebutuhan Personal
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-gray-600 lg:text-lg">
            Tuangkan kreativitas Anda dalam sebuah desain dan aplikasikan pada
            kaos untuk kebutuhan branding maupun gaya pribadi.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Warna Tajam & Awet
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Proses Cepat
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Cocok untuk UMKM & Personal
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/order"
              className="rounded-xl bg-amber-500 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-amber-600"
            >
              Pesan Sekarang
            </a>

            <Link
              href="/#service"
              className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>

        {/* Kanan */}
        <div className="flex justify-center lg:w-1/2">
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-amber-400/40" />

            <Image
              src="/assets/percetakan.jpg"
              alt="Proses cetak sablon digital DTF"
              width={500}
              height={500}
              className="relative h-auto w-full max-w-md rounded-2xl border border-white object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}