import { ArrowRight, Sparkles, ArrowDown, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../ui/BackgroundBeams";
import { useTheme } from "../context/ThemeContext";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useHoverAnimation } from "../hooks/useAnimations";
import Sky3D from "./Sky3D"; // Importation du composant Sky3D

const Hero = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const ctaButtonRef = useRef(null);
  const secondaryButtonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Force light theme on component mount
  useEffect(() => {
    if (theme === "dark") {
      toggleTheme();
    }
  }, []);

  // Animation hooks
  useHoverAnimation(ctaButtonRef, { scale: 1.08 });
  useHoverAnimation(secondaryButtonRef, { scale: 1.05 });

  // Typing effect phrases
  const phrases = ["make it meaningful", "embrace closure", "find peace"];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  // GSAP entrance animation
  useEffect(() => {
    setIsVisible(true);

    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        ".hero-description",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.2"
      );

    return () => tl.kill();
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Sky3D Background Animation */}
      <div className="absolute inset-0 z-0">
        <Sky3D />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="w-full absolute inset-0 h-screen bg-gradient-to-b from-white/70 via-transparent to-white/70 z-1"></div>

      {/* Positive Mind Text Positioning */}
      <div className="absolute inset-0 flex items-center justify-around px-10 md:px-[0px] z-5 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-pink-600/80"
        >
          Positive
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-pink-600/80"
        >
          Mind
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 md:px-10 py-10 md:py-24 max-w-4xl mx-auto">
        {/* Animated glow effect */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full bg-pink-300/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtitle with badge */}
        <div className="flex justify-center mb-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700 border border-pink-300"
          >
            <Sparkles size={14} className="mr-1" />
            <span className="uppercase tracking-wider">Digital Farewell</span>
          </motion.div>
        </div>

        {/* Title with animated elements */}
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-700">
          <motion.span
            className="inline-block text-pink-600"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Final
          </motion.span>{" "}
          <motion.span className="inline-block text-gray-800">
            Chapter
          </motion.span>
        </h1>

        {/* Description */}
        <motion.p className="hero-description text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-700">
          Create your beautiful farewell page and{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-pink-600 font-semibold inline-block"
            >
              {phrases[currentPhraseIndex]}
            </motion.span>
          </AnimatePresence>
          .
        </motion.p>

        {/* Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            ref={ctaButtonRef}
            onClick={() => navigate("/create")}
            className="relative px-8 py-4 overflow-hidden rounded-lg group bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 shadow-md shadow-pink-400/20 text-white font-bold transition-all duration-300"
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
            <div className="relative flex items-center justify-center gap-2">
              <span className="font-bold">Start Your Journey</span>
              <Flame className="h-5 w-5 animate-pulse" />
            </div>
          </motion.button>

          <motion.button
            ref={secondaryButtonRef}
            onClick={() => navigate("/examples")}
            className="relative px-8 py-4 rounded-lg group border border-pink-400/50 hover:bg-pink-100 transition-colors duration-300"
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative flex items-center justify-center gap-2">
              <span className="text-gray-800">View Examples</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-pink-500" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-10 z-10 flex flex-col items-center cursor-pointer"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <ArrowDown className="h-6 w-6 text-pink-600" />
      </motion.div>

      {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pink-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default Hero;
