// Import des types depuis le dossier types centralisé
import { PaginationProps } from '../types';

// Composant réutilisable pour la navigation entre les pages
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="pagination">
      {/* Bouton "Précédent" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="pagination__btn"
      >
        ← Précédent
      </button>
      
      {/* Numéros de page */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination__btn ${currentPage === page ? 'pagination__btn--active' : ''}`}
        >
          {page}
        </button>
      ))}
      
      {/* Bouton "Suivant" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="pagination__btn"
      >
        Suivant →
      </button>
    </div>
  );
}