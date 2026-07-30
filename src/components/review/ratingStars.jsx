import { Star } from "lucide-react";

export default function RatingStars ({ rating }) {
  return(
    <div className="flex gap-1">
        {[...Array(rating)].map((_,index) =>(
            <Star className="fill-yellow-400 text-yellow-400" 
              key={index} 
            />
          ))
        }
    </div>
  )
}
