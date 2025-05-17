/* eslint-disable no-unused-vars */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
    useHoverAnimation
} from "../hooks/useAnimations";

// Components
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";

// Icons
import {
    Sparkles,
    Sunrise
} from "lucide-react";
import Features from "../components/Features.jsx";

const testimonials = [
    {
        quote: "Creating my farewell page was therapeutic. It helped me close a chapter of my life with grace.",
        author: "Sarah Chen",
        role: "Artist",
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
    },
    {
        quote: "After hesitating for months, this platform gave me the push I needed to move forward.",
        author: "Marcus Rodriguez",
        role: "Teacher",
        avatar: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg"
    },
    {
        quote: "Sometimes letting go is the strongest thing you can do. This helped me realize that.",
        author: "Emma Laurent",
        role: "Writer",
        avatar: "https://api.uifaces.co/our-content/donated/AVQ0V28X.jpg"
    }
];

const faqs = [
    {
        question: "How long will my farewell page be available?",
        answer: "Your page will be available for 24 hours from the moment you publish it. This temporary nature helps make the letting go process more meaningful."
    },
    {
        question: "Can I choose who sees my page?",
        answer: "Yes, you have full control. You can keep it private, share it with specific people via a link, or make it public in our gallery."
    },
    {
        question: "What happens after 24 hours?",
        answer: "Your page will gracefully fade away, symbolizing the act of letting go. You can't retrieve it after this period - that's part of the healing process."
    },
    {
        question: "Can I customize my page's appearance?",
        answer: "Absolutely! You can choose different themes, add background music, include photos, and select from various emotional tones to match your feelings."
    }
];

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
        <div className="bg-base-200">
            <Navbar />
            <Hero />
            <Features />

            {/* Emotion Steps Section - After Features */}
            <section className="bg-base-100 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Start Your Liberation Journey
                            </h2>
                            <p className="text-xl text-base-content/70">
                                Three simple steps to free yourself and begin anew
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    emoji: "😔",
                                    title: "Acknowledge",
                                    description: "Recognize what's holding you back"
                                },
                                {
                                    emoji: "✍️",
                                    title: "Express",
                                    description: "Share your emotions and story"
                                },
                                {
                                    emoji: "🦋",
                                    title: "Transform",
                                    description: "Let go and embrace new beginnings"
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="card-body relative">
                                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                        <div className="text-4xl mb-4 relative">{step.emoji}</div>
                                        <h3 className="card-title mb-2">{step.title}</h3>
                                        <p className="text-base-content/70">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Free Yourself Section - Emotional Appeal */}
            <section className="bg-base-200 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-primary/5 blur-3xl transform rotate-6"></div>
                                <Sparkles className="h-12 w-12 mx-auto text-primary relative" />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Free Yourself From The Past
                            </h2>
                            <p className="text-xl mb-12 text-base-content/70">
                                Transform your emotional weight into wings of freedom
                            </p>

                            <div className="stats shadow bg-base-100">
                                {[
                                    { number: "10K+", label: "Stories Shared" },
                                    { number: "94%", label: "Found Peace" },
                                    { number: "24H", label: "To Let Go" }
                                ].map((stat, index) => (
                                    <div key={index} className="stat">
                                        <div className="stat-value text-primary">{stat.number}</div>
                                        <div className="stat-desc">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials with Emotion Cards */}
            <section className="bg-base-100 py-20">
                <div className="container mx-auto px-4">
                    <motion.div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            They Found Their Peace
                        </h2>
                        <p className="text-xl text-base-content/70">
                            Real stories of emotional liberation
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="card bg-base-100 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="card-body">
                                    <div className="chat chat-start">
                                        <div className="chat-bubble chat-bubble-primary">
                                            {testimonial.quote}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={testimonial.avatar} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{testimonial.author}</div>
                                            <div className="text-sm opacity-60">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section with Animation */}
            <section className="bg-base-200 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Common Questions
                            </h2>
                            <p className="text-xl text-base-content/70">
                                Everything about your liberation journey
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="collapse collapse-plus bg-base-100"
                                >
                                    <input type="radio" name="faq-accordion" />
                                    <div className="collapse-title text-xl font-medium">
                                        {faq.question}
                                    </div>
                                    <div className="collapse-content">
                                        <p className="text-base-content/70">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-base-100 py-20">
                <div className="container mx-auto px-4">
                    <div className="card bg-primary text-primary-content max-w-4xl mx-auto">
                        <div className="card-body p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <motion.div>
                                    <h2 className="text-3xl font-bold mb-4">
                                        Ready to Let Go?
                                    </h2>
                                    <p className="opacity-90">
                                        Start your journey to emotional freedom today.
                                    </p>
                                </motion.div>
                                <motion.div className="text-center md:text-right">
                                    <button
                                        onClick={() => navigate("/create")}
                                        className="btn btn-lg bg-white hover:bg-white/90 text-primary"
                                    >
                                        Create Your Page
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
