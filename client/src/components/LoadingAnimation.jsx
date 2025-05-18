/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

export default function LoadingAnimation() {
    return (
        <div className="fixed inset-0 bg-base-300 z-50 flex items-center justify-center">
            <div className="text-center">
                <motion.div
                    className="text-6xl mb-8"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    📖
                </motion.div>
                <motion.h2
                    className="text-2xl font-bold"
                    animate={{
                        opacity: [0, 1]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    Creating your farewell page...
                </motion.h2>
            </div>
        </div>
    );
}
