const jwt = require("jsonwebtoken");

// Middleware pour vérifier et décoder le token JWT
const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        error: "Token d'authentification manquant" 
      });
    }

    // Vérifier le format "Bearer TOKEN"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        error: "Format de token invalide" 
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "fallback_secret_key"
    );

    // Ajouter les informations utilisateur à la requête
    req.user = decoded;
    
    // Passer au middleware suivant
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        error: "Token expiré" 
      });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        error: "Token invalide" 
      });
    }

    console.error("Erreur middleware auth:", error);
    res.status(500).json({ 
      error: "Erreur interne du serveur" 
    });
  }
};

module.exports = authMiddleware;