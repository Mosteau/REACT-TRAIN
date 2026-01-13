// Configuration des URLs d'API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile',
    },
    FENETRES: {
      LIST: '/api/fenetres',
      DETAIL: (id: number) => `/api/fenetres/${id}`,
      CREATE: '/api/fenetres',
      UPDATE: (id: number) => `/api/fenetres/${id}`,
      DELETE: (id: number) => `/api/fenetres/${id}`,
    }
  }
};

// Helper pour construire les URLs complètes
export const buildApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`;