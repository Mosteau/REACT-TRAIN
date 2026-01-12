'use client';

import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import FenetrePopup from './FenetrePopup';
import AddFenetreForm from './AddFenetreForm';
import '../assets/scss/main.scss';

interface Fenetre {
  id: number;
  type: string;
  largeur: number;
  hauteur: number;
  prix: number;
  created_at: string;
  updated_at: string;
}

interface FenetresResponse {
  data: Fenetre[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function FenetresList() {
  const [fenetresData, setFenetresData] = useState<FenetresResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFenetre, setSelectedFenetre] = useState<Fenetre | null>(null);

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

  useEffect(() => {
    fetchFenetres(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  const handleFenetreAdded = () => {
    fetchFenetres(currentPage);
  };

  const handleFenetreClick = (fenetre: Fenetre) => {
    setSelectedFenetre(fenetre);
  };

  const handleClosePopup = () => {
    setSelectedFenetre(null);
  };

  if (loading) return <div className="fenetres-list__loading">Chargement...</div>;
  if (!fenetresData || !fenetresData.data) return <div className="fenetres-list__error">Erreur de chargement</div>;

  return (
    <div className="fenetres-list">
      <AddFenetreForm onFenetreAdded={handleFenetreAdded} />
      
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
      
      <Pagination
        currentPage={fenetresData.pagination.currentPage}
        totalPages={fenetresData.pagination.totalPages}
        onPageChange={handlePageChange}
      />

      <FenetrePopup
        fenetre={selectedFenetre}
        onClose={handleClosePopup}
        onDelete={handleDeleteFenetre}
      />
    </div>
  );
}
