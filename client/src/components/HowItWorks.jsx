/* eslint-disable no-unused-vars */
import {motion , useAnimation } from "motion/react";

const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Choose Your Style",
            description: "Select the tone and style that best represents your farewell."
        },
        {
            number: "02",
            title: "Create Your Content",
            description: "Write your message, upload media, and personalize your page."
        },
        {
            number: "03",
            title: "Preview & Perfect",
            description: "See how your page looks and make any necessary adjustments."
        },
        {
            number: "04",
            title: "Share With The World",
            description: "Get a unique URL and share your farewell page with everyone."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
            <div className="container mx-auto px-4">
                <motion.h2 
                    className="text-4xl font-bold text-center mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    How It Works
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-6xl font-bold text-pink-500 opacity-30 absolute -top-8 left-0">
                                {step.number}
                            </div>
                            <div className="pt-8">
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-300">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;