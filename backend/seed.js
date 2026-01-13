require("dotenv").config();
const database = require("./database/client");

// Création de données pour tests
const seedData = async () => {
  try {
    const fenetres = [
      { type: "Battant", largeur: 80, hauteur: 120, prix: 250.00 },
      { type: "Coulissant", largeur: 140, hauteur: 120, prix: 380.00 },
      { type: "Oscillo-battant", largeur: 100, hauteur: 140, prix: 320.00 },
      { type: "Fixe", largeur: 60, hauteur: 80, prix: 150.00 },
      { type: "Battant", largeur: 120, hauteur: 140, prix: 420.00 },
      { type: "Coulissant", largeur: 200, hauteur: 140, prix: 580.00 },
      { type: "Oscillo-battant", largeur: 80, hauteur: 100, prix: 280.00 },
      { type: "Fixe", largeur: 100, hauteur: 60, prix: 180.00 }
    ];

    for (const fenetre of fenetres) {
      await database.run(
        "INSERT INTO fenetres (type, largeur, hauteur, prix) VALUES (?, ?, ?, ?)",
        [fenetre.type, fenetre.largeur, fenetre.hauteur, fenetre.prix]
      );
    }

    console.log("Données de test insérées avec succès");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
  } finally {
    process.exit();
  }
};

seedData();
