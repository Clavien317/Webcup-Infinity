/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Share2, Volume2, VolumeX, Play, Pause, Music2, Heart, Facebook, Linkedin, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatMistralAI } from "@langchain/mistralai";
import { RunnableSequence } from "@langchain/core/runnables";
import LoadingAnimation from "../components/LoadingAnimation";

export default function CardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cardData, setCardData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = useRef(null);
    const [aiGeneratedStyles, setAiGeneratedStyles] = useState(null);
    const [isRegenerating, setIsRegenerating] = useState(false);

    useEffect(() => {
        if (location.state?.cardData) {
            setCardData(location.state.cardData);
            generateDesignStyles(location.state.cardData.tone);
        } else {
            navigate('/create'); // Redirect if no data is present
        }
    }, [location.state, navigate]);

    const generateDesignStyles = async (tone) => {
        try {
            setIsLoading(true);
            const emotionalContext = {
                tone,
                intensity: getEmotionIntensity(tone),
                timeOfDay: new Date().getHours(),
                scenario: cardData?.scenario || 'farewell',
                message: cardData?.message || '',
            };

            const prompt = PromptTemplate.fromTemplate(`
                You are an AI designer and emotional expert.
                Context: Creating a farewell card with these details:
                - Emotional tone: {tone}
                - Scenario: {scenario}
                - Message preview: {message}

                Generate a complete design system and emotional content. Structure exactly like this:

                {{
                    "design": {{
                        "colors": {{
                            "primary": "hex color",
                            "secondary": "hex color",
                            "accent": "hex color",
                            "text": "hex color",
                            "background": "gradient value"
                        }},
                        "typography": {{
                            "fontFamily": "font name",
                            "titleSize": "rem value",
                            "textSize": "rem value",
                            "lineHeight": "number"
                        }},
                        "effects": {{
                            "glow": "css value",
                            "shadows": "css value",
                            "blur": "css value",
                            "border": "css value",
                            "animation": "css keyframe name"
                        }}
                    }},
                    "content": {{
                        "emotionalQuote": "AI generated quote",
                        "wisdom": "philosophical insight",
                        "comfort": "supportive message",
                        "forward": "future-oriented message",
                        "keywords": ["emotional", "keywords"],
                        "suggestions": ["next", "steps"]
                    }}
                }}

                Base design on emotional psychology and color theory. Return only valid JSON.
            `);

            const chat = new ChatMistralAI({
                model: "mistral-medium",
                temperature: 0.8,
                apiKey: import.meta.env.VITE_MISTRAL_API_KEY
            });

            const chain = RunnableSequence.from([prompt, chat]);
            const response = await chain.invoke({
                tone: emotionalContext.tone,
                scenario: emotionalContext.scenario,
                message: emotionalContext.message
            });

            console.log('AI Response:', response); // Debug log

            const generatedContent = extractJSON(response.content);

            if (generatedContent) {
                console.log('Parsed Content:', generatedContent);
                setAiGeneratedStyles({
                    colors: generatedContent.design.colors,
                    typography: generatedContent.design.typography,
                    effects: generatedContent.design.effects
                });
                setCardData(prev => ({
                    ...prev,
                    generated: {
                        ...prev.generated,
                        emotionalQuote: generatedContent.content.emotionalQuote,
                        wisdom: generatedContent.content.wisdom,
                        comfort: generatedContent.content.comfort,
                        forward: generatedContent.content.forward,
                        keywords: generatedContent.content.keywords,
                        suggestions: generatedContent.content.suggestions
                    }
                }));
            } else {
                throw new Error("Failed to parse AI response");
            }

        } catch (error) {
            console.error("Error generating design:", error);
            // Enhanced fallback styles
            const fallbackStyles = {
                backgroundColor: `linear-gradient(135deg, 
                    ${getToneColor(tone)}, 
                    ${getLighterShade(getToneColor(tone))})`,
                accentColor: getAccentColor(tone),
                fontFamily: "Space Grotesk, sans-serif",
                glowEffect: "0 0 10px rgba(236,72,153,0.5)",
                visualElements: {
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(8px)",
                    background: "rgba(15, 23, 42, 0.6)",
                    animation: "fadeIn"
                }
            };
            setAiGeneratedStyles(fallbackStyles);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerate = async () => {
        setIsRegenerating(true);
        try {
            await generateDesignStyles(cardData.tone);
        } catch (error) {
            console.error("Error regenerating design:", error);
        } finally {
            setIsRegenerating(false);
        }
    };

    const shareToSocial = (platform) => {
        const url = window.location.href;
        const text = `Check out my farewell card: ${cardData?.title}`;
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    const getEmotionDetails = (tone) => {
        const emotionMap = {
            nostalgic: { emoji: "🥺", color: "text-amber-500", gif: "/gifs/nostalgic.gif" },
            dramatic: { emoji: "😭", color: "text-blue-500", gif: "/gifs/dramatic.gif" },
            peaceful: { emoji: "😇", color: "text-sky-500", gif: "/gifs/peaceful.gif" },
            grateful: { emoji: "🙏", color: "text-emerald-500", gif: "/gifs/grateful.gif" },
            reflective: { emoji: "🤔", color: "text-indigo-500", gif: "/gifs/reflective.gif" },
            melancholic: { emoji: "😔", color: "text-slate-500", gif: "/gifs/melancholic.gif" },
            hopeful: { emoji: "✨", color: "text-yellow-500", gif: "/gifs/hopeful.gif" },
            bittersweet: { emoji: "😌", color: "text-violet-500", gif: "/gifs/bittersweet.gif" },
            relieved: { emoji: "😮‍💨", color: "text-green-500", gif: "/gifs/relieved.gif" },
            accepting: { emoji: "🫂", color: "text-pink-500", gif: "/gifs/accepting.gif" }
        };
        return emotionMap[tone.toLowerCase()] || emotionMap.peaceful;
    };

    const renderPage = () => {
        if (!cardData?.generated || !aiGeneratedStyles) return null;
        const { title, message, generated } = cardData;
        const { colors, typography, effects } = aiGeneratedStyles;

        return (
            <motion.div
                className="min-h-screen overflow-hidden relative"
                style={{
                    background: colors.background,
                    fontFamily: typography.fontFamily,
                    color: colors.text,
                    fontSize: typography.textSize,
                    lineHeight: typography.lineHeight
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="relative container mx-auto px-4 py-8">
                    <motion.div
                        className="max-w-4xl mx-auto backdrop-blur-md rounded-2xl overflow-hidden"
                        style={{
                            backgroundColor: `${colors.secondary}15`,
                            boxShadow: effects.shadows,
                            border: effects.border
                        }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        {/* Content Section */}
                        <div className="p-8 space-y-8">
                            <div className="text-center">
                                <h1 style={{ 
                                    fontSize: typography.titleSize,
                                    color: colors.primary,
                                    textShadow: effects.glow
                                }}>{title}</h1>
                                <p className="mt-4 opacity-80">{generated.wisdom}</p>
                            </div>

                            <blockquote className="text-xl italic text-center p-6"
                                style={{ borderLeft: `4px solid ${colors.accent}` }}>
                                {generated.emotionalQuote}
                            </blockquote>

                            <div className="prose max-w-none">
                                <p>{message}</p>
                            </div>

                            <div className="flex justify-center gap-4">
                                {['Feel', 'Share', 'Listen'].map((action) => (
                                    <button
                                        key={action}
                                        className="px-4 py-2 rounded-full transition-all"
                                        style={{
                                            backgroundColor: colors.accent,
                                            color: colors.secondary,
                                            boxShadow: effects.shadows
                                        }}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-opacity-10 rounded-lg p-6"
                                style={{
                                    backgroundColor: colors.primary,
                                    borderLeft: `4px solid ${colors.accent}`
                                }}>
                                <p className="mb-4">{generated.comfort}</p>
                                <p className="opacity-80">{generated.forward}</p>
                            </div>

                            {/* New Action Buttons Section */}
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleRegenerate}
                                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                                    style={{
                                        backgroundColor: colors.accent,
                                        color: colors.secondary,
                                        boxShadow: effects.shadows
                                    }}
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    {isRegenerating ? 'Regenerating...' : 'Regenerate Design'}
                                </button>
                                <button
                                    onClick={() => shareToSocial('facebook')}
                                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                                    style={{
                                        backgroundColor: colors.accent,
                                        color: colors.secondary,
                                        boxShadow: effects.shadows
                                    }}
                                >
                                    <Facebook className="w-5 h-5" />
                                    Share on Facebook
                                </button>
                                <button
                                    onClick={() => shareToSocial('linkedin')}
                                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                                    style={{
                                        backgroundColor: colors.accent,
                                        color: colors.secondary,
                                        boxShadow: effects.shadows
                                    }}
                                >
                                    <Linkedin className="w-5 h-5" />
                                    Share on LinkedIn
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Action Buttons for Mobile */}
                <div className="fixed bottom-6 right-6 flex gap-3">
                    {/* Social Share Buttons */}
                    <motion.button
                        className="btn btn-circle btn-primary"
                        onClick={() => shareToSocial('facebook')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            backgroundColor: colors.accent,
                            color: colors.secondary,
                            boxShadow: effects.shadows
                        }}
                    >
                        <Facebook className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                        className="btn btn-circle btn-primary"
                        onClick={() => shareToSocial('linkedin')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            backgroundColor: colors.accent,
                            color: colors.secondary,
                            boxShadow: effects.shadows
                        }}
                    >
                        <Linkedin className="w-5 h-5" />
                    </motion.button>

                    {/* Regenerate Button */}
                    <motion.button
                        className="btn btn-circle btn-primary"
                        onClick={handleRegenerate}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={isRegenerating}
                        style={{
                            backgroundColor: colors.primary,
                            color: colors.secondary,
                            boxShadow: effects.shadows
                        }}
                    >
                        <RefreshCw className={`w-5 h-5 ${isRegenerating ? 'animate-spin' : ''}`} />
                    </motion.button>
                </div>
            </motion.div>
        );
    };

    return isLoading ? (
        <LoadingAnimation isRegenerating={isRegenerating} />
    ) : (
        renderPage()
    );
}

// Helper function to get emotion intensity based on tone
function getEmotionIntensity(tone) {
    const intensityMap = {
        dramatic: 5,
        melancholic: 4,
        nostalgic: 4,
        bittersweet: 3,
        grateful: 3,
        hopeful: 3,
        reflective: 2,
        peaceful: 2,
        accepting: 2,
        relieved: 1
    };
    return intensityMap[tone.toLowerCase()] || 3;
}

// Helper function to extract JSON from AI response string
function extractJSON(str) {
    try {
        const matches = str.match(/\{[\s\S]*\}/);
        return matches ? JSON.parse(matches[0]) : null;
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}

// Helper functions for fallback styles
const getToneColor = (tone) => {
    const colors = {
        dramatic: "#3B82F6",
        melancholic: "#64748B",
        nostalgic: "#F59E0B",
        bittersweet: "#8B5CF6",
        grateful: "#10B981",
        hopeful: "#EAB308",
        reflective: "#6366F1",
        peaceful: "#0EA5E9",
        accepting: "#EC4899",
        relieved: "#22C55E"
    };
    return colors[tone.toLowerCase()] || "#3B82F6";
};

const getLighterShade = (hexColor) => {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
};

const getAccentColor = (tone) => {
    const accents = {
        dramatic: "#EC4899",
        melancholic: "#94A3B8",
        nostalgic: "#FB923C",
        bittersweet: "#A855F7",
        grateful: "#34D399",
        hopeful: "#FACC15",
        reflective: "#818CF8",
        peaceful: "#38BDF8",
        accepting: "#F472B6",
        relieved: "#4ADE80"
    };
    return accents[tone.toLowerCase()] || "#EC4899";
};

// Add this helper function for better color harmonies
const getEmotionalColorScheme = (tone) => {
    const schemes = {
        dramatic: {
            primary: "#FF4D4D",
            secondary: "#1A1A2E",
            text: "#FFFFFF",
            accent: "#FFD700",
            gradient: "linear-gradient(135deg, #1A1A2E 0%, #FF4D4D 100%)",
            fontFamily: "'Playfair Display', serif"
        },
        melancholic: {
            primary: "#2C3E50",
            secondary: "#BDC3C7",
            text: "#ECF0F1",
            accent: "#8E44AD",
            gradient: "linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)",
            fontFamily: "'Merriweather', serif"
        },
        nostalgic: {
            primary: "#D4A373",
            secondary: "#FEFAE0",
            text: "#222222",
            accent: "#CCD5AE",
            gradient: "linear-gradient(135deg, #FAEDCD 0%, #D4A373 100%)",
            fontFamily: "'Lora', serif"
        },
        hopeful: {
            primary: "#48CAE4",
            secondary: "#CAF0F8",
            text: "#023E8A",
            accent: "#90E0EF",
            gradient: "linear-gradient(135deg, #CAF0F8 0%, #48CAE4 100%)",
            fontFamily: "'Montserrat', sans-serif"
        },
        peaceful: {
            primary: "#8ECAE6",
            secondary: "#E9ECF5",
            text: "#023047",
            accent: "#219EBC",
            gradient: "linear-gradient(135deg, #E9ECF5 0%, #8ECAE6 100%)",
            fontFamily: "'Open Sans', sans-serif"
        }
        // ... add more emotional color schemes as needed
    };
    return schemes[tone.toLowerCase()] || schemes.peaceful;
};
