const ReponsePrompt = require('../models/ReponsePrompt');
const Prompt = require('../models/Prompt');


const createReponse = async (req, res) => {
    const { reponse, idPrompt } = req.body;

    if (!reponse || !idPrompt) {
        return res.status(400).json({ message: 'reponse et idPrompt sont requis.' });
    }

    try {
        // Vérifie que le prompt existe
        const prompt = await Prompt.findByPk(idPrompt);
        if (!prompt) {
            return res.status(404).json({ message: 'Prompt inexistant.' });
        }

        const nouvelleReponse = await ReponsePrompt.create({ reponse, idPrompt });
        res.status(201).json({ message: 'Réponse créée avec succès.', reponse: nouvelleReponse });
    } catch (error) {
        console.error('Erreur création réponse :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};


const getAllReponses = async (req, res) => {
    try {
        const where = req.query.prompt ? { idPrompt: req.query.prompt } : {};
        const reponses = await ReponsePrompt.findAll({ where, include: Prompt });
        res.json(reponses);
    } catch (error) {
        console.error('Erreur lecture réponses :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};


const getReponseById = async (req, res) => {
    try {
        const rep = await ReponsePrompt.findByPk(req.params.id, { include: Prompt });
        if (!rep) return res.status(404).json({ message: 'Réponse non trouvée.' });
        res.json(rep);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = {
    createReponse,
    getAllReponses,
    getReponseById,
};
