'use client';

import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import FenetrePopup from './FenetrePopup';
import AddFenetreForm from './AddFenetreForm';
import { useAuth } from '../contexts/UserContext';
import { Fenetre, FenetresResponse } from '../types';
import { buildApiUrl, API_CONFIG } from '../config/api';
import '../assets/scss/fenetres-list.scss';

// Composant principal qui affiche la liste des fenêtres avec pagination
export default function FenetresList() {
  const { token, user } = useAuth();
  
  const [fenetresData, setFenetresData] = useState<FenetresResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFenetre, setSelectedFenetre] = useState<Fenetre | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchFenetres = async (page: number) => {
    if (!token) return;
    
    setLoading(true);
    try {
      const res = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.FENETRES.LIST}?page=${page}&limit=6`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        throw new Error('Erreur lors du chargement');
      }
      
      const data = await res.json();
      setFenetresData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFenetres(currentPage);
    }
  }, [currentPage, token]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteFenetre = async (id: number) => {
    if (!token) return;
    
    try {
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.FENETRES.DELETE(id)), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        throw new Error('Erreur lors de la suppression');
      }
      
      setSelectedFenetre(null);
      fetchFenetres(currentPage);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleFenetreAdded = () => {
    setShowAddForm(false);
    fetchFenetres(currentPage);
  };

  if (loading) {
    return (
      <div className="fenetres-page">
        <div className="fenetres-page__loading">
          <div className="loading-spinner"></div>
          <p>Chargement de vos fenêtres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fenetres-page">
      <div className="fenetres-page__container">
        {/* En-tête avec message de bienvenue */}
        <div className="fenetres-page__header">
          <div className="header-content">
            <h1>Bonjour {user?.prenom}</h1>
            <p>
              Voici votre catalogue personnel de fenêtres 
              ({fenetresData?.pagination.totalItems || 0} fenêtre{(fenetresData?.pagination.totalItems || 0) > 1 ? 's' : ''})
            </p>
          </div>
          <button 
            className="add-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ Fermer' : '+ Ajouter une fenêtre'}
          </button>
        </div>

        {/* Formulaire d'ajout (conditionnel) */}
        {showAddForm && (
          <div className="fenetres-page__form-section">
            <AddFenetreForm onFenetreAdded={handleFenetreAdded} />
          </div>
        )}

        {/* Grille des fenêtres */}
        {fenetresData && fenetresData.data.length > 0 ? (
          <>
            <div className="fenetres-grid">
              {fenetresData.data.map((fenetre, index) => (
                <div 
                  key={fenetre.id} 
                  className="fenetre-card"
                  onClick={() => setSelectedFenetre(fenetre)}
                >
                  <div className="fenetre-card__content">
                    <h3 className="fenetre-card__title">{fenetre.type}</h3>
                    <div className="fenetre-card__dimensions">
                      <span className="dimension">
                        <span className="label">Largeur</span>
                        <span className="value">{fenetre.largeur} cm</span>
                      </span>
                      <span className="dimension">
                        <span className="label">Hauteur</span>
                        <span className="value">{fenetre.hauteur} cm</span>
                      </span>
                    </div>
                    <div className="fenetre-card__price">
                      <span className="price-value">{fenetre.prix}</span>
                      <span className="price-currency">€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {fenetresData.pagination.totalPages > 1 && (
              <Pagination
                currentPage={fenetresData.pagination.currentPage}
                totalPages={fenetresData.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          /* État vide */
          <div className="fenetres-page__empty">
            <h2>Aucune fenêtre dans votre catalogue</h2>
            <p>Commencez par ajouter votre première fenêtre !</p>
            <button 
              className="empty-btn"
              onClick={() => setShowAddForm(true)}
            >
              + Ajouter ma première fenêtre
            </button>
          </div>
        )}

        {/* Popup de détails */}
        <FenetrePopup
          fenetre={selectedFenetre}
          onClose={() => setSelectedFenetre(null)}
          onDelete={handleDeleteFenetre}
        />
      </div>
    </div>
  );
}