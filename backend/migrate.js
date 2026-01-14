require("dotenv").config();

// Initialisation de la base de données
const database = require("./database/client");

// Fonction qui crée les tables
const createTables = async () => {
  try {
    // Création de la table users
    await database.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prenom TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Vérifier si la colonne user_id existe déjà dans fenetres
    const [columns] = await database.query("PRAGMA table_info(fenetres)");
    const hasUserId = columns.some(col => col.name === 'user_id');

    if (!hasUserId) {
      // Ajouter la colonne user_id à la table fenetres existante
      await database.run(`
        ALTER TABLE fenetres ADD COLUMN user_id INTEGER REFERENCES users(id)
      `);
    }

    // Créer un index sur user_id pour optimiser les requêtes
    await database.run(`
      CREATE INDEX IF NOT EXISTS idx_fenetres_user_id ON fenetres(user_id)
    `);

    console.log("Tables créées avec succès");
    console.log("- Table users créée");
    console.log("- Colonne user_id ajoutée à fenetres");
    console.log("- Index sur user_id créé");
  } catch (error) {
    console.error("Erreur lors de la création des tables:", error);
  } finally {
    process.exit();
  }
};

createTables();
