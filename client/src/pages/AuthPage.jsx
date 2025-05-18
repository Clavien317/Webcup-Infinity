import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../ui/BackgroundBeams";
import { useTheme } from "../context/ThemeContext";
import { useEntranceAnimation } from "../hooks/useAnimations";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { cn } from "../lib/utils";
import { Sparkles, User, Mail, Lock, ArrowRight } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, loading: authLoading, error: authError } = useAuth();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use the custom animation hook
  useEntranceAnimation(".animate-item");

  // Use the form hook
  const { values, handleChange, resetForm } = useForm({
    nom: "",
    email: "",
    mot_de_passe: "",
    confirmPassword: "",
  });

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    resetForm();
  };

  const validateForm = () => {
    setError("");

    if (isLogin) {
      if (!values.email || !values.mot_de_passe) {
        setError("Please fill in all fields");
        return false;
      }
    } else {
      if (!values.nom || !values.email || !values.mot_de_passe) {
        setError("Please fill in all fields");
        return false;
      }
      if (values.mot_de_passe !== values.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (values.mot_de_passe.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        // Login request using our auth hook
        const result = await login(values.email, values.mot_de_passe);

        if (result.success) {
          setSuccess("Login successful!");
          setTimeout(() => navigate("/examples"), 1000);
        } else {
          setError(result.error || "Login failed");
        }
      } else {
        // Register request using our auth hook
        const result = await register(
          values.nom,
          values.email,
          values.mot_de_passe
        );

        if (result.success) {
          setSuccess("Registration successful! Please log in.");
          setTimeout(() => {
            setIsLogin(true);
            resetForm();
          }, 1500);
        } else {
          setError(result.error || "Registration failed");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-b from-blue-900/40 via-indigo-900/30 to-purple-900/40"
              : "bg-gradient-to-b from-blue-100 via-indigo-50 to-purple-100"
          } z-0`}
        ></div>
      </div>

      {/* Overlay for better readability */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-black/30" : "bg-white/20"
        } z-1`}
      ></div>

      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5 z-1"></div>

      {/* Glow Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <motion.div
          className={cn(
            "rounded-2xl p-8 shadow-xl backdrop-blur-sm animate-item",
            isDark
              ? "bg-gray-900/60 border border-gray-800"
              : "bg-white/80 border border-gray-200"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-block"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-10 h-10 mx-auto text-pink-500 mb-2" />
            </motion.div>
            <h2
              className={cn(
                "text-3xl font-bold animate-item",
                isDark ? "text-white" : "text-gray-800"
              )}
            >
              {isLogin ? "Welcome Back" : "Join Quitter's Lounge"}
            </h2>
            <p
              className={cn(
                "mt-2 text-sm animate-item",
                isDark ? "text-gray-300" : "text-gray-600"
              )}
            >
              {isLogin
                ? "Sign in to continue your journey"
                : "Create an account to start your farewell"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for register */}
            {!isLogin && (
              <div className="animate-item">
                <label
                  htmlFor="nom"
                  className={cn(
                    "block text-sm font-medium mb-1",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className={cn(
                        "h-5 w-5",
                        isDark ? "text-gray-500" : "text-gray-400"
                      )}
                    />
                  </div>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={values.nom}
                    onChange={handleChange}
                    className={cn(
                      "block w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors",
                      isDark
                        ? "bg-gray-800/70 border-gray-700 text-white focus:ring-pink-500/50"
                        : "bg-white/90 border-gray-300 text-gray-900 focus:ring-pink-500/30"
                    )}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="animate-item">
              <label
                htmlFor="email"
                className={cn(
                  "block text-sm font-medium mb-1",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-gray-500" : "text-gray-400"
                    )}
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={cn(
                    "block w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors",
                    isDark
                      ? "bg-gray-800/70 border-gray-700 text-white focus:ring-pink-500/50"
                      : "bg-white/90 border-gray-300 text-gray-900 focus:ring-pink-500/30"
                  )}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="animate-item">
              <label
                htmlFor="mot_de_passe"
                className={cn(
                  "block text-sm font-medium mb-1",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className={cn(
                      "h-5 w-5",
                      isDark ? "text-gray-500" : "text-gray-400"
                    )}
                  />
                </div>
                <input
                  type="password"
                  id="mot_de_passe"
                  name="mot_de_passe"
                  value={values.mot_de_passe}
                  onChange={handleChange}
                  className={cn(
                    "block w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors",
                    isDark
                      ? "bg-gray-800/70 border-gray-700 text-white focus:ring-pink-500/50"
                      : "bg-white/90 border-gray-300 text-gray-900 focus:ring-pink-500/30"
                  )}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password field - only for register */}
            {!isLogin && (
              <div className="animate-item">
                <label
                  htmlFor="confirmPassword"
                  className={cn(
                    "block text-sm font-medium mb-1",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={cn(
                        "h-5 w-5",
                        isDark ? "text-gray-500" : "text-gray-400"
                      )}
                    />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    className={cn(
                      "block w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors",
                      isDark
                        ? "bg-gray-800/70 border-gray-700 text-white focus:ring-pink-500/50"
                        : "bg-white/90 border-gray-300 text-gray-900 focus:ring-pink-500/30"
                    )}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                className="text-red-500 text-sm mt-2 animate-item"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Success message */}
            {success && (
              <motion.div
                className="text-green-500 text-sm mt-2 animate-item"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {success}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              className={cn(
                "w-full py-2.5 px-4 rounded-lg font-medium text-white flex items-center justify-center animate-item",
                "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
                "shadow-lg shadow-pink-500/20 transition-all duration-300",
                loading && "opacity-70 cursor-not-allowed"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle between login and register */}
          <div className="mt-6 text-center animate-item">
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="ml-2 font-medium text-pink-500 hover:text-pink-600 transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="relative mt-8 mb-6 animate-item">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                className={`px-2 ${
                  isDark
                    ? "bg-gray-900/60 text-gray-400"
                    : "bg-white/80 text-gray-500"
                }`}
              >
                Or continue with
              </span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-4 animate-item">
            <motion.button
              type="button"
              className={cn(
                "flex items-center justify-center py-2 px-4 rounded-lg border transition-colors",
                isDark
                  ? "bg-gray-800/70 border-gray-700 text-white hover:bg-gray-700/70"
                  : "bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50/90"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Google
            </motion.button>

            <motion.button
              type="button"
              className={cn(
                "flex items-center justify-center py-2 px-4 rounded-lg border transition-colors",
                isDark
                  ? "bg-gray-800/70 border-gray-700 text-white hover:bg-gray-700/70"
                  : "bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50/90"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              GitHub
            </motion.button>
          </div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          className="mt-8 text-center animate-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate("/")}
            className={cn(
              "text-sm font-medium transition-colors",
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            ← Back to home
          </button>
        </motion.div>
      </div>

      {/* Subtle particle effect */}
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 opacity-20" />

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none z-20"></div>
    </div>
  );
};

export default AuthPage;
