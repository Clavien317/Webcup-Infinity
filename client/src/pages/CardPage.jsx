/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Share2, Volume2, VolumeX, Play, Pause, Music2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cardData, setCardData] = useState(location.state?.cardData);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        setCardData({
            title: "My Farewell Journey",
            tone: "peaceful",
            scenario: "life-chapter",
            message: "This is a sample farewell message",
            images: [
                '/src/assets/2578.jpg', '/src/assets/sary1.jpg', '/src/assets/sary2.jpg'
            ],
            generated: {
                intro: "Starting a new chapter in life...",
                body: "This is a sample farewell message",
                conclusion: "Looking forward to what lies ahead",
                quotes: ["Life is about the journey, not the destination"]
            }
        });
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    // Function to toggle audio playback
    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Audio playback failed:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setAudioProgress(progress);
        }
    };

    const renderPage = () => {
        if (!cardData?.generated) return null;

        const { title, tone, scenario, message, generated, images = [] } = cardData;

        return (
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <motion.div 
                        className="text-center mb-8"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <h1 className="text-5xl font-bold mb-2">{title}</h1>
                        <p className="text-xl opacity-80">{generated.intro}</p>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8 h-[70vh]">
                        {/* Left Column */}
                        <div className="col-span-4 flex flex-col gap-6">
                            {/* Meta Info Card */}
                            <div className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">Journey Details</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="opacity-70">Emotion</span>
                                            <span className="badge badge-primary">{tone}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="opacity-70">Type</span>
                                            <span className="badge badge-secondary">{scenario}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {images.slice(0, 4).map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <figure className="aspect-square">
                                            <img
                                                src={img}
                                                alt={`Memory ${idx + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </figure>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="col-span-8 card bg-base-100 shadow-xl overflow-hidden">
                            <div className="card-body prose prose-lg max-w-none">
                                <div className="whitespace-pre-wrap mb-8">{message}</div>
                                <blockquote className="not-italic border-l-4 border-primary p-4 bg-base-200 rounded">
                                    {generated.quotes[0]}
                                </blockquote>
                                <p className="text-lg opacity-80 mt-8">{generated.conclusion}</p>
                            </div>
                        </div>
                    </div>

                    {/* Music Player */}
                    <div className="fixed bottom-0 left-0 right-0 bg-base-300/80 backdrop-blur">
                        <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
                            <button 
                                className="btn btn-circle btn-primary"
                                onClick={toggleAudio}
                            >
                                {isPlaying ? <Pause /> : <Play />}
                            </button>
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <Music2 className="w-4 h-4" />
                                    <span className="text-sm">Farewell Theme</span>
                                </div>
                                <progress 
                                    className="progress progress-primary w-full" 
                                    value={audioProgress} 
                                    max="100"
                                />
                            </div>
                            <button 
                                className="btn btn-circle btn-ghost"
                                onClick={() => setIsMuted(!isMuted)}
                            >
                                {isMuted ? <VolumeX /> : <Volume2 />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return renderPage();
}