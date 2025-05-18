/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import { Heart, Users, Clock, Sparkles } from "lucide-react";
import Footer from "../components/Footer";

export default function AboutPage() {
    const features = [
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Meaningful Connections",
            description: "Create lasting memories with personalized farewell messages that touch hearts."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "For Everyone",
            description: "Whether saying goodbye to colleagues, friends, or family, we've got you covered."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Time-Sensitive",
            description: "Our messages are designed to be meaningful in the moment they matter most."
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "AI-Powered",
            description: "Utilizing advanced AI to help you craft the perfect farewell message."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
            <Navbar />
            
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        About Infinity
                    </h1>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        We're dedicated to helping people create meaningful and memorable 
                        farewell messages using the power of artificial intelligence and 
                        human creativity.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-base-content/70">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-16 bg-base-100 p-8 rounded-xl shadow-lg"
                >
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Our Mission
                    </h2>
                    <p className="text-center text-base-content/80 max-w-2xl mx-auto">
                        To revolutionize how people say goodbye by providing an innovative 
                        platform that combines emotional intelligence with cutting-edge 
                        technology, making every farewell meaningful and memorable.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/create"
                        className="btn btn-primary btn-lg"
                    >
                        Start Creating
                    </a>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    );
}