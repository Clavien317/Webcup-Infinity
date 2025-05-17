// models/Vote.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Prompt = require('./Prompt');

const Vote = sequelize.define('Vote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    tableName: 'votes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Vote.belongsTo(Prompt, { foreignKey: 'idPrompt' });
Prompt.hasMany(Vote, { foreignKey: 'idPrompt' });

module.exports = Vote;
