// Types liés à l'entité User et à l'authentification

// Interface principale pour un utilisateur
export interface User {
  id: number;
  prenom: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// Type pour les données de connexion
export interface LoginData {
  email: string;
  password: string;
}

// Type pour les données d'inscription
export interface RegisterData {
  prenom: string;
  email: string;
  password: string;
}

// Type pour la réponse d'authentification (login/register)
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// Type pour l'état d'authentification dans le context
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Type pour les erreurs d'authentification
export interface AuthError {
  error: string;
  field?: string; // Champ spécifique en erreur (email, password, etc.)
}