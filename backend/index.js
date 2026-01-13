// Dotenv pour les variables
require("dotenv").config();

// Initialisation de l'app
const app = require("./src/app");

// Initialisation du port backend express
const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
