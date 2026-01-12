'use client';

import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import FenetrePopup from './FenetrePopup';

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

  const handleFenetreClick = (fenetre: Fenetre) => {
    setSelectedFenetre(fenetre);
  };

  const handleClosePopup = () => {
    setSelectedFenetre(null);
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!fenetresData || !fenetresData.data) return <div className="p-6">Erreur de chargement</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Nos Fenêtres</h1>
        <a 
          href="/simulator" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simulateur
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fenetresData.data.map((fenetre) => (
          <div 
            key={fenetre.id} 
            className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleFenetreClick(fenetre)}
          >
            <h3 className="text-xl font-semibold mb-2">{fenetre.type}</h3>
            <div className="space-y-1 text-gray-600">
              <p>Dimensions: {fenetre.largeur} x {fenetre.hauteur} cm</p>
              <p className="text-lg font-bold text-green-600">{fenetre.prix}€</p>
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
      />
    </div>
  );
}
