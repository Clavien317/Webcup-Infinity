import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { useEntranceAnimation, useHoverAnimation } from "../hooks/useAnimations";
import { fadeInAnimationVariants } from "../lib/utils";

// Components
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Footer from "../components/Footer.jsx";

// Icons
import {
  ArrowRight,
  Sparkles,
  ArrowDown,
  Flame,
  Leaf,
  Wind,
  Sunrise,
  Heart,
  Star,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Refs for animations
  const featuresRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const testimonialsSectionRef = useRef(null);

  // Apply hover animation to CTA button
  useHoverAnimation(ctaButtonRef, { scale: 1.1 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Initialize scroll animations
  useEffect(() => {
    // Features section animation
    if (featuresRef.current) {
      const featureItems =
        featuresRef.current.querySelectorAll(".feature-item");

      gsap.fromTo(
        featureItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Testimonials section animation
    if (testimonialsSectionRef.current) {
      const testimonials =
        testimonialsSectionRef.current.querySelectorAll(".testimonial-card");

      gsap.fromTo(
        testimonials,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: testimonialsSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
      >
        <Navbar />
        <Hero />

        {/* Nostalgic elements section */}
        <section className="relative py-20">
          <motion.div
            style={{ opacity: opacityTransform }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-40 hover:opacity-60 transition-opacity duration-700 absolute bottom-32 left-1/2 transform -translate-x-1/2"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-md overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`absolute inset-0 ${
                    theme === "dark"
                      ? "bg-gradient-to-t from-black via-transparent to-transparent"
                      : "bg-gradient-to-t from-gray-800 via-transparent to-transparent"
                  } z-10`}
                ></div>
                <div
                  className={`absolute inset-0 ${
                    theme === "dark" ? "bg-pink-900/20" : "bg-pink-300/20"
                  } mix-blend-overlay`}
                ></div>
                <div className="absolute bottom-2 left-2 right-2 text-xs text-white/70 font-mono z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  memory_{Math.floor(Math.random() * 1000)}.jpg
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vignette effect */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              theme === "dark"
                ? "bg-gradient-radial from-transparent to-black"
                : "bg-gradient-radial from-transparent to-gray-100"
            } opacity-60 z-10`}
          ></div>

          {/* Scanlines effect */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-[url('/images/scanlines.png')] bg-repeat opacity-[0.03]"></div>

          {/* Floating dust effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${
                  theme === "dark" ? "bg-white/30" : "bg-pink-300/40"
                } rounded-full`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </section>

        {/* Transition section */}
        <section
          className={`relative py-20 overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-b from-black to-gray-900"
              : "bg-gradient-to-b from-white to-pink-50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Sparkles
                  className={`h-10 w-10 ${
                    theme === "dark" ? "text-pink-400" : "text-pink-500"
                  } mx-auto mb-6`}
                />
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Free Yourself From The Weight Of The Past
                </h2>
                <p
                  className={`text-xl ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } mb-10 leading-relaxed`}
                >
                  Sometimes, the best way to move forward is to let go. Our
                  platform helps you create a release ritual for everything
                  holding you back.
                </p>

                {/* Inspirational quote */}
                <div
                  className={`relative my-12 px-8 py-6 ${
                    theme === "dark"
                      ? "border-l-4 border-pink-500 bg-gray-900/50"
                      : "border-l-4 border-pink-400 bg-pink-50"
                  } rounded-r-lg`}
                >
                  <div
                    className={`absolute -left-5 -top-5 text-6xl ${
                      theme === "dark" ? "text-pink-500/20" : "text-pink-400/30"
                    } font-serif`}
                  >
                    "
                  </div>
                  <p
                    className={`text-xl italic ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Turning the page isn't an act of forgetting, but an act of
                    liberation.
                  </p>
                  <div
                    className={`absolute -right-5 -bottom-5 text-6xl ${
                      theme === "dark" ? "text-pink-500/20" : "text-pink-400/30"
                    } font-serif`}
                  >
                    "
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  {[
                    { number: "10K+", label: "Pages Created" },
                    { number: "94%", label: "Users Liberated" },
                    { number: "3x", label: "More Lightness" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div
                        className={`text-4xl font-bold bg-clip-text text-transparent ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-pink-400 to-fuchsia-400"
                            : "bg-gradient-to-r from-pink-500 to-fuchsia-500"
                        } mb-2`}
                      >
                        {stat.number}
                      </div>
                      <div
                        className={
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }
                      >
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className={`absolute top-0 left-0 w-full h-20 ${
              theme === "dark"
                ? "bg-gradient-to-b from-black to-transparent"
                : "bg-gradient-to-b from-white to-transparent"
            }`}
          ></div>
          <div
            className={`absolute -top-10 left-1/4 w-64 h-64 ${
              theme === "dark" ? "bg-pink-500/10" : "bg-pink-300/20"
            } rounded-full filter blur-3xl`}
          ></div>
          <div
            className={`absolute -bottom-10 right-1/4 w-64 h-64 ${
              theme === "dark" ? "bg-fuchsia-500/10" : "bg-fuchsia-300/20"
            } rounded-full filter blur-3xl`}
          ></div>
        </section>

        {/* How it works section */}
        <section
          ref={featuresRef}
          className={`relative py-20 ${
            theme === "dark" ? "bg-gray-900" : "bg-pink-50"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  How It Works
                </h2>
                <p
                  className={`text-xl ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } max-w-3xl mx-auto`}
                >
                  Three simple steps to free yourself and begin a new chapter
                </p>
              </motion.div>

              {/* Steps with animation */}
              <div className="relative">
                {/* Connection line */}
                <div
                  className={`absolute top-24 left-0 right-0 h-1 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500"
                      : "bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400"
                  } hidden md:block`}
                ></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    {
                      icon: (
                        <div
                          className={`w-16 h-16 rounded-full ${
                            theme === "dark"
                              ? "bg-pink-500/20"
                              : "bg-pink-400/30"
                          } flex items-center justify-center`}
                        >
                          <span
                            className={`text-2xl font-bold ${
                              theme === "dark"
                                ? "text-pink-400"
                                : "text-pink-600"
                            }`}
                          >
                            1
                          </span>
                        </div>
                      ),
                      title: "Create",
                      description:
                        "Choose what you want to let go of and customize your page",
                    },
                    {
                      icon: (
                        <div
                          className={`w-16 h-16 rounded-full ${
                            theme === "dark"
                              ? "bg-fuchsia-500/20"
                              : "bg-fuchsia-400/30"
                          } flex items-center justify-center`}
                        >
                          <span
                            className={`text-2xl font-bold ${
                              theme === "dark"
                                ? "text-fuchsia-400"
                                : "text-fuchsia-600"
                            }`}
                          >
                            2
                          </span>
                        </div>
                      ),
                      title: "Express",
                      description: "Write what you feel, add images or symbols",
                    },
                    {
                      icon: (
                        <div
                          className={`w-16 h-16 rounded-full ${
                            theme === "dark"
                              ? "bg-purple-500/20"
                              : "bg-purple-400/30"
                          } flex items-center justify-center`}
                        >
                          <span
                            className={`text-2xl font-bold ${
                              theme === "dark"
                                ? "text-purple-400"
                                : "text-purple-600"
                            }`}
                          >
                            3
                          </span>
                        </div>
                      ),
                      title: "Free Yourself",
                      description:
                        "Share or keep private, then turn the page definitively",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      className={`feature-item relative z-10 ${
                        theme === "dark"
                          ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                          : "bg-white/80 backdrop-blur-sm border border-pink-200"
                      } rounded-xl p-8 hover:border-pink-500/50 transition-all duration-300`}
                      whileHover={{
                        y: -5,
                        boxShadow:
                          theme === "dark"
                            ? "0 10px 30px -10px rgba(236,72,153,0.2)"
                            : "0 10px 30px -10px rgba(236,72,153,0.3)",
                      }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6">{step.icon}</div>
                        <h3
                          className={`text-xl font-bold mb-4 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <button
                  ref={ctaButtonRef}
                  onClick={() => navigate("/create")}
                  className={`px-8 py-4 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 shadow-lg shadow-pink-500/30"
                      : "bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 shadow-md shadow-pink-500/20"
                  } rounded-lg text-white font-bold transition-all duration-300`}
                >
                  Start My Liberation Journey
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section
          ref={testimonialsSectionRef}
          className={`relative py-20 ${
            theme === "dark"
              ? "bg-gradient-to-b from-gray-900 to-black"
              : "bg-gradient-to-b from-pink-50 to-white"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  They Turned The Page
                </h2>
                <p
                  className={`text-xl ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } max-w-3xl mx-auto`}
                >
                  Discover how our platform has helped others free themselves
                </p>
              </motion.div>

              {/* Testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote:
                      "After years of ruminating on a project that never materialized, I finally turned the page and focused on new opportunities.",
                    author: "Marie L.",
                    role: "Entrepreneur",
                    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                  },
                  {
                    quote:
                      "This platform helped me grieve a toxic relationship. The liberation ritual was cathartic and powerful.",
                    author: "Thomas R.",
                    role: "Designer",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                  },
                  {
                    quote:
                      "I left a job that made me unhappy for years. Creating my liberation page was the first step toward a new life.",
                    author: "Sophie M.",
                    role: "Developer",
                    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                  },
                  {
                    quote:
                      "Sometimes, you need to let go. This platform gave me the framework I needed to move forward.",
                    author: "Lucas K.",
                    role: "Student",
                    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className={`testimonial-card ${
                      theme === "dark"
                        ? "bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-pink-500/50"
                        : "bg-white shadow-md border border-pink-100 hover:border-pink-300"
                    } p-6 rounded-xl transition-all duration-300`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col h-full">
                      <div
                        className={`mb-4 ${
                          theme === "dark" ? "text-pink-400" : "text-pink-500"
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.59 4.59A2 2 0 1 1 11 8H8a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4V4.59z"
                            fill="currentColor"
                          />
                          <path
                            d="M15.59 4.59A2 2 0 1 1 17 8h-3a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4V4.59z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p
                        className={`italic mb-6 flex-grow ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className={`w-10 h-10 rounded-full mr-4 ${
                            theme === "dark"
                              ? "border-2 border-pink-500/30"
                              : "border-2 border-pink-300"
                          }`}
                        />
                        <div>
                          <div
                            className={`font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {testimonial.author}
                          </div>
                          <div
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className={`absolute bottom-0 left-0 w-full h-40 ${
              theme === "dark"
                ? "bg-gradient-to-t from-black to-transparent"
                : "bg-gradient-to-t from-white to-transparent"
            }`}
          ></div>
          <div
            className={`absolute -bottom-20 right-1/3 w-80 h-80 ${
              theme === "dark" ? "bg-pink-500/10" : "bg-pink-300/20"
            } rounded-full filter blur-3xl`}
          ></div>
        </section>

        {/* FAQ section */}
        <section
          className={`relative py-20 ${
            theme === "dark" ? "bg-black" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Frequently Asked Questions
                </h2>
                <p
                  className={`text-xl ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } max-w-3xl mx-auto`}
                >
                  Everything you need to know to start your liberation process
                </p>
              </motion.div>

              {/* Questions */}
              <div className="space-y-6">
                {[
                  {
                    question: "Will my page be public?",
                    answer:
                      "You have the choice. You can create a private page, accessible only via a link, or make it public in our examples gallery.",
                  },
                  {
                    question: "How long will my page stay online?",
                    answer:
                      "You decide. You can choose a limited duration (symbolizing the letting go process) or keep it indefinitely.",
                  },
                  {
                    question: "Can I customize the appearance of my page?",
                    answer:
                      "Absolutely! We offer many themes, animations, and customization options so your page perfectly reflects your emotions.",
                  },
                  {
                    question: "Is it really effective for turning the page?",
                    answer:
                      "Many users report a feeling of liberation after creating their page. The creative and symbolic process helps materialize the act of letting go.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className={`${
                      theme === "dark"
                        ? "bg-gray-900/50 border border-gray-800 hover:border-pink-500/30"
                        : "bg-gray-50 border border-gray-100 hover:border-pink-300/50"
                    } rounded-lg overflow-hidden transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <details className="group">
                      <summary
                        className={`flex items-center justify-between p-6 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        } font-medium cursor-pointer list-none`}
                      >
                        <span>{faq.question}</span>
                        <span className="transition group-open:rotate-180">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={
                              theme === "dark"
                                ? "text-pink-400"
                                : "text-pink-500"
                            }
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </span>
                      </summary>
                      <div
                        className={`px-6 pb-6 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p
                  className={
                    theme === "dark"
                      ? "text-gray-300 mb-6"
                      : "text-gray-600 mb-6"
                  }
                >
                  Ready to turn the page and start a new chapter?
                </p>
                <button
                  onClick={() => navigate("/create")}
                  className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-pink-500 to-fuchsia-600 shadow-lg hover:shadow-pink-500/50"
                      : "bg-gradient-to-br from-pink-500 to-fuchsia-500 shadow-md hover:shadow-pink-500/30"
                  } text-white font-bold transition-all duration-300`}
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center">
                    Create My Page Now
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      ></path>
                    </svg>
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className={`absolute top-1/2 left-10 w-20 h-20 rounded-full ${
              theme === "dark" ? "bg-pink-500/10" : "bg-pink-300/20"
            } blur-xl`}
          ></div>
          <div
            className={`absolute top-1/3 right-10 w-32 h-32 rounded-full ${
              theme === "dark" ? "bg-fuchsia-500/10" : "bg-fuchsia-300/20"
            } blur-xl`}
          ></div>
        </section>

        {/* Newsletter section */}
        <section
          className={`relative py-20 ${
            theme === "dark"
              ? "bg-gradient-to-b from-black to-gray-950"
              : "bg-gradient-to-b from-white to-pink-50"
          } overflow-hidden`}
        >
          <div className="absolute inset-0">
            <div
              className={`absolute inset-0 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-pink-500/5 to-fuchsia-500/5"
                  : "bg-gradient-to-r from-pink-300/10 to-fuchsia-300/10"
              }`}
            ></div>
            <div
              className={`absolute top-0 left-0 right-0 h-px ${
                theme === "dark"
                  ? "bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"
                  : "bg-gradient-to-r from-transparent via-pink-400/30 to-transparent"
              }`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 right-0 h-px ${
                theme === "dark"
                  ? "bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent"
                  : "bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent"
              }`}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div
              className={`max-w-4xl mx-auto ${
                theme === "dark"
                  ? "bg-gray-900/50 backdrop-blur-sm border border-white/5"
                  : "bg-white/70 backdrop-blur-sm border border-pink-100"
              } rounded-2xl p-8`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2
                    className={`text-2xl md:text-3xl font-bold mb-4 ${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Stay Inspired
                  </h2>
                  <p
                    className={
                      theme === "dark"
                        ? "text-gray-300 mb-0"
                        : "text-gray-600 mb-0"
                    }
                  >
                    Receive tips to free yourself from the past and ideas to
                    create your perfect page.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className={`flex-grow px-4 py-3 ${
                        theme === "dark"
                          ? "bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-pink-500 text-white"
                          : "bg-white border border-pink-200 focus:ring-2 focus:ring-pink-400 text-gray-800"
                      } rounded-lg focus:outline-none focus:border-transparent`}
                      required
                    />
                    <button
                      type="submit"
                      className={`px-6 py-3 ${
                        theme === "dark"
                          ? "bg-pink-500 hover:bg-pink-600"
                          : "bg-pink-500 hover:bg-pink-600"
                      } text-white font-medium rounded-lg transition-colors duration-300`}
                    >
                      Subscribe
                    </button>
                  </form>
                  <p
                    className={`text-sm mt-3 ${
                      theme === "dark" ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Grain overlay on the entire page */}
        <div className="fixed inset-0 bg-[url('/images/noise.png')] bg-repeat opacity-[0.02] mix-blend-overlay pointer-events-none z-50"></div>

        {/* Floating button */}
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <button
            onClick={() => navigate("/create")}
            className={`group flex items-center justify-center w-14 h-14 rounded-full ${
              theme === "dark"
                ? "bg-gradient-to-r from-pink-500 to-fuchsia-500 shadow-lg hover:shadow-pink-500/30"
                : "bg-gradient-to-r from-pink-500 to-fuchsia-500 shadow-md hover:shadow-pink-500/20"
            } text-white transition-all duration-300 hover:scale-110`}
            aria-label="Create my page"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            <span
              className={`absolute right-full mr-3 ${
                theme === "dark"
                  ? "bg-gray-900"
                  : "bg-white border border-pink-100"
              } text-${
                theme === "dark" ? "white" : "gray-800"
              } text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md`}
            >
              Create my page
            </span>
          </button>
        </motion.div>

        {/* Theme toggle button */}
        <motion.div
          className="fixed top-6 right-6 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              theme === "dark"
                ? "bg-gray-800 text-pink-400 hover:bg-gray-700"
                : "bg-white text-pink-500 hover:bg-gray-100 border border-pink-100"
            } shadow-md transition-colors duration-300`}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sunrise className="h-5 w-5" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
