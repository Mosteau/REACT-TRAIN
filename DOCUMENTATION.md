# Documentation Technique - Application Fenêtres

## Architecture Générale

L'application suit une architecture **client-serveur** avec séparation claire des responsabilités :
- **Backend** : API REST en Node.js/Express avec base de données MySQL
- **Frontend** : Application React/Next.js avec TypeScript

## Backend - Node.js/Express

### Structure des Dossiers

```
backend/
├── src/
│   ├── app.js              # Configuration Express
│   ├── router.js           # Routes principales
│   ├── tables.js           # Registry des managers
│   ├── controllers/        # Logique métier
│   ├── models/            # Accès aux données
│   └── services/          # Services métier
├── database/              # Scripts SQL
├── index.js              # Point d'entrée
└── package.json
```

### Bonnes Pratiques Backend

#### 1. Pattern MVC (Model-View-Controller)

**Models** - Gestion des données avec héritage :
```javascript
// AbstractManager.js - Classe de base
class AbstractManager {
  constructor({ table }) {
    this.table = table;
    this.database = client; // Connexion MySQL
  }
  
  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }
}

// FenetreManager.js - Manager spécialisé
class FenetreManager extends AbstractManager {
  constructor() {
    super({ table: "fenetres" });
  }
  
  // Méthodes spécifiques aux fenêtres
  async readAllPaginated(page = 1, limit = 6) {
    const offset = (page - 1) * limit;
    // Requête avec LIMIT/OFFSET pour pagination
    // Retourne { data: [], pagination: {} }
  }
}
```

**Controllers** - Logique métier et gestion des erreurs :
```javascript
const fenetreController = {
  async getAll(req, res) {
    try {
      // Extraction des paramètres de requête
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      
      // Appel au model
      const result = await tables.fenetres.readAllPaginated(page, limit);
      
      // Réponse JSON structurée
      res.json(result);
    } catch (error) {
      // Gestion centralisée des erreurs
      res.status(500).json({ error: error.message });
    }
  }
};
```

#### 2. Registry Pattern pour les Tables

```javascript
// tables.js - Point d'accès unique aux managers
const managers = [FenetreManager];
const tables = {};

managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();
  tables[manager.table] = manager;
});

// Proxy pour messages d'erreur personnalisés
module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    throw new ReferenceError(`tables.${prop} is not defined`);
  }
});
```

#### 3. Configuration Centralisée

```javascript
// app.js - Configuration Express
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares globaux
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use("/api", router);

// Gestion d'erreurs globale
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Erreur serveur" });
});
```

#### 4. Pagination Backend

**Avantages** :
- Performance : Limite les données transférées
- Scalabilité : Gère de gros volumes
- UX : Chargement plus rapide

**Implémentation** :
```javascript
async readAllPaginated(page = 1, limit = 6) {
  const offset = (page - 1) * limit;
  
  // Requête des données paginées
  const [rows] = await this.database.query(
    "SELECT * FROM fenetres LIMIT ? OFFSET ?",
    [limit, offset]
  );
  
  // Comptage total pour métadonnées
  const [countResult] = await this.database.query(
    "SELECT COUNT(*) as total FROM fenetres"
  );
  
  return {
    data: rows,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}
```

## Frontend - React/Next.js

### Structure des Dossiers

```
frontend/
├── app/
│   ├── components/        # Composants réutilisables
│   ├── simulator/         # Pages spécifiques
│   ├── layout.tsx         # Layout global
│   ├── page.tsx          # Page d'accueil
│   └── globals.css       # Styles globaux
└── package.json
```

### Bonnes Pratiques Frontend

#### 1. Composants Client vs Serveur (Next.js 13+)

**Composant Serveur** (par défaut) :
```typescript
// Rendu côté serveur, pas d'interactivité
export default async function ServerComponent() {
  const data = await fetch('api/data');
  return <div>{data}</div>;
}
```

**Composant Client** (avec état) :
```typescript
'use client'; // Directive obligatoire

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  // Logique interactive
}
```

#### 2. Gestion d'État avec Hooks

```typescript
const [fenetresData, setFenetresData] = useState<FenetresResponse | null>(null);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);

// Effect pour chargement des données
useEffect(() => {
  fetchFenetres(currentPage);
}, [currentPage]); // Dépendance : recharge si page change
```

#### 3. Fetch API avec Gestion d'Erreurs

```typescript
const fetchFenetres = async (page: number) => {
  setLoading(true);
  try {
    const res = await fetch(`http://localhost:3001/api/fenetres?page=${page}&limit=6`);
    if (!res.ok) throw new Error('Erreur lors du chargement');
    
    const data = await res.json();
    setFenetresData(data);
  } catch (error) {
    console.error(error);
    // Gestion d'erreur appropriée
  } finally {
    setLoading(false); // Toujours exécuté
  }
};
```

#### 4. TypeScript pour la Sécurité

```typescript
// Interfaces pour typage strict
interface Fenetre {
  id: number;
  type: string;
  largeur: number;
  hauteur: number;
  prix: number;
  created_at: string;
  updated_at: string;
}

interface FenetresResponse {
  data: Fenetre[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

#### 5. Composants Réutilisables

```typescript
// Pagination.tsx - Composant générique
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 border rounded disabled:opacity-50"
      >
        Précédent
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 border rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
```

#### 6. Conditional Rendering et Loading States

```typescript
// Gestion des états de chargement
if (loading) return <div className="p-6">Chargement...</div>;
if (!fenetresData || !fenetresData.data) return <div className="p-6">Erreur de chargement</div>;

// Rendu conditionnel
return (
  <div className="p-6">
    {fenetresData.data.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fenetresData.data.map((fenetre) => (
          <FenetreCard key={fenetre.id} fenetre={fenetre} />
        ))}
      </div>
    ) : (
      <p>Aucune fenêtre trouvée</p>
    )}
  </div>
);
```

## Communication Frontend-Backend

### 1. API REST Standard

```
GET    /api/fenetres?page=1&limit=6  # Liste paginée
GET    /api/fenetres/:id             # Détail
POST   /api/fenetres                # Création
PUT    /api/fenetres/:id             # Modification
DELETE /api/fenetres/:id             # Suppression
```

### 2. Format de Réponse Standardisé

```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 16,
    "itemsPerPage": 6,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Bonnes Pratiques Générales

### Sécurité
- Validation des entrées côté backend
- Gestion des erreurs sans exposition d'informations sensibles
- CORS configuré pour le domaine frontend uniquement

### Performance
- Pagination pour limiter les transferts de données
- Lazy loading des composants
- Optimisation des requêtes SQL avec LIMIT/OFFSET

### Maintenabilité
- Séparation des responsabilités (MVC)
- Composants réutilisables
- TypeScript pour la documentation du code
- Gestion centralisée des erreurs

### Développement
- Variables d'environnement pour la configuration
- Structure de dossiers cohérente
- Nommage explicite des fonctions et variables

Cette architecture permet une évolutivité facile et une maintenance simplifiée du code.
