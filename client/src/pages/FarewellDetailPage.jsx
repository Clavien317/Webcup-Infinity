/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "lucide-react";
import VotingSystem from "../components/VotingSystem.jsx";
import VoteStatistics from "../components/VoteStatistics.jsx";
import EmojiReactions from "../components/EmojiReactions.jsx";
import StarRating from "../components/StarRating.jsx";
import CommentSection from "../components/CommentSection.jsx";
import VoteTrends from "../components/VoteTrends.jsx";

export default function FarewellDetailPage() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        setLoading(true);

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch(`/api/pages/${id}`);
        // const data = await response.json();

        // Données simulées
        const mockData = {
          id: parseInt(id),
          title: "Goodbye to My First Love",
          tone: "nostalgic",
          scenario: "heartbreak",
          message:
            "After 5 years together, we've decided to part ways. It wasn't an easy decision, but sometimes love isn't enough. I'll cherish every moment we shared, every laugh, every tear. You taught me what it means to truly love someone, and for that, I'll always be grateful.\n\nI remember our first date like it was yesterday. The way you nervously played with your hair, the way your eyes lit up when you talked about your passions. I knew then that you were special.\n\nOver the years, we built a life together. We traveled, we grew, we faced challenges. But somewhere along the way, we started growing in different directions. What once brought us together now pulls us apart.\n\nI don't regret a single moment with you. You've shaped me into who I am today, and I hope I've had a positive impact on your life too.\n\nAs we go our separate ways, I wish you nothing but happiness and success. I hope you find someone who loves you the way you deserve to be loved, who supports your dreams and ambitions.\n\nThank you for everything. For the love, the lessons, the memories. You'll always have a special place in my heart.",
          author: "Sarah Johnson",
          createdAt: "2023-05-15T10:30:00Z",
          likes: 245,
          comments: 32,
          emotion: { name: "Nostalgic", emoji: "🥺", color: "text-amber-500" },
        };

        setTimeout(() => {
          setPage(mockData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load page details. Please try again later.");
        setLoading(false);
        console.error("Error fetching page details:", err);
      }
    };

    fetchPageDetails();
  }, [id]);

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
            <a href="/hall-of-fame" className="btn btn-ghost gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Hall of Fame
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2">
              <motion.div
                className="card bg-base-100 shadow-xl overflow-hidden mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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
                        {new Date(page.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <span className={`badge ${page.emotion.color}`}>
                        {page.emotion.emoji} {page.emotion.name}
                      </span>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold mb-4">{page.title}</h1>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="badge badge-outline">
                      page.scenario === "family-friends" ? "Friends & Family" :
                      page.scenario === "career" ? "Career & Work" :
                      page.scenario === "life-chapter" ? "Life Chapter" :
                      "Other"
                    </div>
                    <div className="badge badge-outline capitalize">
                      {page.tone}
                    </div>
                  </div>

                  <div className="prose max-w-none mb-6">
                    {page.message.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-base-300">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span>{page.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-5 h-5" />
                        <span>{page.comments}</span>
                      </div>
                    </div>

                    <button className="btn btn-outline btn-sm gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Réactions emoji */}
              <div className="mb-8">
                <EmojiReactions pageId={page.id} />
              </div>

              {/* Tendances de vote */}
              <div className="mb-8">
                <VoteTrends pageId={page.id} />
              </div>

              {/* Section commentaires */}
              <CommentSection pageId={page.id} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">About the Author</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-16">
                          <User className="w-8 h-8" />
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
                    <div className="card-actions justify-end mt-4">
                      <button className="btn btn-outline btn-sm">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* Système de vote */}
                <VotingSystem pageId={page.id} />

                {/* Système de notation par étoiles */}
                <StarRating
                  pageId={page.id}
                  onRatingChange={(rating) =>
                    console.log(`Rated ${rating} stars`)
                  }
                />

                {/* Statistiques de vote */}
                <VoteStatistics pageId={page.id} />

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Similar Farewells</h2>
                    <div className="space-y-3 mt-2">
                      {[1, 2, 3].map((i) => (
                        <a
                          key={i}
                          href={`/farewell/${page.id + i}`}
                          className="flex gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors"
                        >
                          <div className="avatar placeholder">
                            <div className="bg-base-300 text-base-content rounded w-12 h-12">
                              {page.emotion.emoji}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm truncate">
                              {
                                [
                                  "Another Heartbreak Story",
                                  "Moving Forward After Loss",
                                  "The End of a Chapter",
                                ][i - 1]
                              }
                            </h3>
                            <p className="text-xs opacity-70 truncate">
                              {
                                [
                                  "Alex Smith",
                                  "Jessica Taylor",
                                  "Robert Johnson",
                                ][i - 1]
                              }
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
