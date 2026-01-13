import { Suspense } from 'react'
import FenetresList from './components/FenetresList'
import { FenetresLoading } from './components/Loading'

// Page d'accueil de l'application
export default function Page() {
  return (
    // Suspense permet d'afficher un composant de chargement pendant que FenetresList se charge
    <Suspense fallback={<FenetresLoading />}>
      {/* Composant principal qui affiche le catalogue de fenêtres */}
      <FenetresList />
    </Suspense>
  )
}