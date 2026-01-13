// Import des types depuis le dossier types centralisé
import { FenetrePopupProps } from '../types';

// Composant popup modale pour afficher les détails d'une fenêtre
export default function FenetrePopup({ fenetre, onClose, onDelete }: FenetrePopupProps) {
  // Si aucune fenêtre n'est sélectionnée, ne rien afficher
  if (!fenetre) return null;

  return (
    // Overlay sombre qui couvre toute la page
    <div className="fenetre-popup">
      <div className="fenetre-popup__content">
        {/* En-tête avec titre et bouton de fermeture */}
        <div className="fenetre-popup__header">
          <h2>{fenetre.type}</h2>
          <button
            onClick={onClose}
            className="fenetre-popup__header-close"
          >
            ×
          </button>
        </div>
        
        {/* Section des détails de la fenêtre */}
        <div className="fenetre-popup__details">
          <div>
            <span className="label">Dimensions:</span>
            <span className="value">{fenetre.largeur} x {fenetre.hauteur} cm</span>
          </div>
          
          <div>
            <span className="label">Prix:</span>
            <span className="value value--price">{fenetre.prix}€</span>
          </div>
          
          {/* Calcul automatique de la surface en m² */}
          <div>
            <span className="label">Surface:</span>
            <span className="value">{((fenetre.largeur * fenetre.hauteur) / 10000).toFixed(2)} m²</span>
          </div>
          
          {/* Formatage de la date de création */}
          <div>
            <span className="label">Créé le:</span>
            <span className="value">{new Date(fenetre.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        
        {/* Boutons d'actions */}
        <div className="fenetre-popup__actions">
          <button
            onClick={onClose}
            className="fenetre-popup__actions button--close"
          >
            Fermer
          </button>
          <button
            onClick={() => onDelete(fenetre.id)}
            className="fenetre-popup__actions button--delete"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
