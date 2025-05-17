import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "../../lib/utils";

const PreviewPane = ({ template, emotion, customizations, fullScreen }) => {
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      // Réinitialiser les animations
      gsap.killTweensOf(previewRef.current.querySelectorAll("*"));

      // Appliquer l'animation en fonction du type sélectionné
      const title = previewRef.current.querySelector(".preview-title");
      const message = previewRef.current.querySelector(".preview-message");

      switch (customizations.animation) {
        case "fade":
          gsap.fromTo(
            [title, message],
            { opacity: 0 },
            { opacity: 1, duration: 1.5, stagger: 0.3, ease: "power2.out" }
          );
          break;
        case "slide":
          gsap.fromTo(
            [title, message],
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.3,
              ease: "back.out(1.2)",
            }
          );
          break;
        case "bounce":
          gsap.fromTo(
            [title, message],
            { y: -50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.3,
              ease: "bounce.out",
            }
          );
          break;
        case "explosion":
          gsap.fromTo(
            [title, message],
            { scale: 2, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.3,
              ease: "power4.out",
            }
          );
          break;
        case "typewriter":
          // Effet machine à écrire simulé avec GSAP
          if (title) {
            gsap.from(title, {
              text: { value: "", delimiter: "" },
              duration: 1.5,
              ease: "none",
            });
          }
          if (message) {
            gsap.from(message, {
              text: { value: "", delimiter: "" },
              duration: 2,
              delay: 1,
              ease: "none",
            });
          }
          break;
        default:
          gsap.fromTo(
            [title, message],
            { opacity: 0 },
            { opacity: 1, duration: 1, stagger: 0.3 }
          );
      }
    }
  }, [customizations.animation, customizations.message, customizations.title]);

  // Obtenir la classe de police en fonction de la sélection
  const getFontClass = () => {
    switch (customizations.font) {
      case "sans":
        return "font-sans";
      case "serif":
        return "font-serif";
      case "mono":
        return "font-mono";
      case "cursive":
        return "font-cursive";
      default:
        return "font-sans";
    }
  };

  // Obtenir le style de fond en fonction de l'émotion
  const getBackgroundStyle = () => {
    switch (emotion) {
      case "professional":
        return "bg-gradient-to-br from-gray-800 to-gray-900";
      case "friendly":
        return "bg-gradient-to-br from-blue-800 to-purple-900";
      case "ironic":
        return "bg-gradient-to-br from-yellow-700 to-red-800";
      case "angry":
        return "bg-gradient-to-br from-red-700 to-red-900";
      case "sad":
        return "bg-gradient-to-br from-indigo-800 to-blue-900";
      case "relieved":
        return "bg-gradient-to-br from-green-700 to-teal-900";
      default:
        return "bg-gradient-to-br from-gray-800 to-gray-900";
    }
  };

  return (
    <div
      ref={previewRef}
      className={cn(
        "w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden",
        getBackgroundStyle(),
        getFontClass(),
        fullScreen ? "fixed inset-0 z-50" : ""
      )}
      style={{
        "--main-color": customizations.color,
      }}
    >
      {fullScreen && (
        <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
          Aperçu
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="preview-title text-3xl md:text-4xl font-bold mb-6"
          style={{ color: customizations.color }}
        >
          {customizations.title || getTitlePlaceholder()}
        </h2>

        {customizations.recipient && (
          <div className="text-xl text-white mb-4">
            À: <span className="font-semibold">{customizations.recipient}</span>
          </div>
        )}

        <p className="preview-message text-lg md:text-xl text-white leading-relaxed">
          {customizations.message || getMessagePlaceholder()}
        </p>
      </div>
    </div>
  );

  function getTitlePlaceholder() {
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
  }

  function getMessagePlaceholder() {
    switch (emotion) {
      case "professional":
        return "Je vous informe par la présente de ma décision de quitter mon poste. Je vous remercie pour cette opportunité professionnelle.";
      case "friendly":
        return "Salut tout le monde ! Je voulais vous dire que je quitte le groupe. Merci pour tous ces bons moments passés ensemble !";
      case "ironic":
        return "Eh bien, quelle surprise, je m'en vais ! Qui l'aurait cru ? Certainement pas moi qui planifie ça depuis des mois...";
      case "angry":
        return "J'EN AI ASSEZ ! Je quitte ce projet immédiatement. Ne cherchez pas à me contacter.";
      case "sad":
        return "C'est avec beaucoup de tristesse que je dois vous annoncer mon départ. Les moments passés ensemble resteront gravés dans ma mémoire.";
      case "relieved":
        return "Je suis enfin libre ! Je quitte ce projet avec un grand soulagement et je peux enfin respirer à nouveau.";
      default:
        return "Écrivez votre message ici...";
    }
  }
};

export default PreviewPane;
