/* eslint-disable no-unused-vars */
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Flame, ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { BackgroundBeams } from "../ui/BackgroundBeams";

const Hero = () => {
    const navigate = useNavigate();
    
    return (
        <div className="relative h-screen w-ful flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full absolute inset-0 h-screen">
            </div>
            
            <div className="relative z-10 text-center px-6 md:px-10 py-10 md:py-24 max-w-5xl mx-auto">
                <motion.h1 
                    className="text-5xl md:text-7xl font-bold mb-8 z-10 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-pink-500">TheEnd</span>.page
                </motion.h1>
                
                <motion.p 
                    className="text-xl md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Create your unforgettable farewell page. Whether you're leaving a job, 
                    ending a project, or closing a chapter in your life - make it memorable.
                </motion.p>
                
                {/* Enhanced CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <button 
                        onClick={() => navigate('/create')}
                        className="btn relative px-8 py-4 overflow-hidden rounded-lg bg-pink-500"
                    >
                        <div className="absolute inset-0 w-3 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10"></div>
                        <div className="relative flex items-center justify-center gap-2">
                            <span>Create Your Page</span>
                            <Sparkles className="h-4 w-4" />
                        </div>
                    </button>
                    <button 
                        onClick={() => navigate('/examples')}
                        className="btn relative px-8 py-4 rounded-lg"
                    >
                        <div className="relative flex items-center justify-center gap-2">
                            <span>See Examples</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>
                </motion.div>
            </div>
            <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
        </div>
    );
};
    );
};

export default Hero;