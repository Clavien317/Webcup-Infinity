import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  Star,
  ThumbsUp,
  Award,
  Trophy,
  Smile,
  Frown,
  Meh,
} from "lucide-react";

export default function VotingSystem({ pageId, initialVotes = {} }) {
  const [votes, setVotes] = useState({
    heart: initialVotes.heart || 0,
    star: initialVotes.star || 0,
    thumbsUp: initialVotes.thumbsUp || 0,
    award: initialVotes.award || 0,
    trophy: initialVotes.trophy || 0,
    smile: initialVotes.smile || 0,
    frown: initialVotes.frown || 0,
    meh: initialVotes.meh || 0,
  });

  const [userVotes, setUserVotes] = useState({
    heart: false,
    star: false,
    thumbsUp: false,
    award: false,
    trophy: false,
    smile: false,
    frown: false,
    meh: false,
  });

  const [animating, setAnimating] = useState({});

  const handleVote = (type) => {
    if (!userVotes[type]) {
      // Mettre à jour le compteur
      setVotes({
        ...votes,
        [type]: votes[type] + 1,
      });

      // Marquer comme voté
      setUserVotes({
        ...userVotes,
        [type]: true,
      });

      // Déclencher l'animation
      setAnimating({
        ...animating,
        [type]: true,
      });

      // Réinitialiser l'animation après qu'elle soit terminée
      setTimeout(() => {
        setAnimating({
          ...animating,
          [type]: false,
        });
      }, 1000);

      // Dans une application réelle, vous feriez un appel API ici
      // fetch(`/api/pages/${pageId}/vote`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ type })
      // });
    }
  };

  const voteButtons = [
    {
      type: "heart",
      icon: Heart,
      color: "text-red-500",
      fill: "#ff2c54",
      label: "Love it",
    },
    {
      type: "star",
      icon: Star,
      color: "text-yellow-500",
      fill: "#ffc107",
      label: "Inspiring",
    },
    {
      type: "thumbsUp",
      icon: ThumbsUp,
      color: "text-blue-500",
      fill: "#3b82f6",
      label: "Great",
    },
    {
      type: "award",
      icon: Award,
      color: "text-purple-500",
      fill: "#8b5cf6",
      label: "Award",
    },
    {
      type: "trophy",
      icon: Trophy,
      color: "text-amber-500",
      fill: "#f59e0b",
      label: "Trophy",
    },
    {
      type: "smile",
      icon: Smile,
      color: "text-green-500",
      fill: "#10b981",
      label: "Happy",
    },
    {
      type: "frown",
      icon: Frown,
      color: "text-rose-500",
      fill: "#f43f5e",
      label: "Sad",
    },
    {
      type: "meh",
      icon: Meh,
      color: "text-slate-500",
      fill: "#64748b",
      label: "Meh",
    },
  ];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Rate This Farewell</h2>
        <p className="text-sm opacity-70 mb-4">
          How did this story make you feel?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {voteButtons.map(({ type, icon: Icon, color, fill, label }) => (
            <motion.button
              key={type}
              className={`btn btn-outline flex-col h-auto py-3 gap-1 ${
                userVotes[type] ? color : ""
              }`}
              onClick={() => handleVote(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={userVotes[type]}
            >
              <motion.div
                animate={
                  animating[type]
                    ? {
                        scale: [1, 1.5, 1],
                        rotate: [0, 15, -15, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <Icon
                  className="w-5 h-5"
                  fill={userVotes[type] ? fill : "none"}
                />
              </motion.div>
              <span className="text-xs">{label}</span>
              <span className="badge badge-sm">{votes[type]}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 text-center text-sm opacity-70">
          Your votes help others discover meaningful farewells
        </div>
      </div>
    </div>
  );
}
