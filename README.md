# 🪟 Fenêtres App - Window Management System

> Une application de démonstration full-stack pour la gestion d'un catalogue de fenêtres, construite avec React/Next.js et Node.js.

## 📋 À propos

Cette application démontre une architecture moderne **client-serveur** avec :
- **Frontend** : Interface utilisateur responsive en React/Next.js avec TypeScript
- **Backend** : API REST en Node.js/Express avec base de données SQLite
- **Fonctionnalités** : CRUD complet, pagination, interface moderne

### ✨ Fonctionnalités principales

- 🏠 **Catalogue de fenêtres** avec pagination (6 éléments par page)
- 📝 **CRUD complet** : Créer, lire, modifier, supprimer des fenêtres
- 📱 **Design responsive** : Fonctionne sur desktop et mobile
- ⚡ **Mises à jour temps réel** : Interface mise à jour instantanément
- 🎨 **Interface moderne** : Cartes, modales, états de chargement

## 🚀 Installation rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd fenêtres-app
```

### 2. Installation Backend
```bash
cd backend
npm install
npm run db:migrate    # Créer la base de données
npm run db:seed       # Ajouter des données de test
npm run dev          # Démarrer le serveur (port 3001)
```

### 3. Installation Frontend
```bash
cd frontend
npm install
npm run dev          # Démarrer Next.js (port 3000)
```

### 4. Accéder à l'application
- **Frontend** : http://localhost:3000
- **API Backend** : http://localhost:3001/api

## 🏗️ Architecture

```
project/
├── backend/           # API Node.js/Express + SQLite
│   ├── src/
│   │   ├── controllers/   # Logique métier
│   │   ├── models/        # Accès aux données (Managers)
│   │   └── services/      # Services utilitaires
│   ├── database/          # Base SQLite + client
│   └── package.json
├── frontend/          # Application Next.js/React
│   ├── app/
│   │   ├── components/    # Composants réutilisables
│   │   └── assets/        # Styles SCSS
│   └── package.json
└── README.md
```

## 🛠️ Stack technique

### Backend
- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : SQLite
- **Architecture** : MVC avec pattern Registry
- **Outils** : Nodemon, ESLint, Prettier

### Frontend  
- **Framework** : Next.js 16 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS + SCSS
- **State** : React Hooks (useState, useEffect)

## 📡 API Endpoints

```
GET    /api/fenetres?page=1&limit=6  # Liste paginée
GET    /api/fenetres/:id             # Détail d'une fenêtre
POST   /api/fenetres                # Créer une fenêtre
PUT    /api/fenetres/:id             # Modifier une fenêtre
DELETE /api/fenetres/:id             # Supprimer une fenêtre
```

### Format de réponse
```json
{
  "data": [
    {
      "id": 1,
      "type": "Battant",
      "largeur": 80,
      "hauteur": 120,
      "prix": 250.00,
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 16,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔧 Scripts disponibles

### Backend
```bash
npm run dev          # Développement avec nodemon
npm run start        # Production
npm run db:migrate   # Créer les tables
npm run db:seed      # Insérer des données de test
npm test            # Tests Jest
npm run lint        # Vérification ESLint
```

### Frontend
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

## ⚙️ Configuration

### Variables d'environnement (optionnelles)

Créer un fichier `.env` dans `/backend` :
```bash
APP_PORT=3001                        # Port du serveur
FRONTEND_URL=http://localhost:3000   # URL frontend pour CORS
DB_PATH=./database/fenetre_db.sqlite # Chemin base de données
```

> **Note** : L'application fonctionne sans fichier `.env` grâce aux valeurs par défaut.

