import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

export default function VoteTrends({ pageId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week"); // week, month, all-time

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);

      // Dans une application réelle, vous feriez un appel API ici
      // const response = await fetch(`/api/pages/${pageId}/vote-trends?range=${timeRange}`);
      // const data = await response.json();

      // Données simulées
      let mockData = [];

      if (timeRange === "week") {
        mockData = [
          { date: "Monday", likes: 12, comments: 3 },
          { date: "Tuesday", likes: 19, comments: 5 },
          { date: "Wednesday", likes: 25, comments: 8 },
          { date: "Thursday", likes: 22, comments: 6 },
          { date: "Friday", likes: 35, comments: 12 },
          { date: "Saturday", likes: 42, comments: 15 },
          { date: "Sunday", likes: 38, comments: 10 },
        ];
      } else if (timeRange === "month") {
        mockData = [
          { date: "Week 1", likes: 85, comments: 32 },
          { date: "Week 2", likes: 120, comments: 45 },
          { date: "Week 3", likes: 95, comments: 38 },
          { date: "Week 4", likes: 145, comments: 52 },
        ];
      } else {
        mockData = [
          { date: "Jan", likes: 245, comments: 87 },
          { date: "Feb", likes: 320, comments: 110 },
          { date: "Mar", likes: 280, comments: 95 },
          { date: "Apr", likes: 390, comments: 135 },
          { date: "May", likes: 420, comments: 145 },
          { date: "Jun", likes: 380, comments: 125 },
        ];
      }

      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchTrends();
  }, [pageId, timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card bg-base-100 shadow-xl p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary">
            <span className="font-bold">{payload[0].value}</span> likes
          </p>
          <p className="text-sm text-secondary">
            <span className="font-bold">{payload[1].value}</span> comments
          </p>
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
            Engagement Trends
          </h2>

          <div className="tabs tabs-boxed bg-base-200">
            <a
              className={`tab ${timeRange === "week" ? "tab-active" : ""}`}
              onClick={() => setTimeRange("week")}
            >
              Week
            </a>
            <a
              className={`tab ${timeRange === "month" ? "tab-active" : ""}`}
              onClick={() => setTimeRange("month")}
            >
              Month
            </a>
            <a
              className={`tab ${timeRange === "all-time" ? "tab-active" : ""}`}
              onClick={() => setTimeRange("all-time")}
            >
              All Time
            </a>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="var(--secondary)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm">Likes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-sm">Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
