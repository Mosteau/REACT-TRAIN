// Types liés aux réponses et requêtes API

import { Fenetre } from './entities/fenetre';
import { PaginatedResponse } from './entities/pagination';

// Type spécifique pour la réponse API des fenêtres
export type FenetresResponse = PaginatedResponse<Fenetre>;

// Types pour les erreurs API
export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

// Type pour les réponses de création (retourne l'objet créé avec son ID)
export type CreateResponse<T> = T & {
  id: number;
};

// États de chargement pour les composants
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Type pour les paramètres de requête de pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
}