/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import { MessageSquare, Image, Eye, Share2 } from "lucide-react";
import Footer from "../components/Footer";

export default function HowItWorksPage() {
    const steps = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Choose Your Template",
            description: "Select from our carefully crafted templates designed for different farewell scenarios."
        },
        {
            icon: <Image className="w-8 h-8" />,
            title: "Customize Your Message",
            description: "Add your personal touch with custom text, images, and multimedia elements."
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: "Preview and Adjust",
            description: "Review your creation in real-time and make adjustments until it's perfect."
        },
        {
            icon: <Share2 className="w-8 h-8" />,
            title: "Share with Loved Ones",
            description: "Generate and share your heartfelt message with those who matter most."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
            <Navbar />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        How It Works
                    </h1>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        Create meaningful farewell messages in just a few simple steps. 
                        Our platform makes it easy to express your feelings with style.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6 items-start bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-base-content">
                                    {step.title}
                                </h3>
                                <p className="text-base-content/70">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/create"
                        className="btn btn-primary btn-lg"
                    >
                        Create Your Message
                    </a>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}