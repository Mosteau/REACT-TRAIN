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
}

export default function FenetrePopup({ fenetre, onClose }: FenetrePopupProps) {
  if (!fenetre) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{fenetre.type}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Dimensions:</span>
            <span className="ml-2">{fenetre.largeur} x {fenetre.hauteur} cm</span>
          </div>
          
          <div>
            <span className="font-semibold">Prix:</span>
            <span className="ml-2 text-green-600 text-lg font-bold">{fenetre.prix}€</span>
          </div>
          
          <div>
            <span className="font-semibold">Surface:</span>
            <span className="ml-2">{((fenetre.largeur * fenetre.hauteur) / 10000).toFixed(2)} m²</span>
          </div>
          
          <div>
            <span className="font-semibold">Créé le:</span>
            <span className="ml-2">{new Date(fenetre.created_at).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
