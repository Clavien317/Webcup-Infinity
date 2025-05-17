import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import PreviewPane from "./PreviewPane";
import { cn } from "../../lib/utils";

const EditorPanel = ({ template, emotion, customizations, onChange }) => {
  const editorRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      gsap.fromTo(
        editorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const getPlaceholderByEmotion = () => {
    switch (emotion) {
      case "professional":
        return "Cher [Nom], je vous informe de ma décision de quitter mon poste...";
      case "friendly":
        return "Salut tout le monde ! Je voulais vous dire que je quitte le groupe...";
      case "ironic":
        return "Eh bien, quelle surprise, je m'en vais ! Qui l'aurait cru ?";
      case "angry":
        return "J'EN AI ASSEZ ! Je quitte ce projet immédiatement...";
      case "sad":
        return "C'est avec beaucoup de tristesse que je dois vous annoncer mon départ...";
      case "relieved":
        return "Je suis enfin libre ! Je quitte ce projet avec un grand soulagement...";
      default:
        return "Écrivez votre message ici...";
    }
  };

  const getTitlePlaceholderByEmotion = () => {
    switch (emotion) {
      case "professional":
        return "Lettre de démission";
      case "friendly":
        return "Au revoir les amis";
      case "ironic":
        return "Devinez qui s'en va ?";
      case "angry":
        return "C'EST TERMINÉ !";
      case "sad":
        return "Adieu...";
      case "relieved":
        return "Enfin libre !";
      default:
        return "Titre de votre message";
    }
  };

  return (
    <div
      ref={editorRef}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-xl"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-6 border-r border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Personnalisation</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={customizations.title}
                onChange={handleInputChange}
                placeholder={getTitlePlaceholderByEmotion()}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Destinataire
              </label>
              <input
                type="text"
                name="recipient"
                value={customizations.recipient}
                onChange={handleInputChange}
                placeholder="À qui s'adresse ce message ?"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={customizations.message}
                onChange={handleInputChange}
                placeholder={getPlaceholderByEmotion()}
                rows="6"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Couleur principale
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="color"
                  value={customizations.color}
                  onChange={handleInputChange}
                  className="h-10 w-10 rounded cursor-pointer"
                />
                <span className="text-gray-400 text-sm">
                  {customizations.color}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Police de caractères
              </label>
              <select
                name="font"
                value={customizations.font}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sans">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Monospace</option>
                <option value="cursive">Cursive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Animation
              </label>
              <select
                name="animation"
                value={customizations.animation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fade">Fondu</option>
                <option value="slide">Glissement</option>
                <option value="bounce">Rebond</option>
                <option value="explosion">Explosion</option>
                <option value="typewriter">Machine à écrire</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Aperçu</h3>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
            >
              {previewMode ? "Éditer" : "Plein écran"}
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 aspect-video">
            <PreviewPane
              template={template}
              emotion={emotion}
              customizations={customizations}
              fullScreen={previewMode}
            />
          </div>

          <div className="mt-6">
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md font-medium transition-colors">
              Générer ma page de départ
            </button>
            <p className="text-gray-400 text-sm mt-2 text-center">
              Vous pourrez copier le lien et le partager après la génération
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
