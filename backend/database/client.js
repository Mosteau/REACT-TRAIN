const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Permettre la configuration du chemin de la base de données via une variable d'environnement
const dbPath = process.env.DB_PATH || path.join(__dirname, 'fenetre_db.sqlite');
const database = new sqlite3.Database(dbPath);

// Promisifier les méthodes de base de données pour utiliser async/await

// Fonction pour exécuter des requêtes SELECT (lecture)
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve([rows]);
    });
  });
};

// Fonction pour exécuter des requêtes INSERT/UPDATE/DELETE (écriture)
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    database.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ insertId: this.lastID, affectedRows: this.changes });
    });
  });
};

module.exports = { query, run };
