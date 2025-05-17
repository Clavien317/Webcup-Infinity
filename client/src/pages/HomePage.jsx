import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { useEntranceAnimation } from "../hooks/useAnimations";
import { cn } from "../lib/utils";
import { User, LogOut, Moon, Sun } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isDark = theme === "dark";

  // Use the custom animation hook
  useEntranceAnimation(".animate-item");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        isDark
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"
      )}
    >
      {/* Header/Navbar */}
      <header
        className={cn(
          "py-4 px-6 shadow-md animate-item",
          isDark ? "bg-gray-800" : "bg-white"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Webcup Infinity
          </motion.div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-colors",
                isDark
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="relative group">
              <button
                onClick={() => navigate("/profile")}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold",
                    isDark ? "bg-purple-600" : "bg-purple-100",
                    isDark ? "text-white" : "text-purple-600"
                  )}
                >
                  {user?.nom?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="hidden md:block">{user?.nom || "User"}</span>
              </button>

              <div
                className={cn(
                  "absolute right-0 mt-2 w-48 py-2 rounded-md shadow-lg z-10 transition-all transform origin-top-right",
                  "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto",
                  isDark ? "bg-gray-800" : "bg-white"
                )}
              >
                <a
                  href="/profile"
                  className={cn(
                    "block px-4 py-2 text-sm transition-colors flex items-center",
                    isDark
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-sm transition-colors flex items-center",
                    isDark
                      ? "text-red-400 hover:bg-gray-700"
                      : "text-red-600 hover:bg-gray-100"
                  )}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-12 animate-item">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to Webcup Infinity
          </motion.h1>
          <motion.p
            className={cn(
              "text-xl max-w-3xl mx-auto",
              isDark ? "text-gray-300" : "text-gray-600"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your authenticated experience begins here. Explore the features and
            functionalities available to you.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <motion.div
            className={cn(
              "rounded-xl shadow-lg overflow-hidden animate-item",
              isDark ? "bg-gray-800" : "bg-white"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div
              className={cn(
                "h-48 flex items-center justify-center",
                "bg-gradient-to-r from-purple-500 to-indigo-600"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Create Prompts</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Generate creative content with our AI-powered prompt system.
                Customize your experience.
              </p>
              <button
                className={cn(
                  "mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors",
                  "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                )}
              >
                Get Started
              </button>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className={cn(
              "rounded-xl shadow-lg overflow-hidden animate-item",
              isDark ? "bg-gray-800" : "bg-white"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div
              className={cn(
                "h-48 flex items-center justify-center",
                "bg-gradient-to-r from-pink-500 to-rose-600"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">View Responses</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Browse through AI-generated responses to your prompts. Save and
                share your favorites.
              </p>
              <button
                className={cn(
                  "mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors",
                  "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
                )}
              >
                Explore
              </button>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className={cn(
              "rounded-xl shadow-lg overflow-hidden animate-item",
              isDark ? "bg-gray-800" : "bg-white"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div
              className={cn(
                "h-48 flex items-center justify-center",
                "bg-gradient-to-r from-blue-500 to-cyan-600"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Manage Profile</h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                Update your personal information, change your password, and
                customize your settings.
              </p>
              <button
                onClick={() => navigate("/profile")}
                className={cn(
                  "mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors",
                  "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                )}
              >
                Go to Profile
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={cn(
          "py-8 px-6 mt-12",
          isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
        )}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="animate-item">
            &copy; {new Date().getFullYear()} Webcup Infinity. All rights
            reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 animate-item">
            <a href="#" className="hover:text-purple-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
