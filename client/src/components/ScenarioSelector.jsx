/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Heart, Briefcase, Users, Home, Star } from "lucide-react";

const ScenarioSelector = ({ selectedScenario, setSelectedScenario }) => {
    const scenarios = [
        {
            id: "heartbreak",
            icon: <Heart className="w-6 h-6" />,
            title: "Heartbreak & Breakups",
            description: "The end of a relationship, whether romantic or platonic",
            mood: ["dramatic", "touching", "honest"]
        },
        {
            id: "career",
            icon: <Briefcase className="w-6 h-6" />,
            title: "Career Changes",
            description: "Leaving a job, quitting dramatically, or career transitions",
            mood: ["professional", "passive-aggressive", "honest"]
        },
        {
            id: "project",
            icon: <Star className="w-6 h-6" />,
            title: "Project Farewells",
            description: "When a project ends or crashes spectacularly",
            mood: ["ironic", "dramatic", "honest"]
        },
        {
            id: "moving",
            icon: <Home className="w-6 h-6" />,
            title: "Moving Away",
            description: "Saying goodbye to a place, city, or country",
            mood: ["touching", "nostalgic", "bittersweet"]
        },
        {
            id: "community",
            icon: <Users className="w-6 h-6" />,
            title: "Community Goodbyes",
            description: "Leaving an online community, friend group, or team",
            mood: ["casual", "dramatic", "grateful"]
        }
    ];

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6">
            <motion.h2 
                className="text-3xl font-bold mb-6 text-pink-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Choose Your Farewell Scenario
            </motion.h2>
            
            <div className="grid gap-4">
                {scenarios.map((scenario, index) => (
                    <motion.div
                        key={scenario.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            selectedScenario === scenario.id
                                ? "border-pink-500 bg-pink-500/10"
                                : "border-gray-700 hover:border-pink-400 hover:bg-pink-500/5"
                        }`}
                        onClick={() => setSelectedScenario(scenario.id)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${
                                selectedScenario === scenario.id
                                    ? "bg-pink-500 text-white"
                                    : "bg-gray-800 text-pink-400"
                            }`}>
                                {scenario.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">{scenario.title}</h3>
                                <p className="text-gray-400">{scenario.description}</p>
                                <div className="flex gap-2 mt-2">
                                    {scenario.mood.map((mood) => (
                                        <span 
                                            key={mood}
                                            className="text-xs px-2 py-1 rounded-full bg-gray-800 text-pink-400"
                                        >
                                            #{mood}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ScenarioSelector;