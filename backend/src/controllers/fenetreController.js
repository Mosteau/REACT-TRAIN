const tables = require("../tables");

const fenetreController = {
  // Récupération de toutes les fenêtres de l'utilisateur connecté avec pagination
  async getAll(req, res) {
    try {
      const userId = req.user.userId; // Récupéré du middleware JWT
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      
      const result = await tables.fenetres.readAllPaginated(userId, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Récupération d'une fenêtre par son ID (vérification du propriétaire)
  async getById(req, res) {
    try {
      const userId = req.user.userId; // Récupéré du middleware JWT
      const fenetre = await tables.fenetres.read(req.params.id, userId);
      if (!fenetre) {
        return res.status(404).json({ error: "Fenêtre non trouvée ou accès non autorisé" });
      }
      res.json(fenetre);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Création d'une nouvelle fenêtre pour l'utilisateur connecté
  async create(req, res) {
    try {
      const userId = req.user.userId; // Récupéré du middleware JWT
      const id = await tables.fenetres.create(req.body, userId);
      res.status(201).json({ id, ...req.body, user_id: userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mise à jour d'une fenêtre existante (vérification du propriétaire)
  async update(req, res) {
    try {
      const userId = req.user.userId; // Récupéré du middleware JWT
      const affectedRows = await tables.fenetres.update(req.params.id, req.body, userId);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Fenêtre non trouvée ou accès non autorisé" });
      }
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Suppression d'une fenêtre par son ID (vérification du propriétaire)
  async delete(req, res) {
    try {
      const userId = req.user.userId; // Récupéré du middleware JWT
      const affectedRows = await tables.fenetres.delete(req.params.id, userId);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Fenêtre non trouvée ou accès non autorisé" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = fenetreController;
