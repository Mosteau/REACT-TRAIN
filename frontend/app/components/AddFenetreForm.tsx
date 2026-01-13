'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/UserContext';
import { buildApiUrl, API_CONFIG } from '../config/api';

// Import des types depuis le dossier types centralisé
import { AddFenetreFormProps, FenetreFormState, InputChangeHandler, FormSubmitHandler } from '../types';

// Composant formulaire pour ajouter une nouvelle fenêtre
export default function AddFenetreForm({ onFenetreAdded }: AddFenetreFormProps) {
  const { token } = useAuth(); // Récupération du token depuis le contexte
  
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState<FenetreFormState>({
    type: '',
    largeur: '',
    hauteur: '',
    prix: ''
  });
  // État pour gérer l'état de soumission (éviter les doubles clics)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    
    if (!token) {
      alert('Session expirée, veuillez vous reconnecter');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Envoi des données à l'API backend avec authentification
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.FENETRES.CREATE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ajout du token JWT
        },
        body: JSON.stringify({
          type: formData.type,
          largeur: parseInt(formData.largeur),   // Conversion en nombre entier
          hauteur: parseInt(formData.hauteur),   // Conversion en nombre entier
          prix: parseFloat(formData.prix)        // Conversion en nombre décimal
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error('Erreur lors de la création');
      }

      // Réinitialiser le formulaire après succès
      setFormData({ type: '', largeur: '', hauteur: '', prix: '' });
      // Notifier le composant parent pour recharger la liste
      onFenetreAdded();
    } catch (error) {
      console.error('Erreur:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestionnaire pour mettre à jour les champs du formulaire
  const handleChange: InputChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-fenetre-form">
      <h2 className="add-fenetre-form__title">Ajouter une fenêtre à votre catalogue</h2>
      
      <form onSubmit={handleSubmit} className="add-fenetre-form__form">
        {/* Champ pour le type de fenêtre */}
        <div className="add-fenetre-form__field">
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            placeholder="Ex: Fenêtre PVC double vitrage"
          />
        </div>

        {/* Grille pour largeur et hauteur côte à côte */}
        <div className="add-fenetre-form__grid">
          <div className="add-fenetre-form__field">
            <label>Largeur (cm)</label>
            <input
              type="number"
              name="largeur"
              value={formData.largeur}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
          <div className="add-fenetre-form__field">
            <label>Hauteur (cm)</label>
            <input
              type="number"
              name="hauteur"
              value={formData.hauteur}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>

        {/* Champ pour le prix */}
        <div className="add-fenetre-form__field">
          <label>Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
            min="0"
            step="0.01" // Permet les centimes
          />
        </div>

        {/* Bouton de soumission avec état de chargement */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="add-fenetre-form__submit"
        >
          {isSubmitting ? 'Ajout en cours...' : 'Ajouter la fenêtre'}
        </button>
      </form>
    </div>
  );
}
