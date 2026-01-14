/* ************************************************************************* */
// Enregistrement des Gestionnaires de Données pour les Tables
/* ************************************************************************* */

// Importer les modules de gestionnaires responsables des opérations de données sur les tables

const FenetreManager = require("./models/FenetreManager");
const UserManager = require("./models/UserManager");

const managers = [
  FenetreManager,
  UserManager,
];

// Créer un objet vide pour contenir les gestionnaires de données des différentes tables
const tables = {};

// Enregistrer chaque gestionnaire comme point d'accès aux données pour sa table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Utiliser un Proxy pour personnaliser les messages d'erreur lors de l'accès à une table inexistante

// Exporter l'instance Proxy avec gestion d'erreurs personnalisée
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Vérifier si la propriété (table) existe dans l'objet tables
    if (prop in obj) return obj[prop];

    // Si la propriété (table) n'existe pas, lever une ReferenceError avec un message d'erreur personnalisé
    throw new ReferenceError(
      `tables.${prop} n'est pas défini. L'avez-vous enregistré dans ${__filename} ?`
    );
  },
});