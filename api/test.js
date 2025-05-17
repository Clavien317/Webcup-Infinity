const { ChatMistralAI } = require("@langchain/mistralai");
require("dotenv").config();

const chat = new ChatMistralAI({
  model: "open-mistral-7b", // ou mistral-tiny, mistral-medium (si payant)
  temperature: 0,
  apiKey: process.env.MISTRAL_AI_API_KEY,
});

async function run() {
  const res = await chat.invoke([
    { role: "user", content: "Bonjour, comment vas-tu ?" },
  ]);
  console.log(res);
}

run();

// const { MistralAI } = require("@langchain/mistralai");
// const { PromptTemplate } = require("@langchain/core/prompts");
// // const { LLMChain } = require("@langchain/core/");
// require("dotenv").config();

// const model = new MistralAI({
//   model: "mistral-small",
//   temperature: 0,
//   apiKey: process.env.MISTRAL_AI_API_KEY,
// });

// const prompt = new PromptTemplate({
//   inputVariables: ["input"],
//   template: "Réponds à ce message : {input}",
// });

// // const chain = new LLMChain({ llm: model, prompt });

// async function run() {
//   const response = prompt.pipe(model).invoke({ input: "bonjour" });
//   //   const response = await chain.call({ input: "bonjour" });
//   console.log(response.text);
// }

// run();
