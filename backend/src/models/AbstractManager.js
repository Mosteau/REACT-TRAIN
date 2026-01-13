// Importation du client de base de données
const database = require("../../database/client");

// Fournir l'accès à la base de données via la classe AbstractManager
class AbstractManager {
  constructor({ table }) {
    // Stocker le nom de la table
    this.table = table;

    // Fournir l'accès au client de base de données
    this.database = database;
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }
}

// Prêt à exporter
module.exports = AbstractManager;