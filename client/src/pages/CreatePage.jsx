/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "motion/react";
import { Clock, AlertTriangle, Check, X, ChevronRight, ChevronLeft, Share2, Eye } from "lucide-react";

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
    { value: "dramatic", label: "Dramatic" },
    { value: "ironic", label: "Ironic" },
    { value: "ultra-cringe", label: "Ultra Cringe" },
    { value: "classy", label: "Classy" },
    { value: "touching", label: "Touching" },
    { value: "absurd", label: "Absurd" },
    { value: "passive-aggressive", label: "Passive-Aggressive" },
    { value: "honest", label: "Honest" }
];

// Step definitions with validation rules
const steps = [
    { 
        id: 1, 
        isValid: (formData, selectedEmotion) => selectedEmotion !== null
    },
    { 
        id: 2, 
        isValid: (formData) => formData.message.length > 0
    },
    { 
        id: 3, 
        isValid: () => true
    },
    { 
        id: 4, 
        isValid: () => true
    }
];

export default function CreatePage() {
    const [step, setStep] = useState(1);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [formData, setFormData] = useState({
        title: "My Farewell Page",
        title: "My Farewell Page",
        tone: "",
        message: "",
        includeGifs: false,
        includeSounds: false,
        includeAnimations: false
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, like sending data to a server
        console.log("Form submitted:", formData);
        // For demo purposes, just go to the next step
        nextStep();
    };

    // Format time remaining
    const formatTimeLeft = () => {
        const hours = Math.floor(timeLeft / 60);
        const minutes = timeLeft % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 pb-10 bg-base-200">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-6">
                        Create Your <span className="text-primary">TheEnd</span> Page
                    </h1>
                    
                    {/* Time remaining indicator */}
                    <div className="flex justify-center items-center mb-6 text-primary">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="font-mono">{formatTimeLeft()} remaining</span>
                    </div>

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
                                        <div className="flex flex-col items-center mt-2">
                                            <span>{s.icon}</span>
                                            <span>{s.name}</span>
                                            {step === s.id && (
                                                <span className="text-xs text-primary mt-1">{s.description}</span>
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
                                        <h2 className="card-title mb-6">Create Your Content</h2>
                                        
                                        {errors.message && (
                                            <div className="alert alert-error mb-4 flex items-center">
                                                <AlertTriangle className="w-5 h-5" />
                                                <span>{errors.message}</span>
                                            </div>
                                        )}
                                        
                                        <div className="form-control mb-4">
                                            <label className="label">
                                                <span className="label-text">Your Message</span>
                                                <span className="label-text-alt text-primary">
                                                    {formData.message.length} / 500 characters
                                                </span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Write your farewell message here..."
                                                className="textarea textarea-bordered h-40"
                                                maxLength={500}
                                            ></textarea>
                                            <label className="label">
                                                <span className="label-text-alt">
                                                    {selectedEmotion && (
                                                        <span className="flex items-center gap-1">
                                                            Writing in <span className="font-bold">{selectedEmotion.name}</span> tone {selectedEmotion.emoji}
                                                        </span>
                                                    )}
                                                </span>
                                            </label>
                                        </div>
                                        
                                        <div className="divider">Add Extras</div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <div className="form-control">
                                                <label className="label cursor-pointer justify-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="includeGifs"
                                                        checked={formData.includeGifs}
                                                        onChange={handleChange}
                                                        className="checkbox checkbox-primary"
                                                    />
                                                    <span className="label-text">Include GIFs</span>
                                                </label>
                                            </div>
                                            <div className="form-control">
                                                <label className="label cursor-pointer justify-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="includeSounds"
                                                        checked={formData.includeSounds}
                                                        onChange={handleChange}
                                                        className="checkbox checkbox-primary"
                                                    />
                                                    <span className="label-text">Include Sounds</span>
                                                </label>
                                            </div>
                                            <div className="form-control">
                                                <label className="label cursor-pointer justify-start gap-2">
                                                    <input
                                                        type="checkbox"
                                                        name="includeAnimations"
                                                        checked={formData.includeAnimations}
                                                        onChange={handleChange}
                                                        className="checkbox checkbox-primary"
                                                    />
                                                    <span className="label-text">Include Animations</span>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline gap-2">
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                            <button 
                                                onClick={nextStep} 
                                                className="btn btn-primary gap-2"
                                                disabled={!formData.message}
                                            >
                                                Next <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Preview */}
                                {step === 3 && (
                                    <div>
                                        <h2 className="card-title mb-6">Preview Your Page</h2>
                                        
                                        <div className="bg-base-200 p-6 rounded-lg mb-6 relative overflow-hidden">
                                            {/* Preview header with emotion */}
                                            <div className="flex items-center mb-4">
                                                <span className="text-4xl mr-3">{selectedEmotion?.emoji}</span>
                                                <h3 className="text-2xl font-bold">{formData.title}</h3>
                                            </div>
                                            
                                            {/* Message content */}
                                            <div className="mb-6 relative">
                                                <p className="whitespace-pre-line mb-4 text-lg">
                                                    {formData.message || "No message provided."}
                                                </p>
                                                
                                                {/* Animation effect if enabled */}
                                                {formData.includeAnimations && (
                                                    <motion.div 
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                                                        animate={{ x: ['-100%', '100%'] }}
                                                        transition={{ 
                                                            repeat: Infinity, 
                                                            duration: 2,
                                                            ease: "linear"
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            
                                            {/* Features indicators */}
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                                <div className="badge badge-outline">
                                                    {selectedEmotion?.name || "Neutral"} Tone
                                                </div>
                                                {formData.includeGifs && (
                                                    <div className="badge badge-primary">GIFs</div>
                                                )}
                                                {formData.includeSounds && (
                                                    <div className="badge badge-primary">Sounds</div>
                                                )}
                                                {formData.includeAnimations && (
                                                    <div className="badge badge-primary">Animations</div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="alert alert-info mb-6">
                                            <Eye className="w-5 h-5" />
                                            <span>This is how your farewell page will appear to others. Make sure it conveys your message as intended.</span>
                                        </div>
                                        
                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline gap-2">
                                                <ChevronLeft className="w-4 h-4" /> Back
                                            </button>
                                            <button onClick={handleSubmit} className="btn btn-primary gap-2">
                                                Publish <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Published */}
                                {step === 4 && (
                                    <div className="text-center">
                                        <h2 className="card-title text-2xl mb-6 justify-center">Your Page is Published!</h2>
                                        
                                        <div className="mb-8">
                                            <div className="alert alert-success mb-6 justify-center">
                                                <Check className="w-6 h-6" />
                                                <span>Your farewell page has been created successfully!</span>
                                            </div>
                                            
                                            <div className="p-4 border border-primary rounded-lg mb-6">
                                                <p className="mb-4 font-bold">Share your page with this unique URL:</p>
                                                <div className="flex justify-center">
                                                    <div className="join w-full max-w-md">
                                                        <input 
                                                            className="input input-bordered join-item w-full" 
                                                            readOnly 
                                                            value={`https://theend.page/${formData.title.toLowerCase().replace(/\s+/g, '-')}`} 
                                                        />
                                                        <button className="btn join-item btn-primary">
                                                            <Share2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="alert alert-warning mb-6">
                                                <Clock className="w-5 h-5" />
                                                <span>Your page will be available for 24 hours. Make sure to share it before time runs out!</span>
                                            </div>
                                        </div>
                                        
                                        <div className="card-actions justify-center gap-4">
                                            <button className="btn btn-primary gap-2">
                                                <Eye className="w-5 h-5" /> View Your Page
                                            </button>
                                            <button className="btn btn-outline gap-2">
                                                <X className="w-5 h-5" /> Create Another
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
    );}
