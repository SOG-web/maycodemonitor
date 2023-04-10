import axios from 'axios';
import { getToken } from '../contexts/AuthContext';

const token = getToken();

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}
