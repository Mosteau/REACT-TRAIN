const tables = require("../tables");
const jwt = require("jsonwebtoken");

// Regex pour validation du mot de passe : au moins 8 caractères, 1 chiffre, 1 lettre, 1 caractère spécial
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Regex pour validation de l'email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const authController = {
  // Inscription d'un nouvel utilisateur
  async register(req, res) {
    try {
      const { prenom, email, password } = req.body;

      // Validation des champs requis
      if (!prenom || !email || !password) {
        return res.status(400).json({ 
          error: "Tous les champs sont requis (prénom, email, mot de passe)" 
        });
      }

      // Validation du format email
      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 
          error: "Format d'email invalide" 
        });
      }

      // Validation de la complexité du mot de passe
      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 
          error: "Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, 1 lettre et 1 caractère spécial" 
        });
      }

      // Vérifier si l'email existe déjà
      const emailExists = await tables.users.emailExists(email);
      if (emailExists) {
        return res.status(409).json({ 
          error: "Cet email est déjà utilisé" 
        });
      }

      // Créer l'utilisateur
      const userId = await tables.users.create({ prenom, email, password });
      
      // Récupérer les données utilisateur (sans mot de passe)
      const user = await tables.users.read(userId);

      // Générer le token JWT (valide 24h)
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "fallback_secret_key",
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "Inscription réussie",
        user,
        token
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Connexion d'un utilisateur existant
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation des champs requis
      if (!email || !password) {
        return res.status(400).json({ 
          error: "Email et mot de passe requis" 
        });
      }

      // Rechercher l'utilisateur par email
      const user = await tables.users.findByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          error: "Email ou mot de passe incorrect" 
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await tables.users.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          error: "Email ou mot de passe incorrect" 
        });
      }

      // Générer le token JWT (valide 24h)
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "fallback_secret_key",
        { expiresIn: "24h" }
      );

      // Retourner les données utilisateur (sans mot de passe)
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: "Connexion réussie",
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Récupération du profil utilisateur (route protégée)
  async getProfile(req, res) {
    try {
      // L'ID utilisateur est ajouté par le middleware JWT
      const userId = req.user.userId;
      
      const user = await tables.users.read(userId);
      if (!user) {
        return res.status(404).json({ 
          error: "Utilisateur non trouvé" 
        });
      }

      res.json({ user });
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  // Déconnexion (côté client principalement)
  async logout(req, res) {
    // Avec JWT, la déconnexion se fait principalement côté client
    // en supprimant le token du localStorage/sessionStorage
    res.json({ message: "Déconnexion réussie" });
  }
};

module.exports = authController;