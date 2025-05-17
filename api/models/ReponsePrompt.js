// models/ReponsePrompt.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Prompt = require('./Prompt');

const ReponsePrompt = sequelize.define('ReponsePrompt', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reponse: {
        type: DataTypes.JSON,
        allowNull: false
    },
    idPrompt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'prompts',
            key: 'id'
        }
    }
}, {
    tableName: 'reponses_prompts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

ReponsePrompt.belongsTo(Prompt, { foreignKey: 'idPrompt' });
Prompt.hasMany(ReponsePrompt, { foreignKey: 'idPrompt' });

module.exports = ReponsePrompt;
