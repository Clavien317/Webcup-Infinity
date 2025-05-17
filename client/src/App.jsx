import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

function App() {
  useEffect(() => {
    // Animation globale au chargement de l'application
    const tl = gsap.timeline();
    tl.to("body", {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

// Page de prévisualisation simple pour les pages générées
const PreviewPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Prévisualisation de la page</h1>
        <p className="text-gray-400">
          Cette page affichera la page de départ générée
        </p>
      </div>
    </div>
  );
};

export default App;
