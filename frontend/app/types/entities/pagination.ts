// Types liés à la pagination

// Interface pour les métadonnées de pagination
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Type générique pour les réponses paginées
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Props pour le composant Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}