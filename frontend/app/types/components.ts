// Types pour les props des composants

import { Fenetre, CreateFenetreData } from './entities/fenetre';
import { LoginData, RegisterData } from './entities/user';

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

// Props pour le composant LoginForm
export interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

// Props pour le composant RegisterForm
export interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

// État du formulaire de connexion
export interface LoginFormState extends LoginData {
  isSubmitting: boolean;
}

// État du formulaire d'inscription
export interface RegisterFormState extends RegisterData {
  confirmPassword: string;
  isSubmitting: boolean;
}

// Props pour le contexte utilisateur
export interface UserContextType {
  user: any; // Sera typé plus précisément
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}