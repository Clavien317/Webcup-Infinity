import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "motion/react";
import { Filter, TrendingUp, Search, Award } from "lucide-react";
import FarewellCard from "../components/FarewellCard.jsx";
import TopRatedPages from "../components/TopRatedPages.jsx";

export default function HallOfFamePage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);

      // Dans une application réelle, vous feriez un appel API ici
      // const response = await fetch(`/api/pages?filter=${filter}&sort=${sortBy}&search=${searchQuery}`);
      // const data = await response.json();

      // Données simulées
      const mockData = [
        {
          id: 1,
          title: "Goodbye to My First Love",
          author: "Sarah Johnson",
          createdAt: "2023-05-15T10:30:00Z",
          likes: 245,
          comments: 32,
          scenario: "heartbreak",
          tone: "nostalgic",
          message:
            "After 5 years together, we've decided to part ways. It wasn't an easy decision, but sometimes love isn't enough. I'll cherish every moment we shared, every laugh, every tear. You taught me what it means to truly love someone, and for that, I'll always be grateful.",
          emotion: { name: "Nostalgic", emoji: "🥺", color: "text-amber-500" },
        },
        {
          id: 2,
          title: "Moving Across the World",
          author: "Emma Williams",
          createdAt: "2023-06-22T14:45:00Z",
          likes: 312,
          comments: 47,
          scenario: "life-chapter",
          tone: "hopeful",
          message:
            "Tomorrow, I board a plane to start a new life in Australia. Leaving behind friends, family, and everything familiar is terrifying, but also exciting. This isn't goodbye forever, just goodbye for now. I'm taking a piece of each of you with me on this journey.",
          emotion: { name: "Hopeful", emoji: "✨", color: "text-yellow-500" },
        },
        {
          id: 3,
          title: "Closing My Business",
          author: "Robert Miller",
          createdAt: "2023-07-10T09:15:00Z",
          likes: 427,
          comments: 56,
          scenario: "career",
          tone: "reflective",
          message:
            "After 15 years, I'm closing the doors to Miller's Bookshop. What started as a small dream grew into a community hub. To all the customers who became friends, the staff who became family, and the books that brought us together - thank you for being part of this journey.",
          emotion: {
            name: "Reflective",
            emoji: "🤔",
            color: "text-indigo-500",
          },
        },
        {
          id: 4,
          title: "Farewell to My Childhood Home",
          author: "David Thompson",
          createdAt: "2023-08-05T16:20:00Z",
          likes: 189,
          comments: 28,
          scenario: "family-friends",
          tone: "bittersweet",
          message:
            "Today, we sold the house I grew up in. The house where I took my first steps, celebrated birthdays, and created countless memories. It's strange to think that someone else will now make this place their home. But home isn't just a place, it's the people and memories we carry with us.",
          emotion: {
            name: "Bittersweet",
            emoji: "😌",
            color: "text-violet-500",
          },
        },
      ];

      setTimeout(() => {
        setPages(mockData);
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
                      <div className="input-group">
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
