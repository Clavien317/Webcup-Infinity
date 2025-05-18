import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoadingScreen from "./components/LoadingScreen";
import CreatePage from "./pages/CreatePage";
import ExamplesPage from "./pages/ExamplesPage";
import { ThemeProvider } from "./context/ThemeContext";
import AuthPage from "./pages/AuthPage";
// Utilisons React.lazy pour le chargement différé des pages moins critiques
const HallOfFame = React.lazy(() => import("./pages/HallOfFamePage"));
const FarewellDetail = React.lazy(() => import("./pages/FarewellDetailPage"));

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
      {isLoading && <LoadingScreen />}

      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        <ThemeProvider>
          <Router>
            <Suspense
              fallback={
                <div className="flex justify-center items-center min-h-screen">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/examples" element={<ExamplesPage />} />
                <Route path="/hall-of-fame" element={<HallOfFame />} />
                <Route path="/farewell/:id" element={<FarewellDetail />} />
                <Route path="/auth" element={<AuthPage />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </div>
    </>
  );
}
