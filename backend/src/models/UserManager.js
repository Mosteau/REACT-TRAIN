// Importation du client de base de données et d'Argon2 pour le hachage
const AbstractManager = require("./AbstractManager");
const argon2 = require("argon2");

// Manager pour la gestion des utilisateurs avec authentification sécurisée
class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  // Création d'un nouvel utilisateur avec hachage du mot de passe
  async create(userData) {
    const { prenom, email, password } = userData;
    
    // Hachage sécurisé du mot de passe avec Argon2
    const hashedPassword = await argon2.hash(password);
    
    const result = await this.database.run(
      "INSERT INTO users (prenom, email, password) VALUES (?, ?, ?)",
      [prenom, email, hashedPassword]
    );
    return result.insertId;
  }

  // Recherche d'un utilisateur par email (pour la connexion)
  async findByEmail(email) {
    const [rows] = await this.database.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  // Récupération d'un utilisateur par ID (sans le mot de passe)
  async read(id) {
    const [rows] = await this.database.query(
      "SELECT id, prenom, email, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // Vérification du mot de passe lors de la connexion
  async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe:", error);
      return false;
    }
  }

  // Mise à jour des informations utilisateur (sans mot de passe)
  async update(id, userData) {
    const { prenom, email } = userData;
    const result = await this.database.run(
      "UPDATE users SET prenom = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [prenom, email, id]
    );
    return result.affectedRows;
  }

  // Mise à jour du mot de passe uniquement
  async updatePassword(id, newPassword) {
    const hashedPassword = await argon2.hash(newPassword);
    const result = await this.database.run(
      "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [hashedPassword, id]
    );
    return result.affectedRows;
  }

  // Suppression d'un utilisateur
  async delete(id) {
    const result = await this.database.run(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }

  // Vérification si un email existe déjà (pour éviter les doublons)
  async emailExists(email) {
    const [rows] = await this.database.query(
      "SELECT COUNT(*) as count FROM users WHERE email = ?",
      [email]
    );
    return rows[0].count > 0;
  }
}

module.exports = UserManager;