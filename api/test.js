const { ChatMistralAI } = require("@langchain/mistralai");
require("dotenv").config();
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

const component = `<div className="min-h-screen">
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
`;

const prompt = PromptTemplate.fromTemplate(`
  Tu es un développeur senior, expert en React et Tailwind CSS.
  
  Voici un composant React de référence :
  {component}
  
  Ta mission :
  - Génère un nouveau composant React inspiré de celui-ci, mais avec un design plus moderne, épuré et élégant.
  - Utilise les meilleures pratiques en React et Tailwind.
  - Le code doit être bien structuré et visuellement attractif.
  
  Important :
  - Ne retourne que le code JSX complet du nouveau composant (aucune explication ni commentaire).
  - N'inclus que le JSX, sans importation ou exportation, sauf si nécessaire.
  - Ne mets aucun texte ou phrase autour.
  `);

// Formater le prompt avec une valeur

const chat = new ChatMistralAI({
  model: "codestral-latest", // "open-mistral-7b",
  temperature: 0,
  apiKey: process.env.MISTRAL_AI_API_KEY,
});

const chain = RunnableSequence.from([prompt, chat]);

async function run() {
  const res = await chain.invoke({
    component: component,
  });
  console.log(res);
}

run();
