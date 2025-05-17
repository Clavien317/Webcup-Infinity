/* eslint-disable no-unused-vars */
import { Palette, Film, BookOpen, Link, MessageSquare, Globe, Award } from "lucide-react";
import { HoverEffect } from "../ui/CardHoverEffect";
import { motion, useAnimation } from "motion/react";

const Features = () => {
    const features = [
        {
            title: "Express Yourself",
            description: "Choose your tone - dramatic, ironic, ultra cringe, classy, touching, absurd, passive-aggressive, or just honest.",
            icon: <Palette className="h-8 w-8 text-primary" />,
            logo: "🎭"
        },
        {
            title: "Multimedia Experience",
            description: "Add GIFs, sounds, tears, regrets (or not) to make your farewell truly unforgettable.",
            icon: <Film className="h-8 w-8 text-primary" />,
            logo: "🎬"
        },
        {
            title: "Share Your Story",
            description: "Tell your version of the story and share it with everyone who matters.",
            icon: <BookOpen className="h-8 w-8 text-primary" />,
            logo: "📖"
        },
        {
            title: "One Click Away",
            description: "A page you might hesitate to open... but will open anyway. A page that slams, because if it's the end, might as well make it unforgettable.",
            icon: <Link className="h-8 w-8 text-primary" />,
            logo: "🔗"
        },
        {
            title: "Personalized Messages",
            description: "Create custom messages for different recipients. Let each person know exactly how you feel about them and your time together.",
            icon: <MessageSquare className="h-8 w-8 text-primary" />,
            logo: "💬"
        },
        {
            title: "Global Accessibility",
            description: "Your farewell page is accessible worldwide. Anyone with the link can view your goodbye, no matter where they are.",
            icon: <Globe className="h-8 w-8 text-primary" />,
            logo: "🌎"
        }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Why <span className="text-primary">TheEnd</span>.page?
                </motion.h2>

                <HoverEffect items={features.map((feature, index) => ({
                    title: (
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{feature.logo}</span>
                            <span>{feature.title}</span>
                        </div>
                    ),
                    description: feature.description,
                    icon: feature.icon,
                }))}
                    className="max-w-5xl mx-auto"
                />
            </div>
        </section>
    );
};

export default Features;