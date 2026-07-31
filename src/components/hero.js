import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Hero() {
  return (
    <>
      <section className="p-10 mt-4 lg:p-15 bg-transparent">
        <div className="lg:flex items-center mx-4 lg:pl-56">
          {/* Kiri */}
          <div className="lg:w-1/2">
            <h1 className={`${montserrat.className} text-3xl lg:text-5xl font-bold leading-tight mb-6`} >
              Cetak <span className="text-amber-400">Sablon Digital</span>{" "}
              Berkualitas untuk Bisnis & Kebutuhan Personal
            </h1>

            <p className="text-sm lg:text-xl text-black leading-relaxed mb-8">
              Tuangkan kreativitas Anda dalam sebuah desain dan aplikasikan pada
              kaos untuk kebutuhan branding maupun gaya pribadi. Hasil tajam,
              warna awet, dan proses cepat.
            </p>

            <a className="text-gray-600 bg-amber-500 px-4 py-2 rounded-xl hover:bg-amber-600 cursor-pointer transition delay-100"
              href="#"
            >
              Pesan Sekarang
            </a>
          </div>

          {/* Kanan */}

          <div className="mt-10 lg:w-1/2 flex justify-center">
            <Image
              src="/assets/percetakan.jpg"
              alt="percetakan"
              width={300}
              height={300}
              className="object-cover rounded-xl border-gray-900 shadow-[15px_20px_8px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
