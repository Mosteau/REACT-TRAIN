// Point d'entrée principal pour tous les types
// Permet d'importer tous les types depuis un seul endroit

// Réexport des types d'entités
export * from './entities/fenetre';
export * from './entities/pagination';
export * from './entities/user';

// Réexport des types API
export * from './api';

// Réexport des types de composants
export * from './components';

// Types utilitaires globaux
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Types pour les événements courants
export type FormSubmitHandler = (e: React.FormEvent) => void;
export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type ButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;