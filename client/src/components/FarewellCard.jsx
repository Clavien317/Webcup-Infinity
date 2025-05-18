/* eslint-disable no-unused-vars */
import { ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";

export default function FarewellCard({ page }) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(page.votes);
  const [hasVoted, setHasVoted] = useState(page.hasVoted);

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

  const handleVote = () => {
    if (hasVoted) {
      setVoteCount((prev) => prev - 1);
      setHasVoted(null);
    } else {
      setVoteCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  const {author, avatar, createdAt, comments, emotion, message } = page;

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card-body">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
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
            <Link to={`/farewell/${page.id}`} className="hover:underline">
              {title}
            </Link>
            {message}
            <div className="badge badge-neutral">{emotion.name}</div>
          </h2>

          <div className="line-clamp-3 mb-4">
            {
              comments.map((cmt, idx) => (
                  // si cmt est un objet { note, texte }
                  <p key={idx} className="bg-base-200 p-3 rounded-lg">
                    <span className="text-sm">
                      {cmt.texte}{" "}
                    </span>
                  </p>
                ))

            }
              
          </div>

          <div className="card-actions justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <button
                className={`btn btn-sm ${
                  hasVoted ? "btn-primary" : "btn-ghost"
                }`}
                onClick={handleVote}
              >
                Vote {voteCount > 0 && `(${voteCount})`}
              </button>
              <button
                className="btn btn-sm btn-ghost gap-2"
                onClick={() => setIsCommentModalOpen(true)}
              >
                <MessageCircle size={18} />
                {page.comments?.length || 0}
              </button>
            </div>
            <Link
              to={`/farewell/${page.id}`}
              className="btn btn-primary btn-link text-primary"
            >
              <ExternalLink />
            </Link>
          </div>
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
