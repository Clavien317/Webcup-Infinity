/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "motion/react";
import {
  User,
  Clock,
  Share2,
  Heart,
  MessageSquare,
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import VotingSystem from "../components/VotingSystem.jsx";
import VoteStatistics from "../components/VoteStatistics.jsx";
import EmojiReactions from "../components/EmojiReactions.jsx";
import StarRating from "../components/StarRating.jsx";
import CommentSection from "../components/CommentSection.jsx";
import VoteTrends from "../components/VoteTrends.jsx";
import CommentModal from "../components/CommentModal.jsx";
import axios from "axios";

export default function FarewellDetailPage() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        setLoading(true);

        // Récupérer les données depuis l'API
        const { data } = await axios.get(`/reponses/${id}`);

        // Transformer les données pour correspondre à notre structure
        const pageData = {
          id: data.id,
          title: data.Prompt?.title || "Untitled",
          author: data.Prompt?.author || "Anonymous",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
            data.Prompt?.author || "user"
          )}&backgroundColor=b6e3f4`,
          createdAt: data.created_at,
          votes: data.votes || 0,
          hasVoted: null,
          comments: data.comments || '',
          scenario: data.Prompt?.cas,
          tone: data.Prompt?.ton,
          message: data.Prompt?.message,
          emotion: {
            name: data.Prompt?.reaction,
            emoji: getEmojiForEmotion(data.Prompt?.reaction),
            color: getColorForEmotion(data.Prompt?.reaction),
          },
          reponse: data.reponse || "",
        };

        setPage(pageData);
        setVoteCount(pageData.votes);
        setHasVoted(pageData.hasVoted);
        setLoading(false);
      } catch (err) {
        setError("Failed to load page details. Please try again later.");
        setLoading(false);
        console.error("Error fetching page details:", err);
      }
    };

    fetchPageDetails();
  }, [id]);

  const getEmojiForEmotion = (emotion) => {
    const emojis = {
      Nostalgic: "🥺",
      Happy: "😊",
      Sad: "😢",
      Angry: "😠",
      Excited: "🤩",
      Grateful: "🙏",
      Hopeful: "🌟",
      Reflective: "🤔",
      Bittersweet: "😌",
      Dramatic: "😲",
      Ironic: "😏",
      "Ultra Cringe": "😬",
      Classy: "🧐",
      Touching: "💖",
      Absurd: "🙃",
      "Passive-Aggressive": "😒",
      Honest: "😇",
    };
    return emojis[emotion] || "👋";
  };

  const getColorForEmotion = (emotion) => {
    const colors = {
      Nostalgic: "text-amber-500",
      Happy: "text-green-500",
      Sad: "text-blue-500",
      Angry: "text-red-500",
      Excited: "text-purple-500",
      Grateful: "text-teal-500",
      Hopeful: "text-cyan-500",
      Reflective: "text-indigo-500",
      Bittersweet: "text-rose-500",
      Dramatic: "text-orange-500",
      Ironic: "text-lime-500",
      "Ultra Cringe": "text-pink-500",
      Classy: "text-slate-500",
      Touching: "text-fuchsia-500",
      Absurd: "text-emerald-500",
      "Passive-Aggressive": "text-yellow-500",
      Honest: "text-sky-500",
    };
    return colors[emotion] || "text-primary";
  };

  const handleVote = async () => {
    try {
      if (hasVoted) {
        // Annuler le vote
        await axios.post(`/votes/${id}/remove`);
        setVoteCount((prev) => prev - 1);
        setHasVoted(false);
      } else {
        // Ajouter un vote
        await axios.post(`/votes/${id}/add`);
        setVoteCount((prev) => prev + 1);
        setHasVoted(true);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-10 bg-base-200 flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !page) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 pb-10 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="alert alert-error">
              <span>{error || "Page not found"}</span>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-10 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/examples" className="btn btn-ghost gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Hall of Fame
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <motion.div
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={page.avatar} alt={page.author} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{page.author}</h3>
                      <p className="text-sm opacity-70">
                        {formatDate(page.createdAt)}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className={`badge ${page.emotion.color}`}>
                        {page.emotion.emoji} {page.emotion.name}
                      </span>
                    </div>
                  </div>

                  <h2 className="card-title mb-2">
                    {page.message}
                    <div className="badge badge-neutral">
                      {page.emotion.name}
                    </div>
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="badge badge-outline">
                      {getScenarioLabel(page.scenario)}
                    </div>
                    <div className="badge badge-outline capitalize">
                      {getToneLabel(page.tone)}
                    </div>
                  </div>

                  <div className="prose max-w-none mb-6">{page.reponse}</div>

                  <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-base-300">
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
                    <button className="btn btn-sm btn-ghost gap-2">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <motion.div
                  className="card bg-base-100 shadow-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-body">
                    <h2 className="card-title">About the Author</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full">
                          <img src={page.avatar} alt={page.author} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{page.author}</h3>
                        <p className="text-sm opacity-70">Member since 2023</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      This user has shared their farewell story with the
                      community. You can support them by liking their post or
                      leaving a thoughtful comment.
                    </p>
                  </div>
                </motion.div>

                {/* Système de vote */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="card bg-base-100 shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title">Rate this Farewell</h2>
                    <VotingSystem pageId={page.id} />
                    <div className="mt-4">
                      <StarRating
                        pageId={page.id}
                        onRatingChange={(rating) =>
                          console.log(`Rated ${rating} stars`)
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        pageId={page.id}
        comments={page.comments || []}
      />
    </>
  );
}
