/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Flame, ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { BackgroundBeams } from "../ui/BackgroundBeams";
import SplashScreen from "./SplashScreen";
import { useEffect, useState } from "react";
const Hero = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  // Vérifier si c'est la première visite
  // Vérifier si c'est la première visite
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setShowSplash(true);
    } else {
      // Marquer comme visité pour les prochaines fois
      localStorage.setItem("hasVisitedBefore", "true");
    }

    // Pour les besoins de développement, vous pouvez réinitialiser avec:
    // localStorage.removeItem("hasVisitedBefore");
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.5, 0.6, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center px-6 md:px-10 py-10 md:py-24 max-w-5xl mx-auto">
        {/* Floating Elements */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
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
              className="inline-block bg-clip-text text-primary"
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
              className="inline-block text-base-content/80"
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
            <Sparkles className="w-8 h-8 text-primary/50" />
          </motion.div>
        </motion.div>

        {/* Enhanced Tagline */}
        <motion.p
          className="text-xl md:text-3xl mb-6 max-w-2xl mx-auto font-medium text-base-content/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        ></motion.p>

        {/* Description with better contrast */}
        <motion.p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-base-content/70 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Create your dramatic farewell page. Whether you're leaving a job,
          ending a relationship, or closing a chapter in your life -
          <span className="text-primary font-semibold"> make it burn</span>.
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
            className="btn btn-primary btn-lg px-8 rounded-full shadow-lg shadow-primary/20"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(236,72,153,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold">Create Your Page</span>
            <Flame className="h-5 w-5 animate-pulse ml-2" />
          </motion.button>

          <motion.button
            onClick={() => navigate("/examples")}
            className="btn btn-ghost btn-lg text-base-content/70 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>See Hall</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
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
        <span className="text-primary text-sm mb-2 font-medium tracking-wider">
          Discover More
        </span>
        <ArrowDown className="h-6 w-6 text-primary" />
      </motion.div>

      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 opacity-50" />
    </div>
  );
};

export default Hero;
