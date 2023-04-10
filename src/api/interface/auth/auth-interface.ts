import { API_BASE } from '..';

export interface LoginResponse extends API_BASE {
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}
