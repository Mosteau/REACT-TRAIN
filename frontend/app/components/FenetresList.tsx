'use client';

import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import FenetrePopup from './FenetrePopup';
import AddFenetreForm from './AddFenetreForm';
import '../assets/scss/main.scss';

// Import des types depuis le dossier types
import { Fenetre, FenetresResponse } from '../types';

// Composant principal qui affiche la liste des fenêtres avec pagination
export default function FenetresList() {
  // États pour gérer les données et l'interface utilisateur
  const [fenetresData, setFenetresData] = useState<FenetresResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFenetre, setSelectedFenetre] = useState<Fenetre | null>(null);

  // Fonction pour récupérer les fenêtres depuis l'API backend
  const fetchFenetres = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/fenetres?page=${page}&limit=6`);
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setFenetresData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Effect qui se déclenche quand la page courante change
  useEffect(() => {
    fetchFenetres(currentPage);
  }, [currentPage]);

  // Gestionnaire pour changer de page dans la pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Gestionnaire pour supprimer une fenêtre
  const handleDeleteFenetre = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/fenetres/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      
      // Fermer la popup et recharger les données
      setSelectedFenetre(null);
      fetchFenetres(currentPage);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  // Gestionnaire appelé quand une nouvelle fenêtre est ajoutée
  const handleFenetreAdded = () => {
    fetchFenetres(currentPage);
  };

  // Gestionnaire pour ouvrir la popup de détails d'une fenêtre
  const handleFenetreClick = (fenetre: Fenetre) => {
    setSelectedFenetre(fenetre);
  };

  // Gestionnaire pour fermer la popup
  const handleClosePopup = () => {
    setSelectedFenetre(null);
  };

  // Affichage conditionnel : état de chargement
  if (loading) return <div className="fenetres-list__loading">Chargement...</div>;
  // Affichage conditionnel : erreur de chargement
  if (!fenetresData || !fenetresData.data) return <div className="fenetres-list__error">Erreur de chargement</div>;

  return (
    <div className="fenetres-list">
      {/* Formulaire pour ajouter une nouvelle fenêtre */}
      <AddFenetreForm onFenetreAdded={handleFenetreAdded} />
      
      {/* Grille des cartes de fenêtres */}
      <div className="fenetres-list__grid">
        {fenetresData.data.map((fenetre) => (
          <div 
            key={fenetre.id} 
            className="fenetres-list__card"
            onClick={() => handleFenetreClick(fenetre)}
          >
            <h3>{fenetre.type}</h3>
            <div className="fenetres-list__card-details">
              <p>Dimensions: {fenetre.largeur} x {fenetre.hauteur} cm</p>
              <p className="price">{fenetre.prix}€</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Composant de pagination */}
      <Pagination
        currentPage={fenetresData.pagination.currentPage}
        totalPages={fenetresData.pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Popup modale pour afficher les détails d'une fenêtre */}
      <FenetrePopup
        fenetre={selectedFenetre}
        onClose={handleClosePopup}
        onDelete={handleDeleteFenetre}
      />
    </div>
  );
}
