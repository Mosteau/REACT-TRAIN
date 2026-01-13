'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/UserContext';
import '../assets/scss/header.scss';

// Composant Header - En-tête de l'application avec authentification
export default function Header() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Gestionnaire de déconnexion
  const handleLogout = () => {
    logout();
  };

  // Obtenir les initiales de l'utilisateur
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo et titre */}
        <Link href="/" className="header__logo">
          <span>Fenêtres Pro</span>
        </Link>

        {/* Navigation centrale - affichée seulement après chargement */}
        {!isLoading && isAuthenticated && (
          <nav className="header__nav">
            <Link href="/" className="nav-link">
              Catalogue
            </Link>
            <Link href="/simulator" className="nav-link">
              Simulateur
            </Link>
          </nav>
        )}

        {/* Zone utilisateur / authentification */}
        {!isLoading ? (
          <>
            {isAuthenticated && user ? (
              <div className="header__user">
                <div className="user-info">
                  <div className="user-avatar">
                    {getInitials(user.prenom)}
                  </div>
                  <div className="user-details">
                    <span className="user-greeting">Bonjour,</span>
                    <span className="user-name">{user.prenom}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="header__auth">
                <Link href="/login" className="auth-link">
                  Connexion
                </Link>
                <Link href="/register" className="auth-btn">
                  Inscription
                </Link>
              </div>
            )}
          </>
        ) : (
          // Placeholder pendant le chargement pour éviter le layout shift
          <div className="header__auth" style={{ visibility: 'hidden' }}>
            <span className="auth-link">Connexion</span>
            <span className="auth-btn">Inscription</span>
          </div>
        )}
      </div>
    </header>
  );
}