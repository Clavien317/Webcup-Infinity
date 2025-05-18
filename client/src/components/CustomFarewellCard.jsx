import { ExternalLink, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import CommentModal from "./CommentModal";
import axios from "axios";

export default function CustomFarewellCard({ page, customStyles }) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(page.votes || 0);
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

  const handleVote = async () => {
    try {
      if (hasVoted) {
        // Annuler le vote
        await axios.post(`/votes/${page.id}/remove`);
        setVoteCount((prev) => prev - 1);
        setHasVoted(false);
      } else {
        // Ajouter un vote
        await axios.post(`/votes/${page.id}/add`);
        setVoteCount((prev) => prev + 1);
        setHasVoted(true);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // Utiliser les styles personnalisés ou des styles par défaut
  const styles = customStyles || {
    colors: {
      primary: "#EC4899",
      secondary: "#1F2937",
      accent: "#8B5CF6",
      text: "#F9FAFB",
      background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
    },
    typography: {
      fontFamily: "Space Grotesk, sans-serif",
      titleSize: "1.5rem",
      textSize: "1rem",
      lineHeight: "1.6",
    },
    effects: {
      glow: "0 0 10px rgba(236,72,153,0.5)",
      shadows: "0 4px 20px rgba(0, 0, 0, 0.25)",
      blur: "8px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
  };

  return (
    <>
      <motion.div
        className="rounded-2xl overflow-hidden backdrop-blur-md"
        style={{
          backgroundColor: `${styles.colors.secondary}15`,
          boxShadow: styles.effects.shadows,
          border: styles.effects.border,
          fontFamily: styles.typography.fontFamily,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -5,
          boxShadow: styles.effects.shadows.replace("0.25", "0.35"),
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div
                className="w-12 h-12 rounded-full"
                style={{ boxShadow: styles.effects.glow }}
              >
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
              <h3
                className="font-bold"
                style={{ color: styles.colors.primary }}
              >
                {page.author}
              </h3>
              <p
                className="text-sm opacity-70"
                style={{ color: styles.colors.text }}
              >
                {formatDate(page.createdAt)}
              </p>
            </div>
            {page.emotion && (
              <div className="ml-auto">
                <span
                  className="badge"
                  style={{
                    backgroundColor: `${styles.colors.accent}30`,
                    color: styles.colors.accent,
                    border: `1px solid ${styles.colors.accent}`,
                  }}
                >
                  {page.emotion.emoji} {page.emotion.name}
                </span>
              </div>
            )}
          </div>

          <h2
            className="text-xl font-bold mb-3"
            style={{
              color: styles.colors.primary,
              fontSize: styles.typography.titleSize,
              textShadow: styles.effects.glow,
            }}
          >
            <Link
              to={`/farewell/${page.id}`}
              className="hover:opacity-80 transition-opacity"
            >
              {truncateMessage(page.message, 50)}
            </Link>
          </h2>

          <div
            className="mb-4 text-sm opacity-80"
            style={{
              color: styles.colors.text,
              fontSize: styles.typography.textSize,
              lineHeight: styles.typography.lineHeight,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {truncateMessage(page.reponse, 150)}
          </div>

          {page.scenario && page.tone && (
            <div className="flex flex-wrap gap-2 mb-4">
              <div
                className="badge badge-sm"
                style={{
                  backgroundColor: `${styles.colors.primary}20`,
                  color: styles.colors.primary,
                  border: `1px solid ${styles.colors.primary}`,
                }}
              >
                {getScenarioLabel(page.scenario)}
              </div>
              <div
                className="badge badge-sm capitalize"
                style={{
                  backgroundColor: `${styles.colors.accent}20`,
                  color: styles.colors.accent,
                  border: `1px solid ${styles.colors.accent}`,
                }}
              >
                {getToneLabel(page.tone)}
              </div>
            </div>
          )}

          <div
            className="flex justify-between items-center mt-4 pt-4"
            style={{
              borderTop: `1px solid ${styles.colors.primary}20`,
            }}
          >
            <div className="flex items-center gap-4">
              <button
                className="px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: hasVoted
                    ? styles.colors.primary
                    : "transparent",
                  color: hasVoted
                    ? styles.colors.secondary
                    : styles.colors.primary,
                  border: `1px solid ${styles.colors.primary}`,
                  boxShadow: hasVoted ? styles.effects.glow : "none",
                }}
                onClick={handleVote}
              >
                <Heart size={16} className={hasVoted ? "fill-current" : ""} />
                {voteCount > 0 && voteCount}
              </button>
              <button
                className="px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: "transparent",
                  color: styles.colors.text,
                  border: `1px solid ${styles.colors.text}50`,
                }}
                onClick={() => setIsCommentModalOpen(true)}
              >
                <MessageCircle size={16} />
                {page.comments?.length || 0}
              </button>
            </div>
            <Link
              to={`/farewell/${page.id}`}
              className="p-2 rounded-full transition-opacity hover:opacity-80"
              style={{
                backgroundColor: styles.colors.accent,
                color: styles.colors.secondary,
                boxShadow: styles.effects.shadows,
              }}
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
        customStyles={styles}
      />
    </>
  );
}
