// Middleware express pour les erreurs
const errorManager = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
};

module.exports = errorManager;
