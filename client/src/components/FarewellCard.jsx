/* eslint-disable no-unused-vars */
import { Clock, ExternalLink, Heart, MessageSquare, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import CommentSection from "./CommentSection.jsx";
import CommentModal from "./CommentModal";

export default function FarewellCard({ page }) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(page.likes);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const { title, author, avatar, createdAt, comments, emotion, message } = page;

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
      >
        <div className="card-body">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`
                  }
                  alt={author}
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold">{author}</h3>
              <p className="text-sm opacity-70">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h2 className="card-title mb-2">
            {title}
            <div className="badge badge-secondary">{emotion.name}</div>
          </h2>

          <p className="line-clamp-3 mb-4">{message}</p>

          <div className="card-actions justify-between items-center mt-4">
            <div className="flex gap-4">
              <button
                className={`btn btn-ghost btn-sm gap-2 ${
                  isLiked ? "text-primary" : ""
                }`}
                onClick={handleLike}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                {likesCount}
              </button>
              <button
                className="btn btn-ghost btn-sm gap-2"
                onClick={() => setIsCommentModalOpen(true)}
              >
                <MessageSquare size={18} />
                {comments}
              </button>
            </div>
            <button className="btn btn-primary btn-sm">Read More</button>
          </div>

          {showComments && <CommentSection pageId={page.id} />}
        </div>
      </motion.div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        pageId={page.id}
        comments={[]}
      />
    </>
  );
}
