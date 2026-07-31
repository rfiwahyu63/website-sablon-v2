import Link from "next/link";

export default function HelpCard({ article }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{article.title}</h2>

      <p className="mt-3 text-gray-600">{article.description}</p>

      <Link
        href={`/help/${article.slug}`}
        className="mt-5 inline-block text-orange-500 font-semibold"
      >
        Baca Selengkapnya →
      </Link>
    </div>
  );
}
