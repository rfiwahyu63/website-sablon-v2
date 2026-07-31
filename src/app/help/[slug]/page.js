import { notFound } from "next/navigation";
import { helpData } from "@/components/help/HelpData";
import Link from "next/link";

export default async function HelpDetailPage({ params }) {
  const { slug } = await params;

  const article = helpData.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/help"
        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium mb-8"
      >
        ← Kembali ke Pusat Bantuan
      </Link>

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>

        <p className="mt-4 text-gray-600 text-lg">{article.description}</p>

        <hr className="my-8" />

        <div className="space-y-5">
          {article.content.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
                {index + 1}
              </div>

              <p className="text-gray-700 leading-7">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-orange-50 border border-orange-200 p-6 text-center">
        <h2 className="text-xl font-semibold">Masih membutuhkan bantuan?</h2>

        <p className="mt-2 text-gray-600">
          Tim kami siap membantu pertanyaan Anda melalui WhatsApp.
        </p>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          className="inline-block mt-5 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 transition"
        >
          Hubungi WhatsApp
        </a>
      </div>
    </main>
  );
}
