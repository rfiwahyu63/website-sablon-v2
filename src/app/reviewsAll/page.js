import ReviewCard from "@/components/review/ReviewCard";
import reviews from "@/components/review/reviewData";

export default function ReviewsAllPage() {
  
  // review terbaru muncul paling atas
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Review Customer</h1>

          <p className="mt-3 text-gray-600">
            Menampilkan {reviews.length} review dari customer kami.
          </p>
        </div>

        {/* Review List */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
