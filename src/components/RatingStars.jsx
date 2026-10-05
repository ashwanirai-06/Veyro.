import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map((star) => (
          <Star
            key={star}
            size={13}
            fill={star <= Math.round(rating) ? "#A3E635" : "transparent"}
            className={star <= Math.round(rating) ? "text-[#A3E635]" : "text-[#3B4655]"}
          />
        ))}
      </div>
      <span className="text-xs text-[#8B95A7]">{Number(rating || 0).toFixed(1)}</span>
      {count != null && <span className="text-xs text-[#596474]">({count})</span>}
    </div>
  );
}
