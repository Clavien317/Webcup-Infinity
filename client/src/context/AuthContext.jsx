import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token-infinity") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios with the API base URL
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  // Set up axios interceptor to add token to requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Get user data from localStorage if available
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          setLoading(false);
        } catch (err) {
          console.error("Authentication error:", err);
          logout();
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/users/login", {
        email,
        mot_de_passe: password,
      });

      const { token, utilisateur } = response.data;

      // Save to state
      setToken(token);
      setUser(utilisateur);

      // Save to localStorage
      localStorage.setItem("token-infinity", token);
      localStorage.setItem("user", JSON.stringify(utilisateur));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
      setLoading(false);
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/users/register", {
        nom: name,
        email,
        mot_de_passe: password,
      });

      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
      setLoading(false);
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Update user profile
  const updateProfile = async (userId, userData) => {
    setLoading(true);
    try {
      const response = await axios.put(`/users/${userId}`, userData);

      // Update user in state and localStorage
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
      setLoading(false);
      return {
        success: false,
        error: err.response?.data?.message || "Update failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
