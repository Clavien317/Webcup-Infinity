import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les préférences utilisateur du localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Appliquer la classe dark au body
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Simuler un utilisateur connecté
    setUser({
      id: "user123",
      name: "Alex Dupont",
      email: "alex@example.com",
      avatar: "https://i.pravatar.cc/150?img=68",
    });

    // Simuler des templates
    setTemplates([
      { id: 1, name: "Professionnel", category: "work", popularity: 87 },
      { id: 2, name: "Amical", category: "personal", popularity: 92 },
      { id: 3, name: "Projet", category: "project", popularity: 76 },
      { id: 4, name: "Discord", category: "social", popularity: 95 },
      { id: 5, name: "Minimaliste", category: "work", popularity: 82 },
    ]);
  }, []);

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        user,
        setUser,
        templates,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
