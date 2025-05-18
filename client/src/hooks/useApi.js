import { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { token } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const request = async (method, url, body = null, customConfig = {}) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url,
        ...customConfig,
      };

      if (body) {
        config.data = body;
      }

      const response = await api(config);
      setData(response.data);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const get = (url, config = {}) => request("GET", url, null, config);
  const post = (url, body, config = {}) => request("POST", url, body, config);
  const put = (url, body, config = {}) => request("PUT", url, body, config);
  const del = (url, config = {}) => request("DELETE", url, null, config);

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    delete: del,
  };
};
