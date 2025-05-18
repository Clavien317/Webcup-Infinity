const Prompt = require("../models/Prompt");

const generation = async (req, res) => {
  const { reaction, cas, ton, message, nouveaudepart, idUser } = req.body;

  // Vérification de tous les champs obligatoires (ajout message)
  if (!reaction || !cas || !ton || !message || !nouveaudepart || !idUser) {
    return res
      .status(400)
      .json({ message: "Veuillez remplir tous les champs obligatoires." });
  }

  const prompts =
    PromptTemplate.fromTemplate(`devine la langue et donne la réponse en JSON.
    phrase : {phrase}
    Réponse (au format JSON, sans texte autour) :
    {
    "language": "string"
    }`);

  try {
    // Création en base
    const prompt = await Prompt.create({
      reaction,
      cas,
      ton,
      message,
      nouveaudepart,
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
