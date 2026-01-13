'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/UserContext';
import { LoginData, FormSubmitHandler, InputChangeHandler } from '../types';
import '../assets/scss/auth.scss';

// Page de connexion avec design moderne
export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  
  // État du formulaire
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  // Gestionnaire de changement des champs
  const handleChange: InputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError('');
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Validation côté client
      if (!formData.email || !formData.password) {
        throw new Error('Tous les champs sont requis');
      }

      // Tentative de connexion
      await login(formData);
      
      // Redirection vers la page d'accueil
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour copier les identifiants de test
  const copyTestAccount = (email: string, password: string) => {
    setFormData({ email, password });
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        {/* En-tête avec logo */}
        <div className="auth-page__header">
          <div className="logo"></div>
          <h1>Connexion</h1>
          <p>
            Accédez à votre espace Fenêtres Pro ou{' '}
            <Link href="/register">créez un nouveau compte</Link>
          </p>
        </div>

        {/* Formulaire */}
        <form className="auth-page__form" onSubmit={handleSubmit}>
          {/* Affichage des erreurs */}
          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          {/* Champ Email */}
          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <div className="input-wrapper">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting && <span className="loading-spinner"></span>}
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Comptes de test */}
        <div className="auth-page__test-accounts">
          <h3>Comptes de test disponibles</h3>
          <div className="account-list">
            <div className="test-account" onClick={() => copyTestAccount('jean@test.com', 'Test123!')}>
              <span className="account-info">📧 jean@test.com | 🔑 Test123!</span>
              <span className="copy-button" title="Cliquer pour remplir"></span>
            </div>
            <div className="test-account" onClick={() => copyTestAccount('marie@test.com', 'Test123!')}>
              <span className="account-info">📧 marie@test.com | 🔑 Test123!</span>
              <span className="copy-button" title="Cliquer pour remplir"></span>
            </div>
            <div className="test-account" onClick={() => copyTestAccount('pierre@test.com', 'Test123!')}>
              <span className="account-info">📧 pierre@test.com | 🔑 Test123!</span>
              <span className="copy-button" title="Cliquer pour remplir"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}