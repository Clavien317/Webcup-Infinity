require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const GenRoutes = require('./routes/prompt');
const ReponseRoutes = require('./routes/reponse');
const voteRoutes = require('./routes/vote');


app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/generation', GenRoutes);
app.use('/api/reponses', ReponseRoutes)
app.use('/api/votes', voteRoutes);


app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
