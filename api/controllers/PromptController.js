const Prompt = require("../models/Prompt");

const generation = async (req, res) => {
    const { reaction, cas, ton, message, nouveaudepart, idUser } = req.body;

    if (!reaction || !cas || !ton || !nouveaudepart || !idUser) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    try {
        const prompt = await Prompt.create({ reaction,cas,ton,message,nouveaudepart,idUser });

        res.status(201).json({ message: "Prompt créé avec succès", prompt });
    } catch (error) {
        console.error("Erreur de création :", error);
        res.status(500).json({ message: "Erreur lors de la création du prompt." });
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
        res.status(500).json({ message: "Erreur lors de la modification du prompt." });
    }
};


module.exports = {
    generation,
    modifiGeneration
};

