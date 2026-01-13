require("dotenv").config();

// Initialisation de la base de données
const database = require("./database/client");

// Fonction qui crée les tables
const createTables = async () => {
  try {
    await database.run(`
      CREATE TABLE IF NOT EXISTS fenetres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        largeur REAL NOT NULL,
        hauteur REAL NOT NULL,
        prix REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Tables créées avec succès");
  } catch (error) {
    console.error("Erreur lors de la création des tables:", error);
  } finally {
    process.exit();
  }
};

createTables();
