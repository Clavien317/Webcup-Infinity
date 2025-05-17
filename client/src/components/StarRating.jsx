import { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export default function StarRating({
  pageId,
  initialRating = 0,
  onRatingChange,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(initialRating > 0);

  const handleRating = (value) => {
    if (!hasVoted) {
      setRating(value);
      setHasVoted(true);

      if (onRatingChange) {
        onRatingChange(value);
      }

      // Dans une application réelle, vous feriez un appel API ici
      // fetch(`/api/pages/${pageId}/rate`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ rating: value })
      // });
    }
  };

  const ratingLabels = [
    "Rate this farewell",
    "Poor",
    "Fair",
    "Good",
    "Very good",
    "Excellent",
  ];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Rate This Farewell</h2>

        <div className="flex flex-col items-center mt-2">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                className="btn btn-ghost btn-circle"
                onMouseEnter={() => !hasVoted && setHoverRating(star)}
                onMouseLeave={() => !hasVoted && setHoverRating(0)}
                onClick={() => handleRating(star)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={hasVoted}
              >
                <Star
                  className="w-8 h-8"
                  fill={(hoverRating || rating) >= star ? "#ffc107" : "none"}
                  stroke={
                    (hoverRating || rating) >= star ? "#ffc107" : "currentColor"
                  }
                />
              </motion.button>
            ))}
          </div>

          <p className="text-sm font-medium mt-2">
            {hasVoted
              ? `You rated this ${ratingLabels[rating]}!`
              : ratingLabels[hoverRating]}
          </p>

          {hasVoted && (
            <p className="text-xs opacity-70 mt-1">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
