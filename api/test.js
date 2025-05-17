const { ChatMistralAI } = require("@langchain/mistralai");
require("dotenv").config();
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

const prompt =
  PromptTemplate.fromTemplate(`devine la langue et donne le reponse  en JSON.

phrase : {phrase}

Réponse (au format JSON, sans texte autour) :
{{
  "language": "string"
}}`);

// Formater le prompt avec une valeur

const chat = new ChatMistralAI({
  model: "open-mistral-7b",
  temperature: 0,
  apiKey: process.env.MISTRAL_AI_API_KEY,
});

const chain = RunnableSequence.from([prompt, chat]);

async function run() {
  const res = await chain.invoke({ phrase: "hola" });
  console.log(res);
}

run();
