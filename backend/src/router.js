const express = require("express");
const fenetreController = require("./controllers/fenetreController");
const authController = require("./controllers/authController");
const authMiddleware = require("./middleware/authMiddleware");

const router = express.Router();

// Routes d'authentification (publiques)
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);

// Routes protégées par authentification
router.get("/auth/profile", authMiddleware, authController.getProfile);

// Routes pour les fenêtres (protégées par authentification)
router.get("/fenetres", authMiddleware, fenetreController.getAll);
router.get("/fenetres/:id", authMiddleware, fenetreController.getById);
router.post("/fenetres", authMiddleware, fenetreController.create);
router.put("/fenetres/:id", authMiddleware, fenetreController.update);
router.delete("/fenetres/:id", authMiddleware, fenetreController.delete);

module.exports = router;