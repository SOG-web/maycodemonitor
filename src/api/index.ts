import axios from 'axios';
import { getToken } from '../contexts/AuthContext';
import { API_BaseURL } from '../constants';
import { LoginRequest, LoginResponse } from './interface/auth/auth-interface';

const token = getToken();

export const api = axios.create({
  baseURL: API_BaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export const login = async (obj: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data, status } = await api.post('/login', {
      email: obj.email,
      password: obj.password,
    });

    if (status !== 200) {
      return { data: null, status: false, error: data };
    }

    return { data, status: true, error: null };
  } catch (error: any) {
    if (error.response) {
      return { data: null, status: false, error: error.response.data };
    }

    if (error.request) {
      return { data: null, status: false, error: error.request };
    }

    return { data: null, status: false, error: error.message };
  }
};
