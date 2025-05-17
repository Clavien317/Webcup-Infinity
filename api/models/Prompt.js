const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./Users'); // importer le modèle User

const Prompt = sequelize.define('Prompt', {
    reaction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ton: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cas: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

    includegifs: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'prompts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Prompt.belongsTo(User, { foreignKey: 'idUser' }); // association
User.hasMany(Prompt, { foreignKey: 'idUser' });   // inverse association

module.exports = Prompt;
