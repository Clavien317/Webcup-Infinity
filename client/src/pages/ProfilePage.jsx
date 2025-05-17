import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { useEntranceAnimation } from "../hooks/useAnimations";
import { cn } from "../lib/utils";
import { User, Mail, Lock, Save, LogOut } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { user, updateProfile, logout } = useAuth();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Use the custom animation hook
  useEntranceAnimation(".animate-item");

  // Initialize form with user data
  const { values, handleChange, resetForm } = useForm({
    nom: user?.nom || "",
    email: user?.email || "",
    mot_de_passe: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const toggleEdit = () => {
    if (isEditing) {
      resetForm({
        nom: user?.nom || "",
        email: user?.email || "",
        mot_de_passe: "",
        confirmPassword: "",
      });
    }
    setIsEditing(!isEditing);
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    setError("");

    if (!values.nom || !values.email) {
      setError("Name and email are required");
      return false;
    }

    if (values.mot_de_passe && values.mot_de_passe.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (values.mot_de_passe && values.mot_de_passe !== values.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const updateData = {
        nom: values.nom,
        email: values.email,
      };

      if (values.mot_de_passe) {
        updateData.mot_de_passe = values.mot_de_passe;
      }

      const result = await updateProfile(user.id, updateData);

      if (result.success) {
        setSuccess("Profile updated successfully");
        setIsEditing(false);
        // Clear password fields
        resetForm({
          ...values,
          mot_de_passe: "",
          confirmPassword: "",
        });
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 animate-item">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Your Profile
          </h1>
          <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            View and manage your account information
          </p>
        </div>

        <motion.div
          className={cn(
            "rounded-xl shadow-lg overflow-hidden animate-item",
            isDark ? "bg-gray-800" : "bg-white"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile header */}
          <div className={`px-6 py-8 ${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className={`h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold ${
                    isDark ? "bg-purple-600" : "bg-purple-100"
                  } ${isDark ? "text-white" : "text-purple-600"}`}
                >
                  {user?.nom?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <div className="ml-6">
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user?.nom || "User"}
                </h2>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {user?.email || "email@example.com"}
                </p>
                <div className="mt-2 flex space-x-3">
                  <button
                    onClick={toggleEdit}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      isEditing
                        ? isDark
                          ? "bg-gray-600 text-gray-200"
                          : "bg-gray-200 text-gray-700"
                        : isDark
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    } transition-colors`}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
                      isDark
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    } transition-colors`}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile form */}
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Name field */}
                <div className="animate-item">
                  <label
                    htmlFor="nom"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User
                        className={`h-5 w-5 ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={values.nom}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors",
                        !isEditing && "opacity-75 cursor-not-allowed",
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500/50"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-purple-500/30"
                      )}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="animate-item">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail
                        className={`h-5 w-5 ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={cn(
                        "block w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors",
                        !isEditing && "opacity-75 cursor-not-allowed",
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500/50"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-purple-500/30"
                      )}
                    />
                  </div>
                </div>

                {/* Password fields - only when editing */}
                {isEditing && (
                  <>
                    <div className="animate-item">
                      <label
                        htmlFor="mot_de_passe"
                        className={`block text-sm font-medium mb-1 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        New Password (leave blank to keep current)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock
                            className={`h-5 w-5 ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}
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
                              ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500/50"
                              : "bg-white border-gray-300 text-gray-900 focus:ring-purple-500/30"
                          )}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="animate-item">
                      <label
                        htmlFor="confirmPassword"
                        className={`block text-sm font-medium mb-1 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock
                            className={`h-5 w-5 ${
                              isDark ? "text-gray-500" : "text-gray-400"
                            }`}
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
                              ? "bg-gray-700 border-gray-600 text-white focus:ring-purple-500/50"
                              : "bg-white border-gray-300 text-gray-900 focus:ring-purple-500/30"
                          )}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </>
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

                {/* Submit button - only when editing */}
                {isEditing && (
                  <motion.button
                    type="submit"
                    className={cn(
                      "w-full py-2.5 px-4 rounded-lg font-medium text-white flex items-center justify-center animate-item",
                      "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
                      "shadow-lg shadow-purple-500/20 transition-all duration-300",
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
                        <Save className="mr-2 h-5 w-5" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
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
            className={`text-sm font-medium transition-colors ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ← Back to home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
