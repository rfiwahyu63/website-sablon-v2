import RatingStars from "./ratingStars";
import Image from "next/image";
import { CircleUser, MapPin, CalendarDays, Package } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="rounded-xl border border-gray-200 p-6 shadow-md">
      <div className="flex flex-col gap-4">
        <RatingStars rating={review.rating} />

        <p className="italic">&quot;{review.comment}&quot;</p>

        {review.image && (
          <Image
            src={review.image}
            alt={`Hasil pesanan ${review.product}`}
            width={500}
            height={300}
            className="w-full rounded-lg object-cover"
          />
        )}
        <div className="flex items-center gap-2">
          <CircleUser className="text-blue-600" size={18} />
          <span>{review.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Package className="fill-yellow-600" size={18} />
          <span>{review.product}</span>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="text-red-600" size={18} />
            <span>{review.city}</span>
          </div>
          •
          <div className="flex items-center gap-2">
            <CalendarDays className="text-green-700" size={18} />
            <span>
              {new Date(review.orderDate).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <p>{review.status}</p>
      </div>
    </div>
  );
}
