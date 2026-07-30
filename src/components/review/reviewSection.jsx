import ReviewCard from "./reviewCard";
import reviews from "./reviewData";

export default function ReviewSection() {
  return (
    <section id="review" className="mx-6 lg:ml-56 my-15">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-bold">
          Dipercaya puluhan Customer
        </h1>

        <h4 className="text-gray-600">
          Lihat pengalaman pelanggan yang telah mempercayakan kebutuhan sablon
          digital mereka kepada kami.
        </h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-15 text-gray-600">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
