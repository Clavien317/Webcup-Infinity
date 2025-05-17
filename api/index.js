require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
