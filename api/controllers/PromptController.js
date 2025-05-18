const Prompt = require("../models/Prompt");
require("dotenv").config();
const { ChatMistralAI } = require("@langchain/mistralai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { RunnableSequence } = require("@langchain/core/runnables");

const generation = async (req, res) => {
  
  const { title, scenario, tone, message, idUser, includeGifs } = req.body|| {};
  
  const background = req.files?.background?.[0]?.filename ?? null;
  const image      = req.files?.image?.[0]?.filename      ?? null;

  // Vérification de tous les champs obligatoires (ajout message)
  if (!scenario || !tone || !message) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs obligatoires." });
  }

  const prompts = PromptTemplate.fromTemplate(`
    Tu es un expert en communication émotionnelle.
    
    Ta tâche est de rédiger un message clair, direct et percutant dont l’objectif est de mettre fin à une situation, une relation ou un engagement.
    
    - Utilise un ton très {ton}.
    - Prends en compte le contexte suivant de l'utilisateur a envoyé : {cas}
    - Intègre subtilement le point de vue de l’utilisateur exprimé ici (si il y'en a) : {message}
    - La réponse doit être uniquement le message généré, sans aucun mot ou caractère supplémentaire avant ou après, ni aucune variable.
    
    Ne retourne que le texte final, sans cadre ni explication.
    enleve les: Chère [Nom], [Votre Nom]
    `);

  try {
    // Création en base
    const prompt = await Prompt.create({
      reaction:title,
      cas:scenario,
      ton:tone,
      message,
      idUser: Number(idUser)||2,
      includegifs:includeGifs,
      background,
      image
    });

    return res.status(201).json({
      idUser,
    });

    // Configuration de l'IA
    const chat = new ChatMistralAI({
      model: "mistral-large-latest",
      temperature: 0,
      apiKey: process.env.MISTRAL_AI_API_KEY,
    });

    // Création de la chaîne (prompt puis IA)
    const chain = RunnableSequence.from([prompts, chat]);

    // Appel asynchrone et récupération de la réponse
    const responseAI = await chain.invoke({ phrase: message });

    // Log (optionnel)
    console.log("Réponse IA:", responseAI);

    // Réponse HTTP avec succès
    res.status(201).json({
      message: "Prompt créé avec succès",
      prompt,
    });
  } catch (error) {
    console.error("Erreur de création :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la création du prompt." });
  }
};

const modifiGeneration = async (req, res) => {
  const { id } = req.params;
  const { reaction, cas, ton, message, nouveaudepart, idUser } = req.body;

  try {
    const prompt = await Prompt.findByPk(id);
    if (!prompt) {
      return res.status(404).json({ message: "Prompt non trouvé." });
    }

    prompt.reaction = reaction || prompt.reaction;
    prompt.cas = cas || prompt.cas;
    prompt.ton = ton || prompt.ton;
    prompt.message = message || prompt.message;
    prompt.nouveaudepart = nouveaudepart || prompt.nouveaudepart;
    prompt.idUser = idUser || prompt.idUser;

    await prompt.save();

    res.json({ message: "Prompt modifié avec succès", prompt });
  } catch (error) {
    console.error("Erreur de modification :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du prompt." });
  }
};

module.exports = {
  generation,
  modifiGeneration,
};
