import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

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
    const [formData, setFormData] = useState({
        title: "",
        tone: "",
        message: "",
        includeGifs: false,
        includeSounds: false,
        includeAnimations: false
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
                        Create Your <span className="text-pink-500">TheEnd</span> Page
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
                                        <h2 className="card-title mb-6">Choose Your Style</h2>
                                        <div className="form-control mb-4">
                                            <label className="label">
                                                <span className="label-text">Page Title</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="My Farewell Page"
                                                className="input input-bordered"
                                            />
                                        </div>
                                        <div className="form-control mb-4">
                                            <label className="label">
                                                <span className="label-text">Choose Your Tone</span>
                                            </label>
                                            <select
                                                name="tone"
                                                value={formData.tone}
                                                onChange={handleChange}
                                                className="select select-bordered w-full"
                                            >
                                                <option value="" disabled>Select a tone</option>
                                                {toneOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="card-actions justify-end mt-6">
                                            <button onClick={nextStep} className="btn btn-primary">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div>
                                        <h2 className="card-title mb-6">Create Your Content</h2>
                                        <div className="form-control mb-4">
                                            <label className="label">
                                                <span className="label-text">Your Message</span>
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
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Include GIFs</span>
                                                <input
                                                    type="checkbox"
                                                    name="includeGifs"
                                                    checked={formData.includeGifs}
                                                    onChange={handleChange}
                                                    className="checkbox checkbox-primary"
                                                />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Include Sounds</span>
                                                <input
                                                    type="checkbox"
                                                    name="includeSounds"
                                                    checked={formData.includeSounds}
                                                    onChange={handleChange}
                                                    className="checkbox checkbox-primary"
                                                />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer">
                                                <span className="label-text">Include Animations</span>
                                                <input
                                                    type="checkbox"
                                                    name="includeAnimations"
                                                    checked={formData.includeAnimations}
                                                    onChange={handleChange}
                                                    className="checkbox checkbox-primary"
                                                />
                                            </label>
                                        </div>
                                        <div className="card-actions justify-between mt-6">
                                            <button onClick={prevStep} className="btn btn-outline">
                                                Back
                                            </button>
                                            <button onClick={nextStep} className="btn btn-primary">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div>
                                        <h2 className="card-title mb-6">Preview Your Page</h2>
                                        <div className="bg-base-200 p-6 rounded-lg mb-6">
                                            <h3 className="text-2xl font-bold mb-4">{formData.title || "My Farewell Page"}</h3>
                                            <p className="whitespace-pre-line mb-4">{formData.message || "No message provided."}</p>
                                            <div className="text-sm text-gray-500">
                                                <p>Tone: {toneOptions.find(o => o.value === formData.tone)?.label || "Not specified"}</p>
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
                                            <button onClick={handleSubmit} className="btn btn-primary">
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
                                            <button className="btn btn-primary">View Your Page</button>
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
    );
}