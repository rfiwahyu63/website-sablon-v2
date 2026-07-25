import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Hero() {
  return (
    <section className="p-10 bg-mist-100 rounded-md shadow-[5px_5px_5px_rgba(0,0,0,0.2)]">
      <div className="flex items-center">

        {/* Kiri */}
        <div className="w-1/2">
          <h1
            className={`${montserrat.className} text-5xl font-bold leading-tight mb-6`}
          >
            Cetak Sablon Digital Berkualitas untuk Bisnis & Kebutuhan Personal
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Tuangkan kreativitas Anda dalam sebuah desain dan aplikasikan pada
            kaos untuk kebutuhan branding maupun gaya pribadi. Hasil tajam,
            warna awet, dan proses cepat.
          </p>

          <a className="text-black px-4 py-2 rounded-lg border border-amber-500 hover:bg-amber-500 cursor-pointer transition-all"
            href="#">
            Pesan Sekarang
          </a>
        </div>

        {/* Kanan */}
      
        <div className="w-1/2 flex justify-center">
          <Image
            src="/assets/image1.png"
            alt="Hero"
            width={300}
            height={300}
          />
        </div>
      </div>
  </section>
  );
}
