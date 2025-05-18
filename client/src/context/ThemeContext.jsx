import React, { createContext, useContext, useState, useEffect } from "react";

// Créer le contexte
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte du thème
export const useTheme = () => useContext(ThemeContext);

// Fournisseur du contexte
export const ThemeProvider = ({ children }) => {
  // Vérifier si un thème est déjà stocké dans localStorage
  const storedTheme = localStorage.getItem("theme");

  // État initial basé sur localStorage ou préférence système
  const [theme, setTheme] = useState(
    storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Appliquer le thème au document
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Valeur du contexte
  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
