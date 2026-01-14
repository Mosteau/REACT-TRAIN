const AbstractManager = require("./AbstractManager");

class FenetreManager extends AbstractManager {
  constructor() {
    super({ table: "fenetres" });
  }

  // Création d'une fenêtre associée à un utilisateur
  async create(fenetre, userId) {
    const result = await this.database.run(
      "INSERT INTO fenetres (type, largeur, hauteur, prix, user_id) VALUES (?, ?, ?, ?, ?)",
      [fenetre.type, fenetre.largeur, fenetre.hauteur, fenetre.prix, userId]
    );
    return result.insertId;
  }

  // Récupération d'une fenêtre par ID (avec vérification du propriétaire)
  async read(id, userId) {
    const [rows] = await this.database.query(
      "SELECT * FROM fenetres WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return rows[0];
  }

  // Mise à jour d'une fenêtre (avec vérification du propriétaire)
  async update(id, fenetre, userId) {
    const result = await this.database.run(
      "UPDATE fenetres SET type = ?, largeur = ?, hauteur = ?, prix = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?",
      [fenetre.type, fenetre.largeur, fenetre.hauteur, fenetre.prix, id, userId]
    );
    return result.affectedRows;
  }

  // Suppression d'une fenêtre (avec vérification du propriétaire)
  async delete(id, userId) {
    const result = await this.database.run(
      "DELETE FROM fenetres WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result.affectedRows;
  }

  // Pagination des fenêtres pour un utilisateur spécifique
  async readAllPaginated(userId, page = 1, limit = 6) {
    const offset = (page - 1) * limit;
    
    const [rows] = await this.database.query(
      "SELECT * FROM fenetres WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [userId, limit, offset]
    );
    
    const [countResult] = await this.database.query(
      "SELECT COUNT(*) as total FROM fenetres WHERE user_id = ?",
      [userId]
    );
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  // Récupération de toutes les fenêtres d'un utilisateur (sans pagination)
  async readAllByUser(userId) {
    const [rows] = await this.database.query(
      "SELECT * FROM fenetres WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  }

  // Comptage des fenêtres d'un utilisateur
  async countByUser(userId) {
    const [rows] = await this.database.query(
      "SELECT COUNT(*) as count FROM fenetres WHERE user_id = ?",
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = FenetreManager;
