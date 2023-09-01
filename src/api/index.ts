import axios from 'axios';
import { getToken } from '../contexts/AuthContext';
import { API_BaseURL } from '../constants';
import { LoginRequest, LoginResponse } from './interface/auth/auth-interface';
import { RecordResponse } from './interface/records/record.interface';

const token = getToken();

export const api = axios.create({
  baseURL: API_BaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export const updateControl = async (
  name: string,
  st: boolean
): Promise<any> => {
  try {
    const { data, status } = await api.put('/controls', {
      name,
      status: st,
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

export const setControl = async (name: string, st: boolean): Promise<any> => {
  try {
    const { data, status } = await api.post('/controls', {
      name,
      status: st,
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

export const getControls = async (): Promise<any> => {
  try {
    const { data, status } = await api.get('/controls');

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

export const getRecords = async (): Promise<RecordResponse> => {
  try {
    const { data, status } = await api.get('/records');

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

export const deleteRecord = async (id: string): Promise<RecordResponse> => {
  try {
    const { data, status } = await api.delete(`/record/${id}`);

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
