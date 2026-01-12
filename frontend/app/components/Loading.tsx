import { Suspense } from 'react'

function FenetresLoading() {
  return (
    <div className="loading__container">
      <div className="fenetres-list__grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="fenetres-list__card">
            <div className="loading__skeleton-item loading__skeleton-item--large"></div>
            <div className="loading__skeleton-item loading__skeleton-item--medium"></div>
            <div className="loading__skeleton-item loading__skeleton-item--small"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { FenetresLoading }
