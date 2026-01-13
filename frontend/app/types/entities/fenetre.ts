// Types liés à l'entité Fenêtre

// Interface principale pour une fenêtre
export interface Fenetre {
  id: number;
  type: string;
  largeur: number;
  hauteur: number;
  prix: number;
  created_at: string;
  updated_at: string;
}

// Type pour créer une nouvelle fenêtre (sans id et timestamps)
export interface CreateFenetreData {
  type: string;
  largeur: number;
  hauteur: number;
  prix: number;
}

// Type pour mettre à jour une fenêtre (tous les champs optionnels sauf id)
export interface UpdateFenetreData {
  id: number;
  type?: string;
  largeur?: number;
  hauteur?: number;
  prix?: number;
}