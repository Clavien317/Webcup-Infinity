import { useState } from "react";
import { ThumbsUp, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

export default function VoteButton({
  pageId,
  initialCount = 0,
  initialVoted = false,
  type = "like", // like, heart, star
}) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(initialVoted);
  const [animating, setAnimating] = useState(false);

  const handleVote = () => {
    if (!voted) {
      setCount(count + 1);
      setVoted(true);
      setAnimating(true);

      // Dans une application réelle, vous feriez un appel API ici
      // fetch(`/api/pages/${pageId}/vote`, { method: 'POST' });

      // Réinitialiser l'animation après qu'elle soit terminée
      setTimeout(() => setAnimating(false), 1000);
    }
  };

  const getIcon = () => {
    switch (type) {
      case "heart":
        return (
          <Heart
            className="w-5 h-5"
            fill={voted ? "#ff2c54" : "none"}
            stroke={voted ? "#ff2c54" : "currentColor"}
          />
        );
      case "star":
        return (
          <Star
            className="w-5 h-5"
            fill={voted ? "#ffc107" : "none"}
            stroke={voted ? "#ffc107" : "currentColor"}
          />
        );
      case "like":
      default:
        return (
          <ThumbsUp
            className="w-5 h-5"
            fill={voted ? "#3b82f6" : "none"}
            stroke={voted ? "#3b82f6" : "currentColor"}
          />
        );
    }
  };

  const getColor = () => {
    switch (type) {
      case "heart":
        return voted ? "text-red-500" : "";
      case "star":
        return voted ? "text-yellow-500" : "";
      case "like":
        return voted ? "text-blue-500" : "";
      default:
        return "";
    }
  };

  return (
    <motion.button
      className={`btn btn-ghost gap-2 ${getColor()}`}
      onClick={handleVote}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={
          animating
            ? {
                scale: [1, 1.5, 1],
                rotate: [0, 15, -15, 0],
              }
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        {getIcon()}
      </motion.div>
      {count}
    </motion.button>
  );
}
