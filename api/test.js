const { ChatMistralAI } = require("@langchain/mistralai");
require("dotenv").config();
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

const prompt = PromptTemplate.fromTemplate(`
    Tu es un expert en communication émotionnelle.
    
    Ta tâche est de rédiger un message clair, direct et percutant dont l’objectif est de mettre fin à une situation, une relation ou un engagement.
    
    - Utilise un ton très {ton}.
    - Prends en compte le contexte suivant de l'utilisateur a envoyé : {cas}
    - Intègre subtilement le point de vue de l’utilisateur exprimé ici (si il y'en a) : {message}
    - La réponse doit être uniquement le message généré, sans aucun mot ou caractère supplémentaire avant ou après, ni aucune variable.
    
    Ne retourne que le texte final, sans cadre ni explication.
    enleve les: Chère [Nom], [Votre Nom]
    
  `);

// Formater le prompt avec une valeur

const chat = new ChatMistralAI({
  model: "mistral-large-latest", // "open-mistral-7b",
  temperature: 0,
  apiKey: process.env.MISTRAL_AI_API_KEY,
});

const chain = RunnableSequence.from([prompt, chat]);

async function run() {
  const res = await chain.invoke({
    ton: "Nostalgique",
    cas: "J'ai rompu avec mon ex",
    message:
      "Je suis heureux de ne plus être avec lui et je veux trouver une autre personne",
  });
  console.log(res);
}

run();
