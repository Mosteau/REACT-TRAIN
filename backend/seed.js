require("dotenv").config();
const database = require("./database/client");
const argon2 = require("argon2");

// Création de données pour tests
const seedData = async () => {
  try {
    // Créer des utilisateurs de test
    const testUsers = [
      { 
        prenom: "Thibaut", 
        email: "thibaut@test.com", 
        password: "Test123!" 
      },
      { 
        prenom: "Mosteau", 
        email: "mosteau@test.com", 
        password: "Test123!" 
      },
      { 
        prenom: "client", 
        email: "client@test.com", 
        password: "Test123!" 
      }
    ];

    console.log("Création des utilisateurs de test...");
    const userIds = [];
    
    for (const user of testUsers) {
      // Hacher le mot de passe
      const hashedPassword = await argon2.hash(user.password);
      
      const result = await database.run(
        "INSERT INTO users (prenom, email, password) VALUES (?, ?, ?)",
        [user.prenom, user.email, hashedPassword]
      );
      
      userIds.push(result.insertId);
      console.log(`- Utilisateur ${user.prenom} créé (ID: ${result.insertId})`);
    }

    // Créer des fenêtres associées aux utilisateurs
    const fenetres = [
      // Fenêtres pour Jean (user_id: 1)
      { type: "Battant", largeur: 80, hauteur: 120, prix: 250.00, user_id: userIds[0] },
      { type: "Coulissant", largeur: 140, hauteur: 120, prix: 380.00, user_id: userIds[0] },
      { type: "Oscillo-battant", largeur: 100, hauteur: 140, prix: 320.00, user_id: userIds[0] },
      
      // Fenêtres pour Marie (user_id: 2)
      { type: "Fixe", largeur: 60, hauteur: 80, prix: 150.00, user_id: userIds[1] },
      { type: "Battant", largeur: 120, hauteur: 140, prix: 420.00, user_id: userIds[1] },
      { type: "Coulissant", largeur: 200, hauteur: 140, prix: 580.00, user_id: userIds[1] },
      
      // Fenêtres pour Pierre (user_id: 3)
      { type: "Oscillo-battant", largeur: 80, hauteur: 100, prix: 280.00, user_id: userIds[2] },
      { type: "Fixe", largeur: 100, hauteur: 60, prix: 180.00, user_id: userIds[2] }
    ];

    console.log("Création des fenêtres de test...");
    for (const fenetre of fenetres) {
      await database.run(
        "INSERT INTO fenetres (type, largeur, hauteur, prix, user_id) VALUES (?, ?, ?, ?, ?)",
        [fenetre.type, fenetre.largeur, fenetre.hauteur, fenetre.prix, fenetre.user_id]
      );
    }

    console.log("Données de test insérées avec succès");
    console.log(`- ${testUsers.length} utilisateurs créés`);
    console.log(`- ${fenetres.length} fenêtres créées`);
    console.log("\nComptes de test disponibles :");
    testUsers.forEach(user => {
      console.log(`  Email: ${user.email} | Mot de passe: ${user.password}`);
    });
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
  } finally {
    process.exit();
  }
};

seedData();
