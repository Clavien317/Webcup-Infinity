import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorPanel from "../components/editor/EditorPanel";
import TemplateGallery from "../components/templates/TemplateGallery";
import EmotionSelector from "../components/dashboard/EmotionSelector";
import { cn } from "../lib/utils";

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizations, setCustomizations] = useState({
    title: "",
    message: "",
    recipient: "",
    color: "#3b82f6",
    font: "sans",
    animation: "fade",
  });

  useEffect(() => {
    // Animation d'entrée avec GSAP
    const tl = gsap.timeline();
    tl.from(".dashboard-header", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      ".dashboard-content",
      {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
      },
      "-=0.3"
    );

    return () => {
      // Nettoyage des animations
      tl.kill();
    };
  }, []);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);

    // Animation de transition
    gsap.to(".templates-section", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".templates-section",
        start: "top bottom-=100",
      },
    });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);

    // Animation de transition
    gsap.to(".editor-section", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleCustomizationChange = (key, value) => {
    setCustomizations((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="dashboard-header p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Webcup-Infinity End Page Creator
        </h1>
        <p className="text-gray-400 mt-2">
          Créez votre page de départ personnalisée avec style et émotion
        </p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="dashboard-content mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Comment vous sentez-vous aujourd'hui?
          </h2>
          <EmotionSelector
            onSelect={handleEmotionSelect}
            selectedEmotion={selectedEmotion}
          />
        </section>

        {selectedEmotion && (
          <section className="templates-section dashboard-content mb-12 opacity-0 translate-y-10">
            <h2 className="text-2xl font-semibold mb-6">
              Choisissez un template qui correspond à votre humeur
            </h2>
            <TemplateGallery
              emotion={selectedEmotion}
              onSelect={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </section>
        )}

        {selectedTemplate && (
          <section className="editor-section dashboard-content opacity-0 translate-y-10">
            <h2 className="text-2xl font-semibold mb-6">
              Personnalisez votre message
            </h2>
            <EditorPanel
              template={selectedTemplate}
              emotion={selectedEmotion}
              customizations={customizations}
              onChange={handleCustomizationChange}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
