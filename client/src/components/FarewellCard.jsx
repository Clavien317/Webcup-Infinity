/* eslint-disable no-unused-vars */
import { ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import axios from "axios";

export default function FarewellCard({ page }) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const [expanded, setExpanded] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
const [voteCount, setVoteCount] = useState(0);
const [hasVoted, setHasVoted] = useState(page.hasVoted || false);

  const truncateMessage = (message, maxLength = 200) => {
    if (!message) return "";
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const getScenarioLabel = (scenarioId) => {
    const scenarios = {
      heartbreak: "Heartbreak & Relationships",
      "family-friends": "Friends & Family",
      career: "Career & Work",
      "life-chapter": "Life Chapter",
      other: "Other",
    };
    return scenarios[scenarioId] || scenarioId;
  };

  const getToneLabel = (toneValue) => {
    const tones = {
      dramatic: "Dramatic",
      ironic: "Ironic",
      "ultra-cringe": "Ultra Cringe",
      classy: "Classy",
      touching: "Touching",
      absurd: "Absurd",
      "passive-aggressive": "Passive-Aggressive",
      honest: "Honest",
      nostalgic: "Nostalgic",
      hopeful: "Hopeful",
      bittersweet: "Bittersweet",
      reflective: "Reflective",
      grateful: "Grateful",
    };
    return tones[toneValue] || toneValue;
  };

// const handleVote = async () => {
//   try {
//     if (hasVoted) {
//       await axios.post(`/votes`);
//       setVoteCount((c) => c - 1);
//       setHasVoted(false);
//     } else {
//       await axios.post(`/votes`);
//       setVoteCount((c) => c + 1);
//       setHasVoted(true);
//     }
//   } catch (err) {
//     console.error("Error voting:", err);
//   }
// };

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={
                    page.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${page.author}`
                  }
                  alt={page.author}
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold">{page.author}</h3>
              <p className="text-sm opacity-70">{formatDate(page.createdAt)}</p>
            </div>
            {page.emotion && (
              <div className="ml-auto">
                <span className={`badge ${page.emotion.color}`}>
                  {page.emotion.emoji} {page.emotion.name}
                </span>
              </div>
            )}
          </div>

          <h2 className="card-title mb-2">
            <Link
              to={`/farewell/${page.id}`}
              className="hover:text-primary transition-colors"
            >
              {truncateMessage(page.message, 50)}
            </Link>
          </h2>

          <div className="line-clamp-3 mb-4 text-sm opacity-80">
            {truncateMessage(page.reponse, 150)}
          </div>

          {page.scenario && page.tone && (
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge badge-outline badge-sm">
                {getScenarioLabel(page.scenario)}
              </div>
              <div className="badge badge-outline badge-sm capitalize">
                {getToneLabel(page.tone)}
              </div>
            </div>
          )}

          <div className="card-actions justify-between items-center mt-auto">
            <div className="flex items-center gap-4">
              <button
                className={`btn btn-sm ${
                  hasVoted
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                } transition-colors`}
                onClick={()=>setVoteCount(voteCount+1)}
              >
               {voteCount?(<><p className="text-xl text-pink-600">{voteCount}</p> Voting</>):"Voting" }
              </button>
              <button
                className="btn btn-sm btn-ghost gap-2"
                onClick={() => setIsCommentModalOpen(true)}
              >
                <MessageCircle size={16} />
                {page.comments?.length || 0}
              </button>
            </div>
            <Link
              to={`/farewell/${page.id}`}
              className="btn btn-sm btn-primary btn-outline"
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </motion.div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        pageId={page.id}
        comments={page.comments || []}
      />
    </>
  );
}
