'use client';

import { useState } from 'react';

interface AddFenetreFormProps {
  onFenetreAdded: () => void;
}

export default function AddFenetreForm({ onFenetreAdded }: AddFenetreFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    largeur: '',
    hauteur: '',
    prix: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:3001/api/fenetres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          largeur: parseInt(formData.largeur),
          hauteur: parseInt(formData.hauteur),
          prix: parseFloat(formData.prix)
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de la création');

      // Reset form
      setFormData({ type: '', largeur: '', hauteur: '', prix: '' });
      onFenetreAdded();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-fenetre-form">
      <h2 className="add-fenetre-form__title">Ajouter une fenêtre</h2>
      
      <form onSubmit={handleSubmit} className="add-fenetre-form__form">
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

        <div className="add-fenetre-form__field">
          <label>Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

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
