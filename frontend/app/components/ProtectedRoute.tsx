'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/UserContext';
import { FenetresLoading } from './Loading';

// Props pour le composant ProtectedRoute
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string; // URL de redirection si non authentifié
}

// Composant pour protéger les routes qui nécessitent une authentification
export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé et l'utilisateur n'est pas authentifié
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Afficher un loader pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FenetresLoading />
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, ne rien afficher
  // (la redirection se fait dans useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Si l'utilisateur est authentifié, afficher le contenu protégé
  return <>{children}</>;
}