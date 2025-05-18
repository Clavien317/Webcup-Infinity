/* eslint-disable no-unused-vars */
import { AlertTriangle, Check, CheckCircle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer.jsx";
import LoadingAnimation from '../components/LoadingAnimation';
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

const emotions = [
    { name: "Nostalgic", emoji: "🥺", color: "text-amber-500" },
    { name: "Dramatic", emoji: "😭", color: "text-blue-500" },
    { name: "Peaceful", emoji: "😇", color: "text-sky-500" },
    { name: "Grateful", emoji: "🙏", color: "text-emerald-500" },
    { name: "Reflective", emoji: "🤔", color: "text-indigo-500" },
    { name: "Melancholic", emoji: "😔", color: "text-slate-500" },
    { name: "Hopeful", emoji: "✨", color: "text-yellow-500" },
    { name: "Bittersweet", emoji: "😌", color: "text-violet-500" },
    { name: "Relieved", emoji: "😮‍💨", color: "text-green-500" },
    { name: "Accepting", emoji: "🫂", color: "text-pink-500" }
];

const toneOptions = [
    { value: "dramatic", label: "Dramatic", icon: "🎭", description: "Intense and theatrical moments" },
    { value: "ironic", label: "Ironic", icon: "😏", description: "With a touch of sarcasm" },
    { value: "ultra-cringe", label: "Ultra Cringe", icon: "😬", description: "Deliberately over-the-top" },
    { value: "classy", label: "Classy", icon: "✨", description: "Elegant and sophisticated" },
    { value: "touching", label: "Touching", icon: "💝", description: "Heart-warming and moving" },
    { value: "absurd", label: "Absurd", icon: "🤪", description: "Quirky and unexpected" },
    { value: "passive-aggressive", label: "Passive-Aggressive", icon: "🙃", description: "Subtly pointed" },
    { value: "honest", label: "Honest", icon: "💫", description: "Straightforward and genuine" }
];

// Step definitions with validation rules
const steps = [
    {
        id: 1,
        name: "Emotion",
        isValid: (formData, selectedEmotion) => selectedEmotion !== null
    },
    {
        id: 2,
        name: "Situation",
        isValid: (formData) => formData.scenario !== ""
    },
    {
        id: 3,
        name: "Details",
        isValid: () => true,
        optional: true
    },
    {
        id: 4,
        name: "Set Tone",
        isValid: (formData) => formData.tone !== ""
    }
];

const mockResponse = {
    title: formData => `Farewell to ${formData.title}`,
    content: formData => ({
        intro: `As I sit here reflecting on this ${formData.tone} moment, my heart is filled with ${formData.scenario.includes('heartbreak') ? 'bittersweet memories' : 'mixed emotions'}.`,
        body: formData.message || "Time has a way of bringing change into our lives, sometimes expected, sometimes not. But each ending is also a new beginning.",
        conclusion: "And so, with both gratitude and courage, I say goodbye.",
        generatedImages: [
            "https://source.unsplash.com/random/800x600/?farewell",
            "https://source.unsplash.com/random/800x600/?memories",
            "https://source.unsplash.com/random/800x600/?hope"
        ],
        soundtrack: {
            title: "Farewell Symphony",
            url: "https://example.com/music/farewell.mp3"
        },
        theme: {
            primary: "#4A90E2",
            secondary: "#F5A623",
            background: "gradient-to-r from-blue-500/10 to-purple-500/10"
        },
        animations: [
            { type: "fade-in", duration: 1000 },
            { type: "float", duration: 2000 },
            { type: "pulse", duration: 1500 }
        ],
        quotes: [
            "Every new beginning comes from some other beginning's end.",
            "The hardest part isn't letting go but learning to start over.",
            "Sometimes goodbye is a second chance."
        ]
    })
};

export default function CreatePage() {

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [user,setUser] = useState(null)

    useEffect(()=>
    {
        const stored = localStorage.getItem("user")
        setUser(JSON.parse(stored))    
    },[])
    const [formData, setFormData] = useState({
        title: "My Farewell Page",
        tone: "",
        scenario: "",
        message: "",
        images: [],
        backgroundMusic: null,
        includeGifs: false,
        includeSounds: false,
        includeAnimations: false,
        idUser: user?.id
    });
    const [timeLeft, setTimeLeft] = useState(1440); // 24 hours in minutes
    const [errors, setErrors] = useState({});

    // Simulate countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => Math.max(0, prev - 1));
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateStep = () => {
        const currentStepDef = steps.find(s => s.id === step);
        if (!currentStepDef) return true;

        return currentStepDef.isValid(formData, selectedEmotion);
    };

    const nextStep = () => {
        // Validate current step
        if (!validateStep()) {
            if (step === 1 && !selectedEmotion) {
                setErrors({ emotion: "Please select how you feel" });
                return;
            }
            if (step === 2 && !formData.message) {
                setErrors({ message: "Your farewell needs a message" });
                return;
            }
        }

        setErrors({});
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const goToStep = (stepNumber) => {
        // Only allow going to completed steps or the next available step
        if (stepNumber <= Math.min(step + 1, steps.length)) {
            setStep(stepNumber);
        }
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Form submitted:", formData);
            await axios.post("/generation/post", formData)
            nextStep();
            setIsLoading(true);

            try {
                // Simulate API call with mock response
                await new Promise(resolve => setTimeout(resolve, 2000));

                const generatedCard = {
                    ...formData,
                    title: mockResponse.title(formData),
                    generated: mockResponse.content(formData),
                    timestamp: new Date().toISOString(),
                    expiresIn: "24 hours"
                };

                // Navigate to card page with generated data
                navigate('/card', {
                    state: { cardData: generatedCard }
                });
            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
            }

    // Format time remaining
    const formatTimeLeft = () => {
        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <>
            {isLoading && <LoadingAnimation />}
            <Navbar />
            <div className="min-h-screen pt-20 pb-10 bg-base-200">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">
                        Create Your <span className="text-primary">TheEnd</span> Page
                    </h1>

                    <div className="max-w-3xl mx-auto">
                        {/* Enhanced interactive stepper */}
                        <div className="mb-10">
                            <ul className="steps steps-horizontal w-full">
                                {steps.map((s) => (
                                    <li
                                        key={s.id}
                                        className={`step cursor-pointer ${step >= s.id ? "step-primary" : ""}`}
                                        onClick={() => goToStep(s.id)}
                                        data-content={step > s.id ? "✓" : s.id}
                                    >
                                        <div className="flex items-center gap-1">
                                            {s.name}
                                            {s.optional && (
                                                <span className="text-xs text-base-content/50">(optional)</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                {/* Step 1: Style/Emotion Selection */}
                                {step === 1 && (
                                    <div>
                                        <h2 className="card-title text-2xl mb-8 justify-center">How do you feel?</h2>

                                        {errors.emotion && (
                                            <div className="alert alert-error mb-4 flex items-center">
                                                <AlertTriangle className="w-5 h-5" />
                                                <span>{errors.emotion}</span>
                                            </div>
                                        )}

                                        <div className="relative h-[400px] mb-8">
                                            {/* Grand emoji animé au centre */}
                                            <motion.div
                                                className="text-[120px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                                initial={{ scale: 0.9, opacity: 0.8 }}
                                                animate={{
                                                    scale: selectedEmotion ? [0.9, 1.1, 1] : 1,
                                                    rotate: selectedEmotion ? [0, 5, -5, 0] : 0,
                                                    opacity: 1
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: 0,
                                                    ease: "easeInOut"
                                                }}
                                                key={selectedEmotion ? selectedEmotion.name : "default"}
                                            >
                                                {selectedEmotion ? selectedEmotion.emoji : "🤔"}
                                            </motion.div>

                                            {/* Cercle décoratif autour de l'emoji */}
                                            <motion.div
                                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border-2 border-dashed border-primary opacity-50"
                                                animate={{
                                                    rotate: 360,
                                                    scale: [1, 1.05, 1]
                                                }}
                                                transition={{
                                                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                                    scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                                                }}
                                            />

                                            {/* Boutons d'émotions disposés en cercle régulier autour de l'emoji */}
                                            {emotions.map((emotion, index) => {
                                                // Calculer la position en cercle autour de l'emoji central
                                                const angle = (index / emotions.length) * Math.PI * 2;
                                                const radius = 180; // Distance du centre

                                                // Calculer les positions x et y
                                                const x = Math.cos(angle) * radius;
                                                const y = Math.sin(angle) * radius;

                                                return (
                                                    <motion.button
                                                        key={index}
                                                        className={`btn btn-outline absolute ${selectedEmotion?.name === emotion.name ? 'btn-primary ring ring-primary ring-offset-2' : ''}`}
                                                        style={{
                                                            left: `calc(43.5% + ${x}px)`,
                                                            top: `calc(50% + ${y}px)`,
                                                            transform: 'translate(-50%, -50%)'
                                                        }}
                                                        onClick={() => {
                                                            setSelectedEmotion(emotion);
                                                            setFormData({
                                                                ...formData,
                                                                tone: emotion.name.toLowerCase()
                                                            });
                                                            setErrors({});
                                                        }}
                                                        whileHover={{ scale: 1.15, boxShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                                                        whileTap={{ scale: 0.95 }}
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        {emotion.name}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        <div className="card-actions justify-center mt-6">
                                            <button
                                                onClick={nextStep}
                                                className="btn btn-primary gap-2"
                                                disabled={!selectedEmotion}
                                            >
                                                Next <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Content Creation */}
                                {step === 2 && (
                                    <div>
                                        <h2 className="card-title text-2xl mb-8 justify-center">What's happened?</h2>

                                        <ul className="list bg-base-100 rounded-box">
                                            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                                                Choose the type of farewell you want to share
                                            </li>

                                            {[
                                                {
                                                    id: 'heartbreak',
                                                    title: 'Heartbreak & Relationships',
                                                    icon: '💔',
                                                    description: 'Saying goodbye to a relationship or romantic partner'
                                                },
                                                {
                                                    id: 'family-friends',
                                                    title: 'Friends & Family',
                                                    icon: '👥',
                                                    description: 'Farewell to loved ones, moving away from family or friends'
                                                },
                                                {
                                                    id: 'career',
                                                    title: 'Career & Work',
                                                    icon: '💼',
                                                    description: 'Leaving a job, project, or workplace you loved'
                                                },
                                                {
                                                    id: 'life-chapter',
                                                    title: 'Life Chapter',
                                                    icon: '📖',
                                                    description: 'Closing a significant chapter in your life'
                                                },
                                                {
                                                    id: 'other',
                                                    title: 'Something Else',
                                                    icon: '✨',
                                                    description: 'Create a custom farewell for another situation'
                                                }
                                            ].map((scenario) => (
                                                <motion.li
                                                    key={scenario.id}
                                                    className={`list-row cursor-pointer hover:bg-base-200 transition-colors ${formData.scenario === scenario.id ? 'bg-primary/5' : ''
                                                        }`}
                                                    onClick={() => setFormData({
                                                        ...formData,
                                                        scenario: scenario.id
                                                    })}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                >
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-box bg-base-200">
                                                        <span className="text-2xl">{scenario.icon}</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{scenario.title}</div>
                                                        <div className="text-xs opacity-60">{scenario.description}</div>
                                                    </div>
                                                    <button
                                                        className={`btn btn-ghost btn-circle ${formData.scenario === scenario.id ? 'text-primary' : ''
                                                            }`}
                                                    >
                                                        {formData.scenario === scenario.id ? (
                                                            <CheckCircle className="w-5 h-5" />
                                                        ) : (
                                                            <ChevronRight className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </motion.li>
                                            ))}
                                        </ul>
                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline gap-2">
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                            <button
                                                onClick={nextStep}
                                                className="btn btn-primary gap-2"
                                                disabled={!formData.scenario}
                                            >
                                                Next <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Preview */}
                                {step === 3 && (
                                    <div>
                                        <div className="flex flex-col items-center mb-8 text-center">
                                            <h2 className="card-title text-2xl justify-center mb-2">Tell Your Story</h2>
                                            <p className="text-base-content/70">This is your moment to express everything you need to say</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Title Your Farewell</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="Give your farewell a meaningful title..."
                                                    className="input input-bordered w-full focus:border-primary"
                                                />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text font-medium">Your Story</span>
                                                    <span className="label-text-alt">
                                                        Express yourself freely
                                                    </span>
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Share your story... What happened? How do you feel? What would you like to say?"
                                                    className="textarea textarea-bordered h-40 focus:border-primary w-full mb-2"
                                                    style={{ minHeight: "200px" }}
                                                ></textarea>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {["💭 Thoughts", "💝 Feelings", "🌟 Wishes", "🙏 Gratitude", "✨ Hope"].map((tag) => (
                                                        <button
                                                            key={tag}
                                                            className="btn btn-sm btn-outline hover:btn-primary"
                                                            onClick={() => {
                                                                const newMessage = formData.message + (formData.message ? "\n\n" : "") + `${tag}:\n`;
                                                                setFormData({ ...formData, message: newMessage });
                                                            }}
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="divider">Add Memories</div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Photos & Images</span>
                                                        <span className="label-text-alt text-primary">Optional</span>
                                                    </label>
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="file"
                                                            className="file-input file-input-bordered w-full"
                                                            accept="image/*"
                                                            multiple
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Set the Mood</span>
                                                        <span className="label-text-alt text-primary">Optional</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        className="file-input file-input-bordered w-full"
                                                        accept="audio/*"
                                                    />
                                                    <label className="label">
                                                        <span className="label-text-alt">Add background music to enhance your story</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="divider">Enhance Your Story</div>

                                            <div className="flex flex-wrap gap-4 justify-center">
                                                <label className="label cursor-pointer gap-2 hover:bg-base-200 p-2 rounded-lg">
                                                    <input type="checkbox" name="includeGifs" checked={formData.includeGifs} onChange={handleChange} className="checkbox checkbox-primary" />
                                                    <span className="label-text">Include GIFs</span>
                                                </label>
                                                <label className="label cursor-pointer gap-2 hover:bg-base-200 p-2 rounded-lg">
                                                    <input type="checkbox" name="includeSounds" checked={formData.includeSounds} onChange={handleChange} className="checkbox checkbox-primary" />
                                                    <span className="label-text">Add Sound Effects</span>
                                                </label>
                                                <label className="label cursor-pointer gap-2 hover:bg-base-200 p-2 rounded-lg">
                                                    <input type="checkbox" name="includeAnimations" checked={formData.includeAnimations} onChange={handleChange} className="checkbox checkbox-primary" />
                                                    <span className="label-text">Enable Animations</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline gap-2">
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                            <div className="flex gap-2">
                                                <button onClick={() => setStep(4)} className="btn btn-ghost gap-2">
                                                    Skip <ChevronRight className="w-4 h-4" />
                                                </button>
                                                <button onClick={nextStep} className="btn btn-primary gap-2">
                                                    Preview <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Set Tone */}
                                {step === 4 && (
                                    <div>
                                        <div className="flex flex-col items-center mb-8 text-center">
                                            <h2 className="card-title text-2xl justify-center mb-2">Set the Tone</h2>
                                            <p className="text-base-content/70">Choose how you want your farewell to sound</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                            {toneOptions.map((tone) => (
                                                <motion.div
                                                    key={tone.value}
                                                    className={`card cursor-pointer hover:shadow-lg transition-all ${formData.tone === tone.value ? 'bg-primary/10 border-2 border-primary' : 'bg-base-200'
                                                        }`}
                                                    onClick={() => setFormData({ ...formData, tone: tone.value })}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="card-body flex-row items-center gap-4">
                                                        <span className="text-3xl">{tone.icon}</span>
                                                        <div>
                                                            <h3 className="font-medium">{tone.label}</h3>
                                                        </div>
                                                        {formData.tone === tone.value && (
                                                            <div className="ml-auto">
                                                                <Check className="w-5 h-5 text-primary" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="divider mb-8">Preview Your Settings</div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="card bg-base-200">
                                                <div className="card-body">
                                                    <h3 className="card-title text-lg">Page Details</h3>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex justify-between">
                                                            <span className="opacity-70">Title:</span>
                                                            <span className="font-medium">{formData.title}</span>
                                                        </li>
                                                        <li className="flex justify-between">
                                                            <span className="opacity-70">Tone:</span>
                                                            <span className="font-medium capitalize">{formData.tone || 'Not set'}</span>
                                                        </li>
                                                        <li className="flex justify-between">
                                                            <span className="opacity-70">Message Length:</span>
                                                            <span className="font-medium">{formData.message.length} characters</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="card bg-base-200">
                                                <div className="card-body">
                                                    <h3 className="card-title text-lg">Enhanced Features</h3>
                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        {formData.images.map((img, idx) => (
                                                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                                                                <img
                                                                    src={img}
                                                                    alt={`Preview ${idx + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="divider my-2"></div>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-center gap-2">
                                                            <Check className={`w-4 h-4 ${formData.includeGifs ? 'text-primary' : 'opacity-30'}`} />
                                                            <span className={formData.includeGifs ? '' : 'opacity-50'}>GIFs</span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Check className={`w-4 h-4 ${formData.includeSounds ? 'text-primary' : 'opacity-30'}`} />
                                                            <span className={formData.includeSounds ? '' : 'opacity-50'}>Sound Effects</span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Check className={`w-4 h-4 ${formData.includeAnimations ? 'text-primary' : 'opacity-30'}`} />
                                                            <span className={formData.includeAnimations ? '' : 'opacity-50'}>Animations</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline gap-2">
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="btn btn-primary gap-2"
                                                disabled={!formData.tone}
                                            >
                                                Create Page <Check className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
