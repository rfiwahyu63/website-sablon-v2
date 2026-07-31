import Link from "next/link";
import reviews from "./reviewData";
import ReviewCard from "./ReviewCard"

export default function ReviewSection() {
  const latestReviews = reviews.slice(0, 3);

  return (
    <section id="review" className="mx-auto py-15">
  <div className="flex flex-col items-center justify-center gap-4 px-6 lg:pl-56">

    {/* Header */}

    <h1 className="text-3xl font-bold">
      Dipercaya Puluhan Customer
    </h1>

    <h4 className="text-center text-gray-600">
      Lihat ulasan pelanggan yang telah mempercayakan kebutuhan sablon
      digital mereka kepada kami.
    </h4>

    {/* Review List */}
    <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {latestReviews.map((review) => (
            <ReviewCard
            key={review.id}
            review={review}
        />
        ))}
    </div>

    {/* Button */}

    <div className="mt-6 text-center">
      <Link
        href="/reviewsAll"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Lihat Semua Review
      </Link>
    </div>

  </div>
</section>

  )}