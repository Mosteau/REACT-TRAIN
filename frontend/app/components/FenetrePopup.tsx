interface Fenetre {
  id: number;
  type: string;
  largeur: number;
  hauteur: number;
  prix: number;
  created_at: string;
  updated_at: string;
}

interface FenetrePopupProps {
  fenetre: Fenetre | null;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function FenetrePopup({ fenetre, onClose, onDelete }: FenetrePopupProps) {
  if (!fenetre) return null;

  return (
    <div className="fenetre-popup">
      <div className="fenetre-popup__content">
        <div className="fenetre-popup__header">
          <h2>{fenetre.type}</h2>
          <button
            onClick={onClose}
            className="fenetre-popup__header-close"
          >
            ×
          </button>
        </div>
        
        <div className="fenetre-popup__details">
          <div>
            <span className="label">Dimensions:</span>
            <span className="value">{fenetre.largeur} x {fenetre.hauteur} cm</span>
          </div>
          
          <div>
            <span className="label">Prix:</span>
            <span className="value value--price">{fenetre.prix}€</span>
          </div>
          
          <div>
            <span className="label">Surface:</span>
            <span className="value">{((fenetre.largeur * fenetre.hauteur) / 10000).toFixed(2)} m²</span>
          </div>
          
          <div>
            <span className="label">Créé le:</span>
            <span className="value">{new Date(fenetre.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        
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
