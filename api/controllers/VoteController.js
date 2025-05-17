const Vote = require('../models/Vote');
const ReponsePrompt = require('../models/ReponsePrompt');

const createVote = async (req, res) => {
  const { reponseId, valeur = 1 } = req.body;

  if (!reponseId || ![-1, 0, 1].includes(valeur)) {
    return res.status(400).json({ message: 'reponseId et valeur (-1, 0, 1) sont requis.' });
  }

  try {
    const rep = await ReponsePrompt.findByPk(reponseId);
    if (!rep) {
      return res.status(404).json({ message: 'Réponse non trouvée.' });
    }

    const vote = await Vote.create({ reponseId, valeur });
    return res.status(201).json({ message: 'Vote enregistré.', vote });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

const getAllVotes = async (_req, res) => {
  try {
    const votes = await Vote.findAll({ include: ReponsePrompt });
    return res.json(votes);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

const getVoteById = async (req, res) => {
  try {
    const vote = await Vote.findByPk(req.params.id, { include: ReponsePrompt });
    if (!vote) {
      return res.status(404).json({ message: 'Vote non trouvé.' });
    }
    return res.json(vote);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

const deleteVote = async (req, res) => {
  try {
    const vote = await Vote.findByPk(req.params.id);
    if (!vote) {
      return res.status(404).json({ message: 'Vote non trouvé.' });
    }
    await vote.destroy();
    return res.json({ message: 'Vote supprimé.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

const countForReponse = async (req, res) => {
  try {
    const total = await Vote.sum('valeur', { where: { reponseId: req.params.id } });
    return res.json({ reponseId: req.params.id, total: total || 0 });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

module.exports = {
  createVote,
  getAllVotes,
  getVoteById,
  deleteVote,
  countForReponse
};
