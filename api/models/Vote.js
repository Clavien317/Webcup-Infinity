// models/Vote.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const ReponsePrompt = require('./ReponsePrompt');

const Vote = sequelize.define(
  'Vote',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reponseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'reponse_id',
      references: {
        model: 'reponses_prompts',
        key: 'id'
      }
    },
    valeur: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    tableName: 'votes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Vote.belongsTo(ReponsePrompt,  { foreignKey: 'reponseId' });
ReponsePrompt.hasMany(Vote,    { foreignKey: 'reponseId' });

module.exports = Vote;
