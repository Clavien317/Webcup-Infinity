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
        ></motion.div>

        {/* Images à gauche */}
        <motion.div
          className="absolute left-4 top-1/4 md:left-10 lg:left-[-130px] flex flex-col gap-6 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <img
              src="/image1.png"
              alt="Decorative"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/50";
              }}
            />
          </motion.div>

          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg ml-6 md:ml-12"
            whileHover={{ scale: 1.05, rotate: -5 }}
          >
            <img
              src="/image2.png"
              alt="Decorative"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/50";
              }}
            />
          </motion.div>
        </motion.div>

        {/* Images à droite */}
        <motion.div
          className="absolute right-4 top-1/3 md:right-10 lg:right-[-160px] flex flex-col gap-6 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg"
            whileHover={{ scale: 1.05, rotate: -5 }}
          >
            <img
              src="/image3.png"
              alt="Decorative"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/50";
              }}
            />
          </motion.div>

          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg ml-6 md:ml-12"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <img
              src="/image4.png"
              alt="Decorative"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/50";
              }}
            />
          </motion.div>
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
              The art of letting go, with positive mind.
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

        {/* User Avatars Circle */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* Les 4 photos fournies arrangées en cercle */}
          <div className="flex space-x-[-10px]">
            <div className="w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden">
              <img
                src="/tar.png"
                alt="User"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/50/50";
                }}
              />
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden">
              <img
                src="/api/placeholder/50/50"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden">
              <img
                src="/api/placeholder/50/50"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-pink-500 overflow-hidden">
              <img
                src="/api/placeholder/50/50"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold border-2 border-pink-500">
              100+
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle subtle particle effect */}
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 opacity-20" />

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none z-20"></div>
    </div>
  );
};

export default Hero;
