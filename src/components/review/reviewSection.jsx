
import ReviewCard from "./reviewCard";
import reviews from "./reviewData";
import Link from "next/link";

export default function ReviewSection() {
  const latestReviews = reviews.slice(0, 3);
  return (
    <section id="review" className=" py-15">
      <div className="flex flex-col gap-4 justify-center items-center ml-auto lg:ml-56 px-6">
        <h1 className="text-3xl font-bold">Dipercaya puluhan Customer</h1>

        <h4 className="text-gray-600">
          Lihat ulasan pelanggan yang telah mempercayakan kebutuhan sablon
          digital mereka kepada kami.
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-15 text-gray-600">
          {latestReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/reviewsAll"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lihat Semua Review
          </Link>
        </div>
      </div>
    </section>
  );
}
