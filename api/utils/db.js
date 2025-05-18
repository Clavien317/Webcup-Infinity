const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('infinity_tp', 'infinity_admin', 'Clavien2025#', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Connecté à MySQL avec Sequelize !'))
    .catch(err => console.error('Erreur de connexion :', err));

module.exports = sequelize;
