const express = require("express");
const fenetreController = require("./controllers/fenetreController");

const router = express.Router();

// Routes pour les fenêtres
router.get("/fenetres", fenetreController.getAll);
router.get("/fenetres/:id", fenetreController.getById);
router.post("/fenetres", fenetreController.create);
router.put("/fenetres/:id", fenetreController.update);
router.delete("/fenetres/:id", fenetreController.delete);

module.exports = router;