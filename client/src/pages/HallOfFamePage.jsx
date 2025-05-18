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

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);

      const {data} = await axios.get("/reponses");
      
      const pagesFromApi = data.map((item) => ({
        id: item.id,
        title: item.Prompt?.title || "Untitled",
        author: item.Prompt?.author || "Anonymous",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          item.author || "user"
        )}&backgroundColor=b6e3f4`,
        createdAt: item.created_at,
        votes: item.reponse?.length || 0,
        hasVoted: null,
        comments: item.reponse || '',
        scenario: item.Prompt?.cas,
        tone: item.Prompt?.ton,
        message: item.Prompt?.message,
        emotion: {
          name: item.Prompt?.reaction,
          emoji: "👋",
          color: "text-primary",
        },
      }));

      setTimeout(() => {
        setPages(pagesFromApi);
        setLoading(false);
      }, 500);
    };

    fetchPages();
  }, [filter, sortBy, searchQuery]);

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
                <div className="card bg-base-100 shadow-xl">
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
                        onChange={(e) => setFilter(e.target.value)}
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
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="recent">Most Recent</option>
                        <option value="popular">Most Popular</option>
                        <option value="trending">Trending</option>
                        <option value="rated">Highest Rated</option>
                      </select>
                    </div>
                  </div>
                </div>

                <TopRatedPages />
              </div>
            </div>

            {/* Liste des farewells */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center py-12">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : pages.length === 0 ? (
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body text-center py-12">
                    <Award className="w-16 h-16 mx-auto opacity-30 mb-4" />
                    <h3 className="text-xl font-bold">No farewells found</h3>
                    <p className="opacity-70 mt-2">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pages.map((page, index) => (
                    <FarewellCard key={page.id} page={page} />
                  ))}
                </div>
              )}

              {pages.length > 0 && (
                <div className="flex justify-center mt-8">
                  <div className="join">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn btn-active">1</button>
                    <button className="join-item btn">2</button>
                    <button className="join-item btn">3</button>
                    <button className="join-item btn">»</button>
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
