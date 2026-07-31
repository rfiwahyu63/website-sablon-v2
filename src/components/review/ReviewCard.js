import Image from "next/image";
import {
  CircleUser,
  MapPin,
  CalendarDays,
  Package,
  Star,
} from "lucide-react";


export default function ReviewCard({ review }) {
   return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Rating */}

      <div className="mb-4 flex gap-1">
        {[...Array(review.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Comment */}

      <p className="mb-5 italic text-gray-600">
        &quot;{review.comment}&quot;
      </p>

      {/* Image */}

      {review.image && (
        <Image
          src={review.image}
          alt={`Hasil pesanan ${review.product}`}
          width={500}
          height={300}
          className="mb-5 h-52 w-full rounded-xl object-cover"
        />
      )}

      {/* Customer Info */}

      <div className="space-y-3 text-sm text-gray-700">

        <div className="flex items-center gap-3">
          <CircleUser
            size={18}
            className="text-blue-600"
          />
          <span>{review.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <Package
            size={18}
            className="text-yellow-600"
          />
          <span>{review.product}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin
            size={18}
            className="text-red-600"
          />
          <span>{review.city}</span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays
            size={18}
            className="text-green-600"
          />
          <span>
            {new Date(review.orderDate).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
        </div>

      </div>
    </div>
  );
}
