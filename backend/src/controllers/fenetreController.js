const tables = require("../tables");

const fenetreController = {
  // Récupération de toutes les fenêtres avec pagination
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      
      const result = await tables.fenetres.readAllPaginated(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Récupération d'une fenêtre par son ID
  async getById(req, res) {
    try {
      const fenetre = await tables.fenetres.read(req.params.id);
      if (!fenetre) {
        return res.status(404).json({ error: "Fenêtre non trouvée" });
      }
      res.json(fenetre);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Création d'une nouvelle fenêtre
  async create(req, res) {
    try {
      const id = await tables.fenetres.create(req.body);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mise à jour d'une fenêtre existante
  async update(req, res) {
    try {
      const affectedRows = await tables.fenetres.update(req.params.id, req.body);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Fenêtre non trouvée" });
      }
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Suppression d'une fenêtre par son ID
  async delete(req, res) {
    try {
      const affectedRows = await tables.fenetres.delete(req.params.id);
      if (affectedRows === 0) {
        return res.status(404).json({ error: "Fenêtre non trouvée" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = fenetreController;
