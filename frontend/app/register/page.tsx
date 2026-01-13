'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/UserContext';
import { RegisterData, FormSubmitHandler, InputChangeHandler } from '../types';
import '../assets/scss/auth.scss';

// Regex pour validation du mot de passe côté frontend
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Interface pour l'état du formulaire d'inscription
interface RegisterFormState extends RegisterData {
  confirmPassword: string;
}

// Page d'inscription avec design moderne
export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  
  // État du formulaire
  const [formData, setFormData] = useState<RegisterFormState>({
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldValidation, setFieldValidation] = useState<Record<string, boolean>>({});

  // Rediriger si déjà connecté
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  // Gestionnaire de changement des champs avec validation en temps réel
  const handleChange: InputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validation en temps réel
    validateField(name, value);
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation d'un champ spécifique
  const validateField = (name: string, value: string) => {
    let isValid = false;

    switch (name) {
      case 'prenom':
        isValid = value.trim().length >= 2;
        break;
      case 'email':
        isValid = EMAIL_REGEX.test(value);
        break;
      case 'password':
        isValid = PASSWORD_REGEX.test(value);
        break;
      case 'confirmPassword':
        isValid = value === formData.password && value.length > 0;
        break;
    }

    setFieldValidation(prev => ({
      ...prev,
      [name]: isValid
    }));
  };

  // Validation côté client
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation du prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    } else if (formData.prenom.trim().length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (!PASSWORD_REGEX.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, 1 lettre et 1 caractère spécial';
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit: FormSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparer les données pour l'API (sans confirmPassword)
      const { confirmPassword, ...registerData } = formData;
      
      // Tentative d'inscription
      await register(registerData);
      
      // Redirection vers la page d'accueil
      router.push('/');
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Erreur lors de l\'inscription'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour obtenir la classe CSS du champ
  const getInputClass = (fieldName: string) => {
    if (errors[fieldName]) return 'error';
    if (fieldValidation[fieldName]) return 'success';
    return '';
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        {/* En-tête avec logo */}
        <div className="auth-page__header">
          <div className="logo"></div>
          <h1>Inscription</h1>
          <p>
            Créez votre compte Fenêtres Pro ou{' '}
            <Link href="/login">connectez-vous à votre compte existant</Link>
          </p>
        </div>

        {/* Formulaire */}
        <form className="auth-page__form" onSubmit={handleSubmit}>
          {/* Affichage des erreurs générales */}
          {errors.general && (
            <div className="error-alert">
              {errors.general}
            </div>
          )}

          {/* Champ Prénom */}
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <div className="input-wrapper">
              <input
                id="prenom"
                name="prenom"
                type="text"
                autoComplete="given-name"
                required
                value={formData.prenom}
                onChange={handleChange}
                className={getInputClass('prenom')}
                placeholder="Votre prénom"
              />
              <span className="input-icon">👤</span>
            </div>
            {errors.prenom && (
              <div className="error-message">{errors.prenom}</div>
            )}
          </div>

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
                className={getInputClass('email')}
                placeholder="votre@email.com"
              />
              <span className="input-icon">📧</span>
            </div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={getInputClass('password')}
                placeholder="Mot de passe sécurisé"
              />
              <span className="input-icon">🔒</span>
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
            <div className="help-text">
              Au moins 8 caractères avec chiffres, lettres et caractères spéciaux
            </div>
          </div>

          {/* Champ Confirmation mot de passe */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <div className="input-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={getInputClass('confirmPassword')}
                placeholder="Confirmez votre mot de passe"
              />
              <span className="input-icon">🔐</span>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting && <span className="loading-spinner"></span>}
            {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-page__divider">
          <span>Déjà un compte ?</span>
        </div>

        {/* Lien vers la connexion */}
        <div className="auth-page__link">
          <Link href="/login">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}