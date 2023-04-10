import { createContext } from 'react';

export interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: {
    name: string;
    email: string;
  } | null;
  setUser: (user: { name: string; email: string } | null) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const logout = (): void => {
  removeToken();
  return;
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const removeToken = (): void => {
  localStorage.removeItem('token');
};
