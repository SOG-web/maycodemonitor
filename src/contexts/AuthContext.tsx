import { createContext } from 'react';

export interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: {
    name: string;
    email: string;
  } | null;
  setUser: (user: { name: string; email: string }) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): void => {
  if (username === 'admin' && password === 'admin') {
    setToken('token');
    return;
  }

  throw new Error('Invalid username or password');
};

export const logout = (): void => {
  removeToken();
  return;
};

const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const removeToken = (): void => {
  localStorage.removeItem('token');
};
