require("dotenv").config();
const database = require("./database/client");

const createTables = async () => {
  try {
    await database.query(`
      CREATE TABLE IF NOT EXISTS fenetres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        largeur DECIMAL(5,2) NOT NULL,
        hauteur DECIMAL(5,2) NOT NULL,
        prix DECIMAL(8,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
