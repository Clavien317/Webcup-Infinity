/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Share2, Volume2, VolumeX, Play, Pause, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(location.state?.cardData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    setCardData({
      title: "My Farewell Journey",
      tone: "peaceful",
      scenario: "life-chapter",
      message: "This is a sample farewell message",
      images: [
        "/src/assets/2578.jpg",
        "/src/assets/sary1.jpg",
        "/src/assets/sary2.jpg",
      ],
      generated: {
        intro: "Starting a new chapter in life...",
        body: "This is a sample farewell message",
        conclusion: "Looking forward to what lies ahead",
        quotes: ["Life is about the journey, not the destination"],
      },
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  // Function to toggle audio playback
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress);
    }
  };

  const renderPage = () => {
    if (!cardData?.generated) return null;

    const { title, tone, scenario, message, generated, images = [] } = cardData;

    return (
      <div className="min-h-screen bg-base-100 text-base-content relative">
        <div className="max-w-7xl mx-auto  p-8 pb-32">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground">{generated.intro}</p>
            <p className="text-sm text-muted-foreground italic mt-2">
              "Chaque instant est une pierre posée sur le chemin de nos
              souvenirs."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Meta Info Card */}
              <motion.div
                className="rounded-2xl shadow-xl p-6 bg-base-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mb-4">Journey Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Emotion
                    </span>
                    <span className="badge badge-primary badge-outline">
                      {tone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="badge badge-secondary badge-outline">
                      {scenario}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                {images.slice(0, 4).map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <figure className="aspect-square">
                      <img
                        src={img}
                        alt={`Memory ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </figure>
                  </motion.div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mt-6 pl-2 border-l-2 border-primary/30 space-y-4">
                {[
                  "La rencontre marquante",
                  "Un éclat de rire inattendu",
                  "Un silence apaisant",
                  "Le moment où tout a changé",
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    className="pl-4"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <p className="text-sm text-muted-foreground">• {event}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Content */}
            <motion.div
              className="lg:col-span-8 bg-base-200 rounded-2xl shadow-xl  overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-base-100/20 pointer-events-none" />
              <div className="p-6 lg:p-10 prose prose-lg max-w-none relativ h-full flex flex-col justify-around z-10">
                <div className="whitespace-pre-wrap mb-8">{message}</div>

                <p>
                  Ce voyage n’était pas simplement un déplacement… c’était une
                  transformation intérieure. L’impression que quelque chose
                  avait changé, que le monde s'était mis sur pause pour mieux
                  nous écouter.
                </p>

                <blockquote className="not-italic border-l-4 border-primary pl-6 py-4 bg-base-100 rounded-lg text-base">
                  {generated.quotes[0]}
                </blockquote>

                <p>
                  Et même dans les instants les plus simples, il y avait une
                  vérité touchante : la beauté réside dans les détails, dans
                  l’authentique, dans ce qu’on n’oublie jamais.
                </p>

                <blockquote className="not-italic border-l-4 border-secondary pl-6 py-4 bg-base-100 rounded-lg text-base mt-6">
                  "Les souvenirs sont la musique de l’âme." – Anonyme
                </blockquote>

                <p className="text-base text-muted-foreground mt-8">
                  {generated.conclusion}
                </p>

                <p className="text-center mt-10 font-medium text-base-content/70 italic">
                  Merci d’avoir parcouru ce fragment d’éternité.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Final Reflection */}
          <div className="text-center mt-20">
            <p className="text-sm text-muted-foreground italic">
              Fermez les yeux un instant, et laissez la musique ranimer ce
              souvenir…
            </p>
          </div>
        </div>

        {/* Music Player */}
        <div className="fixed bottom-0 left-0 right-0 bg-base-300/90 backdrop-blur border-t border-base-200 z-50">
          <div className="max-w-7xl mx-auto p-4 flex items-center gap-6">
            <button
              className="btn btn-circle btn-primary"
              onClick={toggleAudio}
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm mb-1 text-muted-foreground">
                <Music2 className="w-4 h-4" />
                <span>Farewell Theme</span>
              </div>
              <progress
                className="progress progress-primary w-full h-2"
                value={audioProgress}
                max="100"
              />
            </div>
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return renderPage();
}
