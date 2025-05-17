import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Templates adaptés à chaque émotion
const templatesByEmotion = {
  professional: [
    {
      id: "prof-1",
      name: "Lettre formelle",
      preview: "/templates/professional-1.jpg",
    },
    {
      id: "prof-2",
      name: "Minimaliste",
      preview: "/templates/professional-2.jpg",
    },
    {
      id: "prof-3",
      name: "Corporate",
      preview: "/templates/professional-3.jpg",
    },
  ],
  friendly: [
    {
      id: "friend-1",
      name: "Message chaleureux",
      preview: "/templates/friendly-1.jpg",
    },
    {
      id: "friend-2",
      name: "Souvenirs partagés",
      preview: "/templates/friendly-2.jpg",
    },
    { id: "friend-3", name: "À bientôt", preview: "/templates/friendly-3.jpg" },
  ],
  ironic: [
    { id: "ironic-1", name: "Sarcastique", preview: "/templates/ironic-1.jpg" },
    { id: "ironic-2", name: "Mème", preview: "/templates/ironic-2.jpg" },
    { id: "ironic-3", name: "Humour noir", preview: "/templates/ironic-3.jpg" },
  ],
  angry: [
    { id: "angry-1", name: "Explosion", preview: "/templates/angry-1.jpg" },
    { id: "angry-2", name: "Rage quit", preview: "/templates/angry-2.jpg" },
    { id: "angry-3", name: "Flammes", preview: "/templates/angry-3.jpg" },
  ],
  sad: [
    { id: "sad-1", name: "Mélancolique", preview: "/templates/sad-1.jpg" },
    { id: "sad-2", name: "Adieu émotionnel", preview: "/templates/sad-2.jpg" },
    { id: "sad-3", name: "Pluie", preview: "/templates/sad-3.jpg" },
  ],
  relieved: [
    {
      id: "relieved-1",
      name: "Libération",
      preview: "/templates/relieved-1.jpg",
    },
    {
      id: "relieved-2",
      name: "Nouveau départ",
      preview: "/templates/relieved-2.jpg",
    },
    {
      id: "relieved-3",
      name: "Célébration",
      preview: "/templates/relieved-3.jpg",
    },
  ],
};

const TemplateGallery = ({ emotion, onSelect, selectedTemplate }) => {
  const galleryRef = useRef(null);
  const templates = templatesByEmotion[emotion] || [];

  useEffect(() => {
    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll(".template-card");

      gsap.fromTo(
        cards,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.2)",
        }
      );
    }
  }, [emotion]);

  if (templates.length === 0) {
    return <p>Aucun template disponible pour cette émotion.</p>;
  }

  return (
    <div
      ref={galleryRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {templates.map((template) => (
        <motion.div
          key={template.id}
          whileHover={{ y: -5 }}
          className={cn(
            "template-card overflow-hidden rounded-lg border-2 cursor-pointer transition-all",
            selectedTemplate?.id === template.id
              ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
              : "border-gray-700 hover:border-gray-500"
          )}
          onClick={() => onSelect(template)}
        >
          <div className="relative aspect-video bg-gray-800">
            {/* Placeholder pour l'image de preview */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
              <span className="text-4xl">
                {emotion === "professional"
                  ? "👔"
                  : emotion === "friendly"
                  ? "😊"
                  : emotion === "ironic"
                  ? "😏"
                  : emotion === "angry"
                  ? "😡"
                  : emotion === "sad"
                  ? "😢"
                  : "😌"}
              </span>
            </div>
          </div>
          <div className="p-4 bg-gray-800">
            <h3 className="font-medium text-lg">{template.name}</h3>
            <p className="text-sm text-gray-400 mt-1">Template {template.id}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TemplateGallery;
