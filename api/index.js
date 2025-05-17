const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("test get");
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}...`);
});
