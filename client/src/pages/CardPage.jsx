/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music2,
  Heart,
  Facebook,
  Linkedin,
  RefreshCw,
  Edit,
  Save,
  X,
} from "lucide-react";
import CustomFarewellCard from "../components/CustomFarewellCard";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatMistralAI } from "@langchain/mistralai";
import { RunnableSequence } from "@langchain/core/runnables";
import LoadingAnimation from "../components/LoadingAnimation";
import Navbar from "../components/Navbar";
import { SketchPicker } from "react-color";

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
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customStyles, setCustomStyles] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorTarget, setCurrentColorTarget] = useState(null);

  useEffect(() => {
    if (location.state?.cardData) {
      setCardData(location.state.cardData);
      generateDesignStyles(location.state.cardData.tone);
    } else {
      navigate("/create"); // Redirect if no data is present
    }
  }, [location.state, navigate]);

  const generateDesignStyles = async (tone) => {
    try {
      setIsLoading(true);
      const emotionalContext = {
        tone,
        intensity: getEmotionIntensity(tone),
        timeOfDay: new Date().getHours(),
        scenario: cardData?.scenario || "farewell",
        message: cardData?.message || "",
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
        apiKey: import.meta.env.VITE_MISTRAL_API_KEY,
      });

      const chain = RunnableSequence.from([prompt, chat]);
      const response = await chain.invoke({
        tone: emotionalContext.tone,
        scenario: emotionalContext.scenario,
        message: emotionalContext.message,
      });

      console.log("AI Response:", response); // Debug log

      const generatedContent = extractJSON(response.content);

      if (generatedContent) {
        console.log("Parsed Content:", generatedContent);
        const styles = {
          colors: generatedContent.design.colors,
          typography: generatedContent.design.typography,
          effects: generatedContent.design.effects,
        };
        setAiGeneratedStyles(styles);
        setCustomStyles(styles); // Initialize custom styles with AI-generated ones
        setCardData((prev) => ({
          ...prev,
          generated: {
            ...prev.generated,
            emotionalQuote: generatedContent.content.emotionalQuote,
            wisdom: generatedContent.content.wisdom,
            comfort: generatedContent.content.comfort,
            forward: generatedContent.content.forward,
            keywords: generatedContent.content.keywords,
            suggestions: generatedContent.content.suggestions,
          },
        }));
      } else {
        throw new Error("Failed to parse AI response");
      }
    } catch (error) {
      console.error("Error generating design:", error);
      // Enhanced fallback styles
      const fallbackStyles = {
        colors: {
          primary: getToneColor(tone),
          secondary: getLighterShade(getToneColor(tone)),
          accent: getAccentColor(tone),
          text: "#FFFFFF",
          background: `linear-gradient(135deg, 
                        ${getToneColor(tone)}, 
                        ${getLighterShade(getToneColor(tone))})`,
        },
        typography: {
          fontFamily: "Space Grotesk, sans-serif",
          titleSize: "2.5rem",
          textSize: "1rem",
          lineHeight: "1.6",
        },
        effects: {
          glow: "0 0 10px rgba(236,72,153,0.5)",
          shadows: "0 8px 32px rgba(0, 0, 0, 0.2)",
          blur: "8px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          animation: "fadeIn",
        },
      };
      setAiGeneratedStyles(fallbackStyles);
      setCustomStyles(fallbackStyles);
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

  const handleCustomizeToggle = () => {
    setIsCustomizing(!isCustomizing);
  };

  const handleColorPickerToggle = (colorTarget) => {
    setCurrentColorTarget(colorTarget);
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color) => {
    if (currentColorTarget) {
      setCustomStyles((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [currentColorTarget]: color.hex,
        },
      }));
    }
  };

  const handleFontChange = (e) => {
    setCustomStyles((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        fontFamily: e.target.value,
      },
    }));
  };

  const handleEffectChange = (effect, value) => {
    setCustomStyles((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [effect]: value,
      },
    }));
  };

  const handleSaveCustomization = () => {
    setAiGeneratedStyles(customStyles);
    setIsCustomizing(false);
  };

  const handleCancelCustomization = () => {
    setCustomStyles(aiGeneratedStyles);
    setIsCustomizing(false);
  };

  const shareToSocial = (platform) => {
    const url = window.location.href;
    const text = `Check out my farewell card: ${cardData?.title}`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(text)}`,
    };

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const getEmotionDetails = (tone) => {
    const emotionMap = {
      nostalgic: {
        emoji: "🥺",
        color: "text-amber-500",
        gif: "/gifs/nostalgic.gif",
      },
      dramatic: {
        emoji: "😭",
        color: "text-blue-500",
        gif: "/gifs/dramatic.gif",
      },
      peaceful: {
        emoji: "😇",
        color: "text-sky-500",
        gif: "/gifs/peaceful.gif",
      },
      grateful: {
        emoji: "🙏",
        color: "text-emerald-500",
        gif: "/gifs/grateful.gif",
      },
      reflective: {
        emoji: "🤔",
        color: "text-indigo-500",
        gif: "/gifs/reflective.gif",
      },
      melancholic: {
        emoji: "😔",
        color: "text-slate-500",
        gif: "/gifs/melancholic.gif",
      },
      hopeful: {
        emoji: "✨",
        color: "text-yellow-500",
        gif: "/gifs/hopeful.gif",
      },
      bittersweet: {
        emoji: "😌",
        color: "text-violet-500",
        gif: "/gifs/bittersweet.gif",
      },
      relieved: {
        emoji: "😮‍💨",
        color: "text-green-500",
        gif: "/gifs/relieved.gif",
      },
      accepting: {
        emoji: "🫂",
        color: "text-pink-500",
        gif: "/gifs/accepting.gif",
      },
    };
    return emotionMap[tone.toLowerCase()] || emotionMap.peaceful;
  };

  // Ajoutez cette fonction dans le composant CardPage
  const renderRelatedCards = () => {
    if (!cardData || !aiGeneratedStyles) return null;

    // Simuler des cartes similaires basées sur le ton et le scénario
    const mockRelatedCards = [
      {
        id: 1,
        author: "Alex Smith",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Alex`,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        votes: 12,
        hasVoted: false,
        comments: [],
        scenario: cardData.scenario,
        tone: cardData.tone,
        message: "Finding closure after all these years",
        reponse:
          "Sometimes the hardest goodbyes are the ones we never got to say. After years of wondering what could have been, I've finally found peace.",
        emotion: {
          name: cardData.emotion?.name || "Reflective",
          emoji: "🤔",
          color: "text-indigo-500",
        },
      },
      {
        id: 2,
        author: "Jessica Taylor",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica`,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        votes: 28,
        hasVoted: false,
        comments: [
          { id: 1, author: "Mark", text: "This resonated with me deeply" },
        ],
        scenario: cardData.scenario,
        tone: cardData.tone === "nostalgic" ? "bittersweet" : "nostalgic",
        message: "The chapter ends, but the story continues",
        reponse:
          "Saying goodbye to a decade of memories wasn't easy, but I'm grateful for every lesson learned and every moment shared.",
        emotion: {
          name:
            cardData.emotion?.name === "Nostalgic" ? "Grateful" : "Nostalgic",
          emoji: cardData.emotion?.name === "Nostalgic" ? "🙏" : "🥺",
          color:
            cardData.emotion?.name === "Nostalgic"
              ? "text-emerald-500"
              : "text-amber-500",
        },
      },
    ];

    return (
      <div className="mt-12">
        <h2
          className="text-2xl font-bold mb-6"
          style={{
            color: aiGeneratedStyles.colors.primary,
            textShadow: aiGeneratedStyles.effects.glow,
          }}
        >
          Similar Farewells
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRelatedCards.map((card) => (
            <CustomFarewellCard
              key={card.id}
              page={card}
              customStyles={aiGeneratedStyles}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCustomizationPanel = () => {
    if (!isCustomizing) return null;

    return (
      <motion.div
        className="fixed inset-y-0 right-0 w-80 bg-base-200 shadow-xl p-4 z-50 overflow-y-auto"
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        exit={{ x: 300 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Customize Design</h3>
          <button
            onClick={handleCustomizeToggle}
            className="btn btn-sm btn-circle"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Colors</h4>
            <div className="grid grid-cols-2 gap-2">
              {["primary", "secondary", "accent", "text"].map((colorKey) => (
                <div key={colorKey} className="flex flex-col items-center">
                  <button
                    className="w-full h-10 rounded-md border border-base-300 mb-1"
                    style={{ backgroundColor: customStyles?.colors[colorKey] }}
                    onClick={() => handleColorPickerToggle(colorKey)}
                  />
                  <span className="text-xs capitalize">{colorKey}</span>
                </div>
              ))}
            </div>
            <div>
              <button
                className="w-full h-10 rounded-md border border-base-300 mb-1 bg-gradient-to-r"
                style={{ backgroundImage: customStyles?.colors.background }}
                onClick={() => handleColorPickerToggle("background")}
              />
              <span className="text-xs">Background</span>
            </div>

            {showColorPicker && (
              <div className="mt-2 p-2 bg-base-100 rounded-md shadow-lg">
                <SketchPicker
                  color={
                    currentColorTarget === "background"
                      ? "#ffffff"
                      : customStyles?.colors[currentColorTarget]
                  }
                  onChange={handleColorChange}
                  width="100%"
                />
                {currentColorTarget === "background" && (
                  <div className="mt-2">
                    <p className="text-xs mb-1">
                      For gradients, enter CSS value:
                    </p>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-full"
                      value={customStyles?.colors.background}
                      onChange={(e) =>
                        setCustomStyles((prev) => ({
                          ...prev,
                          colors: {
                            ...prev.colors,
                            background: e.target.value,
                          },
                        }))
                      }
                      placeholder="linear-gradient(135deg, #color1, #color2)"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Typography</h4>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Font Family</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={customStyles?.typography.fontFamily}
                onChange={handleFontChange}
              >
                <option value="Space Grotesk, sans-serif">Space Grotesk</option>
                <option value="Playfair Display, serif">
                  Playfair Display
                </option>
                <option value="Montserrat, sans-serif">Montserrat</option>
                <option value="Lora, serif">Lora</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Open Sans, sans-serif">Open Sans</option>
                <option value="Merriweather, serif">Merriweather</option>
                <option value="Poppins, sans-serif">Poppins</option>
              </select>
            </div>

            <div className="form-control">
              {/* <label className="label"> */}
              <span className="label-text">Title Size</span>
              <label className="label">
                <span className="label-text">Title Size</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customStyles?.typography.titleSize}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    typography: {
                      ...prev.typography,
                      titleSize: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Text Size</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customStyles?.typography.textSize}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    typography: {
                      ...prev.typography,
                      textSize: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Line Height</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customStyles?.typography.lineHeight}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    typography: {
                      ...prev.typography,
                      lineHeight: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Effects</h4>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Glow</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customStyles?.effects.glow}
                onChange={(e) => handleEffectChange("glow", e.target.value)}
                placeholder="0 0 10px rgba(255,255,255,0.5)"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Shadows</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customStyles?.effects.shadows}
                onChange={(e) => handleEffectChange("shadows", e.target.value)}
                placeholder="0 8px 32px rgba(0,0,0,0.2)"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Border</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={customStyles?.effects.border}
                onChange={(e) => handleEffectChange("border", e.target.value)}
                placeholder="1px solid rgba(255,255,255,0.1)"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            className="btn btn-primary flex-1"
            onClick={handleSaveCustomization}
          >
            <Save size={16} className="mr-1" />
            Save
          </button>
          <button
            className="btn btn-outline flex-1"
            onClick={handleCancelCustomization}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  };

  // Modifiez la fonction renderPage dans CardPage.jsx pour inclure les cartes similaires
  const renderPage = () => {
    if (!cardData?.generated || !aiGeneratedStyles) return null;
    const { title, message, generated } = cardData;
    const { colors, typography, effects } = aiGeneratedStyles;

    return (
      <>
        <Navbar />
        <motion.div
          className="min-h-screen overflow-hidden relative pt-16"
          style={{
            background: colors.background,
            fontFamily: typography.fontFamily,
            color: colors.text,
            fontSize: typography.textSize,
            lineHeight: typography.lineHeight,
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
                border: effects.border,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {/* Content Section */}
              <div className="p-8 space-y-8">
                <div className="text-center">
                  <h1
                    style={{
                      fontSize: typography.titleSize,
                      color: colors.primary,
                      textShadow: effects.glow,
                    }}
                  >
                    {title}
                  </h1>
                  <p className="mt-4 opacity-80">{generated.wisdom}</p>
                </div>

                <blockquote
                  className="text-xl italic text-center p-6"
                  style={{ borderLeft: `4px solid ${colors.accent}` }}
                >
                  {generated.emotionalQuote}
                </blockquote>

                <div className="prose max-w-none">
                  <p>{message}</p>
                </div>

                <div className="flex justify-center gap-4">
                  {["Feel", "Share", "Listen"].map((action) => (
                    <button
                      key={action}
                      className="px-4 py-2 rounded-full transition-all"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.secondary,
                        boxShadow: effects.shadows,
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>

                <div
                  className="bg-opacity-10 rounded-lg p-6"
                  style={{
                    backgroundColor: colors.primary,
                    borderLeft: `4px solid ${colors.accent}`,
                  }}
                >
                  <p className="mb-4">{generated.comfort}</p>
                  <p className="opacity-80">{generated.forward}</p>
                </div>

                {/* Action Buttons Section */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleRegenerate}
                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.secondary,
                      boxShadow: effects.shadows,
                    }}
                    disabled={isRegenerating}
                  >
                    <RefreshCw
                      className={`w-5 h-5 ${
                        isRegenerating ? "animate-spin" : ""
                      }`}
                    />
                    {isRegenerating ? "Regenerating..." : "Regenerate Design"}
                  </button>
                  <button
                    onClick={handleCustomizeToggle}
                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.secondary,
                      boxShadow: effects.shadows,
                    }}
                  >
                    <Edit className="w-5 h-5" />
                    Customize Design
                  </button>
                  <button
                    onClick={() => shareToSocial("facebook")}
                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.secondary,
                      boxShadow: effects.shadows,
                    }}
                  >
                    <Facebook className="w-5 h-5" />
                    Share on Facebook
                  </button>
                  <button
                    onClick={() => shareToSocial("linkedin")}
                    className="px-4 py-2 rounded-full transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.secondary,
                      boxShadow: effects.shadows,
                    }}
                  >
                    <Linkedin className="w-5 h-5" />
                    Share on LinkedIn
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Related Cards Section */}
            <div className="max-w-4xl mx-auto">{renderRelatedCards()}</div>
          </div>

          {/* Floating Action Buttons for Mobile */}
          <div className="fixed bottom-6 right-6 flex gap-3">
            {/* Customize Button */}
            <motion.button
              className="btn btn-circle btn-primary"
              onClick={handleCustomizeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: colors.primary,
                color: colors.secondary,
                boxShadow: effects.shadows,
              }}
            >
              <Edit className="w-5 h-5" />
            </motion.button>

            {/* Social Share Buttons */}
            <motion.button
              className="btn btn-circle btn-primary"
              onClick={() => shareToSocial("facebook")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: colors.accent,
                color: colors.secondary,
                boxShadow: effects.shadows,
              }}
            >
              <Facebook className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="btn btn-circle btn-primary"
              onClick={() => shareToSocial("linkedin")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: colors.accent,
                color: colors.secondary,
                boxShadow: effects.shadows,
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
                boxShadow: effects.shadows,
              }}
            >
              <RefreshCw
                className={`w-5 h-5 ${isRegenerating ? "animate-spin" : ""}`}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Customization Panel */}
        {renderCustomizationPanel()}
      </>
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
    relieved: 1,
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
    relieved: "#22C55E",
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
    relieved: "#4ADE80",
  };
  return accents[tone.toLowerCase()] || "#EC4899";
};
