const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const register = async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;

    if (!nom || !email || !mot_de_passe)
        return res.status(400).json({ message: "Tous les champs sont requis." });

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "Email déjà utilisé." });

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const user = await User.create({
            nom,
            email,
            mot_de_passe: hashedPassword
        });

        res.status(201).json({ message: "Utilisateur enregistré avec succès.", user });
    } catch (error) {
        console.error("Erreur register :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const login = async (req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe)
        return res.status(400).json({ message: "Email et mot de passe requis." });

    try {
        const user = await User.findOne({ where: { email } });

        if (!user)
            return res.status(401).json({ message: "Email invalide." });

        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch)
            return res.status(401).json({ message: "Mot de passe invalide." });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || "jwtSecretKey",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Connexion réussie",
            token,
            utilisateur: {
                id: user.id,
                nom: user.nom,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Erreur login :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['mot_de_passe'] } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['mot_de_passe'] } });

        if (!user)
            return res.status(404).json({ message: "Utilisateur non trouvé." });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const updateUser = async (req, res) => {
    try {
        const { nom, email, mot_de_passe } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(404).json({ message: "Utilisateur non trouvé." });

        const updatedData = {
            nom: nom || user.nom,
            email: email || user.email
        };

        if (mot_de_passe)
            updatedData.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);

        await user.update(updatedData);

        res.json({ message: "Utilisateur mis à jour avec succès.", user: updatedData });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user)
            return res.status(404).json({ message: "Utilisateur non trouvé." });

        await user.destroy();

        res.json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
