// Types pour les props des composants

import { Fenetre, CreateFenetreData } from './entities/fenetre';

// Props pour le composant FenetrePopup
export interface FenetrePopupProps {
  fenetre: Fenetre | null;        // Fenêtre à afficher (null si popup fermée)
  onClose: () => void;            // Callback pour fermer la popup
  onDelete: (id: number) => void; // Callback pour supprimer une fenêtre
}

// Props pour le composant AddFenetreForm
export interface AddFenetreFormProps {
  onFenetreAdded: () => void;
}

// État du formulaire d'ajout de fenêtre
export interface FenetreFormState {
  type: string;
  largeur: string;
  hauteur: string;
  prix: string;
}

// Props pour les composants de chargement
export interface LoadingProps {
  message?: string;
  count?: number; // Nombre d'éléments skeleton à afficher
}

// Props génériques pour les callbacks
export interface CallbackProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}