import { useState } from "react";
import { motion } from "motion/react";

const emojiReactions = [
  { emoji: "❤️", label: "Love", count: 145 },
  { emoji: "😢", label: "Sad", count: 78 },
  { emoji: "😮", label: "Wow", count: 56 },
  { emoji: "👏", label: "Applause", count: 112 },
  { emoji: "🙏", label: "Thank you", count: 87 },
  { emoji: "🤗", label: "Hug", count: 34 },
];

export default function EmojiReactions({ pageId }) {
  const [reactions, setReactions] = useState(emojiReactions);
  const [userReactions, setUserReactions] = useState({});

  const handleReaction = (index) => {
    if (!userReactions[index]) {
      // Mettre à jour le compteur
      const updatedReactions = [...reactions];
      updatedReactions[index] = {
        ...updatedReactions[index],
        count: updatedReactions[index].count + 1,
      };

      setReactions(updatedReactions);

      // Marquer comme réagi
      setUserReactions({
        ...userReactions,
        [index]: true,
      });

      // Dans une application réelle, vous feriez un appel API ici
      // fetch(`/api/pages/${pageId}/react`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ reaction: reactions[index].label })
      // });
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {reactions.map((reaction, index) => (
        <motion.button
          key={index}
          className={`btn btn-circle ${
            userReactions[index] ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => handleReaction(index)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={userReactions[index]}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl">{reaction.emoji}</span>
            <span className="text-xs mt-1">{reaction.count}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
