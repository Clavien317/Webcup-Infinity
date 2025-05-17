const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Connecté à MySQL avec Sequelize !'))
    .catch(err => console.error('Erreur de connexion :', err));

module.exports = sequelize;
