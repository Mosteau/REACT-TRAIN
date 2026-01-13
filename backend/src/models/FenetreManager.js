const AbstractManager = require("./AbstractManager");

class FenetreManager extends AbstractManager {
  constructor() {
    super({ table: "fenetres" });
  }

  // requête pour créer une fenêtre
  async create(fenetre) {
    const result = await this.database.run(
      "INSERT INTO fenetres (type, largeur, hauteur, prix) VALUES (?, ?, ?, ?)",
      [fenetre.type, fenetre.largeur, fenetre.hauteur, fenetre.prix]
    );
    return result.insertId;
  }

  // requête pour récupérer une fenêtre par id
  async read(id) {
    const [rows] = await this.database.query(
      "SELECT * FROM fenetres WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // requête pour mettre à jour une fenêtre
  async update(id, fenetre) {
    const result = await this.database.run(
      "UPDATE fenetres SET type = ?, largeur = ?, hauteur = ?, prix = ? WHERE id = ?",
      [fenetre.type, fenetre.largeur, fenetre.hauteur, fenetre.prix, id]
    );
    return result.affectedRows;
  }

  // requête pour supprimer une fenêtre par id
  async delete(id) {
    const result = await this.database.run(
      "DELETE FROM fenetres WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }

  // requête de pagination pour l'affiche de l'ensemble des produits
  async readAllPaginated(page = 1, limit = 6) {
    const offset = (page - 1) * limit;
    
    const [rows] = await this.database.query(
      "SELECT * FROM fenetres LIMIT ? OFFSET ?",
      [limit, offset]
    );
    
    const [countResult] = await this.database.query(
      "SELECT COUNT(*) as total FROM fenetres"
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
}

module.exports = FenetreManager;
