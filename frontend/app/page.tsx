import { Suspense } from 'react'
import FenetresList from './components/FenetresList'
import ProtectedRoute from './components/ProtectedRoute'
import { FenetresLoading } from './components/Loading'

// Page d'accueil de l'application - affiche la liste des fenêtres (protégée)
export default function Page() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<FenetresLoading />}>
        {/* Composant principal qui affiche le catalogue de fenêtres de l'utilisateur connecté */}
        <FenetresList />
      </Suspense>
    </ProtectedRoute>
  )
}