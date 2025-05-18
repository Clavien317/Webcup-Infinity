import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { User, Heart, MessageSquare, Clock, ExternalLink } from "lucide-react";
import VoteButton from "./VoteButton.jsx";
import CommentSection from "./CommentSection.jsx";

export default function FarewellCard({ page }) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const truncateMessage = (message, maxLength = 200) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString) => {
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

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <motion.div
      className="card bg-base-100 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="card-body">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <User className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{page.author}</h3>
            <div className="text-xs opacity-70 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(page.createdAt)}
            </div>
          </div>
          <div className="ml-auto">
            <span className={`badge ${page.emotion.color}`}>
              {page.emotion.emoji} {page.emotion.name}
            </span>
          </div>
        </div>

        <h2 className="card-title text-xl mb-2">{page.title}</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="badge badge-outline">
            {page.scenario === "heartbreak"
              ? "Heartbreak & Relationships"
              : page.scenario === "family-friends"
              ? "Friends & Family"
              : page.scenario === "career"
              ? "Career & Work"
              : page.scenario === "life-chapter"
              ? "Life Chapter"
              : "Other"}
          </div>
          <div className="badge badge-outline capitalize">{page.tone}</div>
        </div>

        <p className="mb-4 text-sm opacity-90">
          {truncateMessage(page.message)}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5 text-red-500" />
              <span>{page.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-5 h-5" />
              <span>{page.comments}</span>
            </div>
          </div>

          <a
            href={`/farewell/${page.id}`}
            className="btn btn-primary btn-sm gap-2"
          >
            Read More
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {showComments && <CommentSection pageId={page.id} />}
      </div>
    </motion.div>
  );
}
