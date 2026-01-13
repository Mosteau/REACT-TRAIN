'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginData, RegisterData, AuthResponse } from '../types';
import { buildApiUrl, API_CONFIG } from '../config/api';

// Interface pour le contexte utilisateur
interface UserContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// Création du contexte avec valeur par défaut
const UserContext = createContext<UserContextType | undefined>(undefined);

// Props pour le provider
interface UserProviderProps {
  children: ReactNode;
}

// Clés pour le localStorage
const TOKEN_KEY = 'fenetre_app_token';
const USER_KEY = 'fenetre_app_user';

// Provider du contexte utilisateur
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Calculer si l'utilisateur est authentifié
  const isAuthenticated = !!user && !!token;

  // Fonction pour sauvegarder les données d'authentification
  const saveAuthData = (authData: AuthResponse) => {
    setUser(authData.user);
    setToken(authData.token);
    localStorage.setItem(TOKEN_KEY, authData.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
  };

  // Fonction pour nettoyer les données d'authentification
  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  // Fonction de connexion
  const login = async (credentials: LoginData) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la connexion');
      }

      const authData: AuthResponse = await response.json();
      saveAuthData(authData);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  // Fonction d'inscription
  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'inscription');
      }

      const authData: AuthResponse = await response.json();
      saveAuthData(authData);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    clearAuthData();
    // Optionnel : appeler l'API de déconnexion
    fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).catch(console.error);
  };

  // Fonction pour rafraîchir les données utilisateur
  const refreshUser = async () => {
    if (!token) return;

    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token invalide ou expiré
        clearAuthData();
        return;
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
      clearAuthData();
    }
  };

  // Effet pour charger les données d'authentification au démarrage
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données auth:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Effet pour vérifier la validité du token au chargement
  useEffect(() => {
    if (token && !isLoading) {
      refreshUser();
    }
  }, [token, isLoading]);

  const value: UserContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte utilisateur
export function useAuth(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un UserProvider');
  }
  return context;
}