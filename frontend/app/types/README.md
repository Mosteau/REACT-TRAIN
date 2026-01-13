# 📁 Organisation des Types TypeScript

Ce dossier centralise tous les types TypeScript de l'application pour une meilleure maintenabilité et réutilisabilité.

## 🏗️ Structure

```
types/
├── index.ts              # Point d'entrée principal - réexporte tous les types
├── api.ts               # Types liés aux réponses et requêtes API
├── components.ts        # Types pour les props des composants React
├── entities/            # Types métier par domaine
│   ├── fenetre.ts       # Types spécifiques aux fenêtres
│   └── pagination.ts    # Types pour la pagination
└── README.md           # Cette documentation
```

## 📋 Fichiers de types

### `index.ts` - Point d'entrée
- **Rôle** : Réexporte tous les types depuis un seul endroit
- **Usage** : `import { Fenetre, PaginationProps } from '../types'`
- **Avantage** : Import simplifié, un seul point d'entrée

### `entities/fenetre.ts` - Types métier Fenêtre
- **Fenetre** : Interface principale d'une fenêtre
- **CreateFenetreData** : Type pour créer une fenêtre (sans id/timestamps)
- **UpdateFenetreData** : Type pour mettre à jour une fenêtre

### `entities/pagination.ts` - Types pagination
- **PaginationMeta** : Métadonnées de pagination
- **PaginatedResponse<T>** : Type générique pour réponses paginées
- **PaginationProps** : Props du composant Pagination

### `api.ts` - Types API
- **FenetresResponse** : Réponse API spécifique aux fenêtres
- **ApiError** : Structure des erreurs API
- **LoadingState** : États de chargement
- **CreateResponse<T>** : Réponse de création avec ID

### `components.ts` - Types composants
- **FenetrePopupProps** : Props du composant popup
- **AddFenetreFormProps** : Props du formulaire d'ajout
- **FenetreFormState** : État du formulaire
- **LoadingProps** : Props des composants de chargement

## 🎯 Bonnes pratiques

### ✅ À faire
- Importer depuis `../types` uniquement
- Créer des types spécifiques par domaine
- Utiliser des types génériques quand approprié
- Documenter les types complexes

### ❌ À éviter
- Définir des types directement dans les composants
- Dupliquer des types similaires
- Importer depuis des fichiers spécifiques (`../types/api`)

## 📝 Exemples d'usage

### Import simple
```typescript
import { Fenetre, FenetresResponse, PaginationProps } from '../types';
```

### Utilisation dans un composant
```typescript
interface MonComposantProps {
  fenetres: Fenetre[];
  onSelect: (fenetre: Fenetre) => void;
}
```

### Type générique
```typescript
const response: PaginatedResponse<Fenetre> = await fetchFenetres();
```

## 🔄 Évolution

Pour ajouter de nouveaux types :
1. Créer le fichier approprié dans `entities/` si nécessaire
2. Définir les types avec documentation
3. Les réexporter dans `index.ts`
4. Mettre à jour cette documentation

Cette organisation garantit une **maintenabilité optimale** et une **expérience développeur** fluide ! 🚀