/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "motion/react";
import { Filter, TrendingUp, Search, Award } from "lucide-react";
import FarewellCard from "../components/FarewellCard.jsx";
import TopRatedPages from "../components/TopRatedPages.jsx";
import axios from "axios";

export default function HallOfFamePage() {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);

        // Construire les paramètres de requête
        const params = new URLSearchParams();
        if (filter !== "all") params.append("category", filter);
        if (searchQuery) params.append("search", searchQuery);
        params.append("sort", sortBy);
        params.append("page", currentPage);
        params.append("limit", itemsPerPage);

        // Récupérer les données depuis l'API
        const { data } = await axios.get(`/reponses?${params.toString()}`);

        // Transformer les données pour correspondre à notre structure
        const pagesFromApi = data.map((item) => ({
          id: item.id,
          title: item.Prompt?.title || "Untitled",
          author: item.Prompt?.author || "Anonymous",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
            item.Prompt?.author || "user"
          )}&backgroundColor=b6e3f4`,
          createdAt: item.created_at,
          votes: item.votes || 0,
          hasVoted: item.hasVoted || null,
          comments: item.comments || [],
          scenario: item.Prompt?.cas,
          tone: item.Prompt?.ton,
          message: item.Prompt?.message,
          emotion: {
            name: item.Prompt?.reaction,
            emoji: getEmojiForEmotion(item.Prompt?.reaction),
            color: getColorForEmotion(item.Prompt?.reaction),
          },
          reponse: item.reponse || "",
        }));

        // Calculer le nombre total de pages (si l'API renvoie cette information)
        // Sinon, on peut estimer en fonction du nombre d'éléments reçus
        setTotalPages(Math.max(1, Math.ceil(data.total / itemsPerPage) || 1));

        setPages(pagesFromApi);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pages:", error);
        setLoading(false);
        setPages([]);
      }
    };

    fetchPages();
  }, [filter, sortBy, searchQuery, currentPage]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-10 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-primary">TheEnd</span> Hall of Fame
            </h1>
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              Explore the most touching, heartfelt, and memorable farewell
              stories shared by our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar avec filtres */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <motion.div
                  className="card bg-base-100 shadow-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                      <Filter className="w-5 h-5 text-primary" />
                      Filters
                    </h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Search</span>
                      </label>
                      <div className="input-group flex flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Search farewells..."
                          className="input input-bordered w-full"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-square">
                          <Search className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">Category</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={filter}
                        onChange={(e) => {
                          setFilter(e.target.value);
                          setCurrentPage(1); // Reset to first page on filter change
                        }}
                      >
                        <option value="all">All Categories</option>
                        <option value="heartbreak">
                          Heartbreak & Relationships
                        </option>
                        <option value="family-friends">Friends & Family</option>
                        <option value="career">Career & Work</option>
                        <option value="life-chapter">Life Chapter</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">Sort By</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={sortBy}
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          setCurrentPage(1); // Reset to first page on sort change
                        }}
                      >
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Popular</option>
                        <option value="trending">Trending</option>
                        <option value="rated">Highest Rated</option>
                      </select>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <TopRatedPages />
                </motion.div>
              </div>
            </div>

            {/* Liste des farewells */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center py-12">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : pages.length === 0 ? (
                <motion.div
                  className="card bg-base-100 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-body text-center py-12">
                    <Award className="w-16 h-16 mx-auto opacity-30 mb-4" />
                    <h3 className="text-xl font-bold">No farewells found</h3>
                    <p className="opacity-70 mt-2">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pages.map((page, index) => (
                    <motion.div
                      key={page.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <FarewellCard page={page} />
                    </motion.div>
                  ))}
                </div>
              )}

              {pages.length > 0 && (
                <div className="flex justify-center mt-8">
                  <div className="join">
                    <button
                      className="join-item btn"
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      «
                    </button>
                    {/* Générer les boutons de pagination dynamiquement */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Logique pour afficher les pages autour de la page courante
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          className={`join-item btn ${
                            currentPage === pageNum ? "btn-active" : ""
                          }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      className="join-item btn"
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
