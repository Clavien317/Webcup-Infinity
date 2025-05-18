import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Heart,
  Star,
  ThumbsUp,
  Award,
  Trophy,
  Smile,
  Frown,
  Meh,
  TrendingUp,
} from "lucide-react";

export default function VoteStatistics({ pageId }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchVoteStats = async () => {
      setLoading(true);

      // Dans une application réelle, vous feriez un appel API ici
      // const response = await fetch(`/api/pages/${pageId}/vote-stats`);
      // const data = await response.json();

      // Données simulées
      const mockData = [
        {
          name: "heart",
          label: "Love it",
          count: 145,
          icon: Heart,
          color: "#ff2c54",
        },
        {
          name: "star",
          label: "Inspiring",
          count: 87,
          icon: Star,
          color: "#ffc107",
        },
        {
          name: "thumbsUp",
          label: "Great",
          count: 112,
          icon: ThumbsUp,
          color: "#3b82f6",
        },
        {
          name: "award",
          label: "Award",
          count: 34,
          icon: Award,
          color: "#8b5cf6",
        },
        {
          name: "trophy",
          label: "Trophy",
          count: 21,
          icon: Trophy,
          color: "#f59e0b",
        },
        {
          name: "smile",
          label: "Happy",
          count: 56,
          icon: Smile,
          color: "#10b981",
        },
        {
          name: "frown",
          label: "Sad",
          count: 78,
          icon: Frown,
          color: "#f43f5e",
        },
        { name: "meh", label: "Meh", count: 19, icon: Meh, color: "#64748b" },
      ];

      const total = mockData.reduce((sum, item) => sum + item.count, 0);

      setTimeout(() => {
        setStats(mockData);
        setTotalVotes(total);
        setLoading(false);
      }, 500);
    };

    fetchVoteStats();
  }, [pageId]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const IconComponent = data.icon;

      return (
        <div className="card bg-base-100 shadow-xl p-3">
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4" style={{ color: data.color }} />
            <span className="font-medium">{data.label}</span>
          </div>
          <div className="text-sm mt-1">
            <span className="font-bold">{data.count}</span> votes
            <span className="text-xs opacity-70 ml-2">
              ({Math.round((data.count / totalVotes) * 100)}%)
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Vote Statistics
          </h2>
          <div className="badge badge-primary">{totalVotes} total votes</div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 mt-4">
          {stats.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.name}
                className="flex flex-col items-center p-2 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * stats.indexOf(item) }}
              >
                <IconComponent
                  className="w-6 h-6 mb-1"
                  style={{ color: item.color }}
                />
                <span className="text-xs text-center">{item.label}</span>
                <span className="font-bold">{item.count}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
