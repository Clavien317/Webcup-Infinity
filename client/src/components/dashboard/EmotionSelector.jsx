import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { cn } from "../../lib/utils";

const emotions = [
  {
    id: "professional",
    label: "Professionnel",
    icon: "👔",
    color: "bg-blue-500",
  },
  { id: "friendly", label: "Amical", icon: "😊", color: "bg-green-500" },
  { id: "ironic", label: "Ironique", icon: "😏", color: "bg-yellow-500" },
  { id: "angry", label: "En colère", icon: "😡", color: "bg-red-500" },
  { id: "sad", label: "Triste", icon: "😢", color: "bg-indigo-500" },
  { id: "relieved", label: "Soulagé", icon: "😌", color: "bg-teal-500" },
];

const EmotionSelector = ({ onSelect, selectedEmotion }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".emotion-card");

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {emotions.map((emotion) => (
        <motion.div
          key={emotion.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "emotion-card cursor-pointer rounded-xl p-6 flex flex-col items-center justify-center transition-all",
            "border-2 hover:shadow-lg",
            selectedEmotion === emotion.id
              ? "border-white bg-opacity-30 " + emotion.color
              : "border-gray-700 bg-gray-800 hover:bg-gray-700"
          )}
          onClick={() => onSelect(emotion.id)}
        >
          <span className="text-4xl mb-3">{emotion.icon}</span>
          <h3 className="text-center font-medium">{emotion.label}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default EmotionSelector;
