import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones de API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const dataAPI = {
  getSales: () => api.get('/data/sales'),
  getUsers: () => api.get('/data/users'),
  getCategories: () => api.get('/data/categories'),
  getReports: () => api.get('/data/reports'),
};

export default api;