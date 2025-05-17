/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Flame, ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { BackgroundBeams } from "../ui/BackgroundBeams";
import { useTheme } from "../context/ThemeContext";
import { useRef, useEffect, useState, Suspense } from "react";
import gsap from "gsap";
import { useHoverAnimation } from "../hooks/useAnimations";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sky3D from "./Sky3D";

const Hero = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef();

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
      {/* Canvas 3D en arrière-plan */}
      <div className="absolute inset-0 z-0">
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
          theme === "dark" ? "bg-black/40" : "bg-white/30"
        } z-1`}
      ></div>

      <div className="relative z-10 text-center px-6 md:px-10 py-10 md:py-24 max-w-5xl mx-auto">
        {/* Floating Elements */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced Title */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              TheEnd
            </motion.span>
            <motion.span
              className={`inline-block ${
                theme === "dark" ? "text-white/80" : "text-gray-800/80"
              }`}
              animate={{
                rotateY: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              .page
            </motion.span>
          </motion.h1>

          {/* Sparkle Effects */}
          <motion.div
            className="absolute -top-4 -right-4"
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
            <Sparkles className="w-8 h-8 text-pink-500/50" />
          </motion.div>
        </motion.div>

        {/* Description with better contrast */}
        <motion.p
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${
            theme === "dark" ? "text-white/70" : "text-gray-700/90"
          } leading-relaxed backdrop-blur-sm py-2 px-4 rounded-lg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Create your dramatic farewell page. Whether you're leaving a job,
          ending a relationship, or closing a chapter in your life -
          <span className="text-pink-500 font-semibold"> make it burn</span>.
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
            className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg shadow-pink-500/20 backdrop-blur-sm transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(236,72,153,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold">Create Your Page</span>
            <Flame className="h-5 w-5 animate-pulse ml-2 inline-block" />
          </motion.button>

          <motion.button
            onClick={() => navigate("/examples")}
            className={`px-6 py-3 ${
              theme === "dark"
                ? "bg-transparent border border-white/20 text-white/70"
                : "bg-transparent border border-pink-200 text-gray-700"
            } rounded-full group backdrop-blur-sm transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>See Examples</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 inline-block" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          y: [0, 10, 0],
        }}
        transition={{
          delay: 1.2,
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <span className="text-pink-500 text-sm mb-2 font-medium tracking-wider">
          Discover More
        </span>
        <ArrowDown className="h-6 w-6 text-pink-500" />
      </motion.div>

      {/* Effet de particules subtil */}
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 opacity-30" />

      {/* Grain overlay pour un effet cinématique */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none z-20"></div>
    </div>
  );
};

export default Hero;
