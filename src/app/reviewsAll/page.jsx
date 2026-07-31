import ReviewCard from "@/components/review/reviewCard";
import reviews from "@/components/review/reviewData";

export default function ReviewsAllPage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center">
          Review Customer
        </h1>

        <p className="text-center text-gray-600 mt-3">
          Terima kasih kepada seluruh customer yang telah mempercayai kami.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}