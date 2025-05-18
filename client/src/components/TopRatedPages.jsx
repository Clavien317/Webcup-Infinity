import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy, Heart, Star, ExternalLink } from "lucide-react";

export default function TopRatedPages() {
  const [topPages, setTopPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPages = async () => {
      setLoading(true);

      // Dans une application réelle, vous feriez un appel API ici
      // const response = await fetch('/api/pages/top-rated');
      // const data = await response.json();

      // Données simulées
      const mockData = [
        {
          id: 1,
          title: "Goodbye to My First Love",
          author: "Sarah Johnson",
          likes: 245,
          rating: 4.8,
          emotion: { emoji: "🥺" },
        },
        {
          id: 2,
          title: "Moving Across the World",
          author: "Emma Williams",
          likes: 312,
          rating: 4.9,
          emotion: { emoji: "😌" },
        },
        {
          id: 3,
          title: "Closing My Business",
          author: "Robert Miller",
          likes: 427,
          rating: 4.7,
          emotion: { emoji: "🤔" },
        },
      ];

      setTimeout(() => {
        setTopPages(mockData);
        setLoading(false);
      }, 500);
    };

    fetchTopPages();
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Top Rated Farewells
        </h2>

        {loading ? (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : (
          <div className="space-y-4 mt-2">
            {topPages.map((page, index) => (
              <motion.a
                key={page.id}
                href={`/farewell/${page.id}`}
                className="flex gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-base-300 text-2xl">
                  {page.emotion.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm truncate">{page.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-70 truncate">{page.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs">{page.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs">{page.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
        {/* 
        <div className="card-actions justify-center mt-4">
          <a href="/hall-of-fame" className="btn btn-outline btn-sm gap-2">
            View All
            <ExternalLink className="w-3 h-3" />
          </a>
        </div> */}
      </div>
    </div>
  );
}
