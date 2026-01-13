'use client';

import { FenetrePopupProps } from '../types';
import '../assets/scss/fenetre-popup.scss';

// Composant popup modale pour afficher les détails d'une fenêtre
export default function FenetrePopup({ fenetre, onClose, onDelete }: FenetrePopupProps) {
  if (!fenetre) return null;

  // Calcul de la surface en m²
  const surface = ((fenetre.largeur * fenetre.hauteur) / 10000).toFixed(2);
  
  // Formatage de la date
  const createdDate = new Date(fenetre.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="popup-header">
          <div className="popup-header__info">
            <h2>{fenetre.type}</h2>
            <span className="popup-header__id">Réf. #{fenetre.id}</span>
          </div>
          <button className="popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Contenu */}
        <div className="popup-body">
          {/* Dimensions */}
          <div className="popup-section">
            <h3>Dimensions</h3>
            <div className="dimensions-grid">
              <div className="dimension-item">
                <span className="label">Largeur</span>
                <span className="value">{fenetre.largeur} <small>cm</small></span>
              </div>
              <div className="dimension-item">
                <span className="label">Hauteur</span>
                <span className="value">{fenetre.hauteur} <small>cm</small></span>
              </div>
              <div className="dimension-item">
                <span className="label">Surface</span>
                <span className="value">{surface} <small>m²</small></span>
              </div>
            </div>
          </div>

          {/* Prix */}
          <div className="popup-section popup-section--price">
            <h3>Prix</h3>
            <div className="price-display">
              <span className="price-value">{fenetre.prix}</span>
              <span className="price-currency">€</span>
            </div>
          </div>

          {/* Informations */}
          <div className="popup-section popup-section--info">
            <h3>Informations</h3>
            <p>Ajoutée le {createdDate}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="popup-actions">
          <button className="btn-secondary" onClick={onClose}>
            Fermer
          </button>
          <button className="btn-danger" onClick={() => onDelete(fenetre.id)}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}