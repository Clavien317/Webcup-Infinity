import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useProtectedRoute = (redirectPath = "/auth") => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, loading, navigate, redirectPath]);

  return { isAuthenticated, loading };
};
