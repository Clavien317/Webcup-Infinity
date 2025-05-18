import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoadingScreen from "./components/LoadingScreen";
import CreatePage from "./pages/CreatePage";
import CardPage from "./pages/CardPage";
// Commentez cette ligne si HowItWorks est un composant et non une page
// import HowItWorks from "./pages/HowItWorks";
import ExamplesPage from "./pages/ExamplesPage";
import { ThemeProvider } from "./context/ThemeContext"; // Importez ThemeProvider

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Préchargement des ressources importantes
    const preloadResources = async () => {
      // Simuler un temps de chargement minimum pour une meilleure UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    preloadResources();
  }, []);

  return (
    <>
      {/* <LoadingScreen onLoadingComplete={() => setIsLoading(false)} /> */}

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {/* Enveloppez votre Router avec ThemeProvider */}
        <ThemeProvider>
          <Router>
            <Suspense fallback={<div>Chargement...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/examples" element={<ExamplesPage />} />
                <Route path="/card/:id" element={<CardPage />} />
                <Route path="/card" element={<CardPage />} />
                {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </div>
    </>
  );
}
