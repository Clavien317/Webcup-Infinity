/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useState } from "react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import ScenarioSelector from "../components/ScenarioSelector.jsx";

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
    { name: "Accepting", emoji: "🫂", color: "text-secondary" }
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

export default function CreatePage() {
    const [step, setStep] = useState(1);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [formData, setFormData] = useState({
        title: "My Farewell Page",
        tone: "",
        message: "",
        includeGifs: false,
        includeSounds: false,
        includeAnimations: false,
        whatHappened: "",
        reason: "",
        lastWords: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, like sending data to a server
        console.log("Form submitted:", formData);
        // For demo purposes, just go to the next step
        nextStep();
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 pb-10 bg-base-200">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Create Your <span className="text-primary">TheEnd</span> Page
                    </h1>

                    <div className="max-w-3xl mx-auto">
                        <ul className="steps steps-horizontal w-full mb-10">
                            <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Style</li>
                            <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Content</li>
                            <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Preview</li>
                            <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Publish</li>
                        </ul>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                {step === 1 && (
                                    <div>
                                        <h2 className="card-title text-2xl mb-8 justify-center">How do you feel?</h2>
                                        
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
                                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border-2 border-dashed border-secondary opacity-50"
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
                                                        className={`btn btn-outline absolute ${selectedEmotion?.name === emotion.name ? 'border-secondary' : ''}`}
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
                                                        }}
                                                        whileHover={{ scale: 1.15}}
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
                                        
                                        <div className="card-actions justify-end mt-6">
                                            <button 
                                                onClick={nextStep} 
                                                className="btn bg-secondary"
                                                disabled={!selectedEmotion}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div>
                                        <h2 className="card-title mb-6">Create Your Content</h2>
                                        
                                        {/* Scenario Selection Section */}
                                        <div className="bg-base-200 p-6 rounded-lg mb-6 border-l-4 border-pink-400">
                                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                <span className="text-pink-400">What's Your Story?</span>
                                                <motion.div
                                                    animate={{ rotate: [0, 10, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    🔍
                                                </motion.div>
                                            </h3>
                                            
                                            <div className="grid gap-4">
                                                {{
                                                    'project': 'A project has ended',
                                                    'relationship': 'A relationship is over',
                                                    'job': 'Left a job or position',
                                                    'chapter': 'Closing a chapter in life',
                                                    'digital': 'Digital detox/leaving social media',
                                                    'other': 'Something else entirely'
                                                }[formData.whatHappened]}
                                            </div>
                                        </div>

                                        {/* Additional Details Section */}
                                        {formData.whatHappened && (
                                            <motion.div 
                                                className="space-y-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Why is this ending significant?</span>
                                                    </label>
                                                    <textarea
                                                        name="reason"
                                                        value={formData.reason}
                                                        onChange={handleChange}
                                                        placeholder="This matters because..."
                                                        className="textarea textarea-bordered h-20"
                                                    ></textarea>
                                                </div>
                                                
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Your parting message</span>
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        placeholder="Write your farewell message here..."
                                                        className="textarea textarea-bordered h-40"
                                                    ></textarea>
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text font-medium">Final words (optional)</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastWords"
                                                        value={formData.lastWords}
                                                        onChange={handleChange}
                                                        placeholder="A memorable last line..."
                                                        className="input input-bordered"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                        
                                        <div className="alert alert-info shadow-lg mt-6">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <div>
                                                    <span className="font-bold">Remember:</span> Your TheEnd page will only be available for 24 hours - make it count!
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline">
                                                Back
                                            </button>
                                            <button 
                                                onClick={nextStep} 
                                                className="btn btn-secondary"
                                                disabled={!formData.whatHappened || !formData.message}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div>
                                        <h2 className="card-title mb-6">Preview Your Page</h2>
                                        <div className="bg-base-200 p-6 rounded-lg mb-6">
                                            <h3 className="text-2xl font-bold mb-4">{formData.title}</h3>
                                            
                                            {formData.whatHappened && (
                                                <div className="mb-4 p-3 bg-base-300 rounded-md">
                                                    <p className="text-sm font-medium text-pink-400 mb-1">What happened:</p>
                                                    <p className="mb-2">{{
                                                        'project': 'A project has ended',
                                                        'relationship': 'A relationship is over',
                                                        'job': 'Left a job or position',
                                                        'chapter': 'Closing a chapter in life',
                                                        'digital': 'Digital detox/leaving social media',
                                                        'other': 'Something else entirely'
                                                    }[formData.whatHappened]}</p>
                                                    
                                                    {formData.reason && (
                                                        <p className="text-sm italic">Why: {formData.reason}</p>
                                                    )}
                                                    
                                                    {formData.lastWords && (
                                                        <p className="text-sm font-semibold mt-2">Final words: "{formData.lastWords}"</p>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <p className="whitespace-pre-line mb-4">{formData.message || "No message provided."}</p>
                                            
                                            <div className="text-sm text-gray-500">
                                                <p className="flex items-center gap-2">
                                                    Emotion: {selectedEmotion ? (
                                                        <>
                                                            <span>{selectedEmotion.emoji}</span> 
                                                            <span>{selectedEmotion.name}</span>
                                                        </>
                                                    ) : "Not specified"}
                                                </p>
                                                <p>
                                                    Features: 
                                                    {formData.includeGifs ? " GIFs" : ""}
                                                    {formData.includeSounds ? " Sounds" : ""}
                                                    {formData.includeAnimations ? " Animations" : ""}
                                                    {!formData.includeGifs && !formData.includeSounds && !formData.includeAnimations && " None"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline">
                                                Back
                                            </button>
                                            <button onClick={handleSubmit} className="btn btn-secondary">
                                                Publish
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="text-center">
                                        <h2 className="card-title text-2xl mb-6 justify-center">Your Page is Published!</h2>
                                        <div className="mb-8">
                                            <div className="alert alert-success mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Your farewell page has been created successfully!</span>
                                            </div>
                                            <p className="mb-4">Share your page with this unique URL:</p>
                                            <div className="flex justify-center">
                                                <div className="join">
                                                    <input 
                                                        className="input input-bordered join-item" 
                                                        readOnly 
                                                        value={`https://theend.page/${formData.title.toLowerCase().replace(/\s+/g, '-')}`} 
                                                    />
                                                    <button className="btn join-item">Copy</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-actions justify-center">
                                            <button className="btn btn-secondary">View Your Page</button>
                                            <button className="btn btn-outline">Create Another</button>
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
