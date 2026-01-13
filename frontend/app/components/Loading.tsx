import { Suspense } from 'react'

// Composant de chargement pour la liste des fenêtres
// Affiche des "squelettes" (skeleton) pendant le chargement des données
function FenetresLoading() {
  return (
    <div className="loading__container">
      <div className="fenetres-list__grid">
        {/* Génération de 6 cartes de chargement (skeleton cards) */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="fenetres-list__card">
            {/* Skeleton pour le titre (grand) */}
            <div className="loading__skeleton-item loading__skeleton-item--large"></div>
            {/* Skeleton pour les dimensions (moyen) */}
            <div className="loading__skeleton-item loading__skeleton-item--medium"></div>
            {/* Skeleton pour le prix (petit) */}
            <div className="loading__skeleton-item loading__skeleton-item--small"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { FenetresLoading }
