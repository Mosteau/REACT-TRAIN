// Import des types depuis le dossier types centralisé
import { PaginationProps } from '../types';

// Composant réutilisable pour la navigation entre les pages
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Bouton "Précédent" - désactivé si on est sur la première page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>
      
      {/* Génération dynamique des boutons de numéros de page */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 border rounded ${
            currentPage === page 
              ? 'bg-blue-500 text-white'  // Style pour la page active
              : 'hover:bg-gray-100'       // Style pour les autres pages
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Bouton "Suivant" - désactivé si on est sur la dernière page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivant
      </button>
    </div>
  );
}
