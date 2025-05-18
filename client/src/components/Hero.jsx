/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Flame, ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { BackgroundBeams } from "../ui/BackgroundBeams";
import { useTheme } from "../context/ThemeContext";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sky3D from "./Sky3D";

const Hero = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef();
  const isDark = theme === "dark";

  // Gérer le défilement pour les effets de parallaxe
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Canvas 3D en arrière-plan avec dégradé */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-b from-blue-900/40 via-indigo-900/30 to-purple-900/40"
              : "bg-gradient-to-b from-blue-100 via-indigo-50 to-purple-100"
          } z-0`}
        ></div>

        <Canvas ref={canvasRef} dpr={[1, 2]} shadows>
          <Suspense fallback={null}>
            <Sky3D scrollY={scrollY} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay pour améliorer la lisibilité du contenu */}
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-black/30" : "bg-white/20"
        } z-1`}
      ></div>

      {/* Effet de grille en arrière-plan */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5 z-1"></div>

      <div className="relative z-10 text-center px-6 md:px-10 py-16 md:py-28 max-w-6xl mx-auto">
        {/* Header avec navigation */}
        <motion.div
          className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            TheEnd.page
          </div>
          <div className="flex gap-6">
            <span
              className={`cursor-pointer ${
                isDark ? "text-white/80" : "text-gray-700"
              }`}
            >
              Features
            </span>
            <span
              className={`cursor-pointer ${
                isDark ? "text-white/80" : "text-gray-700"
              }`}
            >
              About
            </span>
            <span
              className={`cursor-pointer ${
                isDark ? "text-white/80" : "text-gray-700"
              }`}
            >
              Pricing
            </span>
          </div>
        </motion.div>

        {/* Glow Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Modified Title with new text */}
        <motion.div
          className="relative mb-10 mt-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none">
            <span className={isDark ? "text-white/90" : "text-gray-800"}>
              Welcome to
            </span>
          </motion.h1>
          <motion.h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none mt-2">
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 italic"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Quitter's Lounge
            </motion.span>
          </motion.h1>
          <motion.h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mt-2">
            <span className={isDark ? "text-white/90" : "text-gray-800"}>
              The art of letting go, with style.
            </span>
          </motion.h1>

          {/* Sparkle Effects */}
          <motion.div
            className="absolute -top-4 right-4"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-8 h-8 text-pink-400/80" />
          </motion.div>
        </motion.div>

        {/* Description with better typography */}
        <motion.p
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            isDark ? "text-white/70" : "text-gray-600"
          } leading-relaxed font-light`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Ready to move on? Create your elegant farewell page. Whether you're
          leaving a job, ending a relationship, or closing a chapter in your
          life - make your exit memorable and cathartic.
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            onClick={() => navigate("/create")}
            className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-full shadow-lg shadow-pink-500/20 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(236,72,153,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold">Create Your Farewell</span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/examples")}
            className={`px-6 py-3 ${
              isDark
                ? "bg-transparent border border-white/20 text-white/70"
                : "bg-transparent border border-gray-300 text-gray-700"
            } rounded-full group transition-all duration-300 flex items-center`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              See Examples
            </span>
          </motion.button>
        </motion.div>

        {/* Floating Avatars */}
        <div className="relative mt-32 w-full h-64">
          <motion.div
            className="absolute top-0 right-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex">
              <div className="h-10 w-10 rounded-full bg-white shadow-md overflow-hidden border-2 border-white">
                <img
                  src="/api/placeholder/100/100"
                  alt="placeholder"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={`ml-2 px-4 py-2 rounded-lg max-w-xs ${
                  isDark
                    ? "bg-white/10 backdrop-blur-sm"
                    : "bg-white/80 backdrop-blur-sm"
                } shadow-sm`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Best decision I ever made!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-12 left-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex">
              <div className="h-10 w-10 rounded-full bg-white shadow-md overflow-hidden border-2 border-white">
                <img
                  src="/api/placeholder/100/100"
                  alt="placeholder"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={`ml-2 px-4 py-2 rounded-lg max-w-xs ${
                  isDark
                    ? "bg-white/10 backdrop-blur-sm"
                    : "bg-white/80 backdrop-blur-sm"
                } shadow-sm`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  Finally closed that chapter!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-1/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="flex">
              <div className="h-10 w-10 rounded-full bg-white shadow-md overflow-hidden border-2 border-white">
                <img
                  src="/api/placeholder/100/100"
                  alt="placeholder"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className={`ml-2 px-4 py-2 rounded-lg max-w-xs ${
                  isDark
                    ? "bg-white/10 backdrop-blur-sm"
                    : "bg-white/80 backdrop-blur-sm"
                } shadow-sm`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-white/80" : "text-gray-700"
                  }`}
                >
                  So liberating! Highly recommend.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle subtle particle effect */}
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 opacity-20" />

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none z-20"></div>
    </div>
  );
};

export default Hero;
