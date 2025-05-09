import axios from 'axios';

/**
 * Axios instance with base configuration
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authentication token
 * @param {import('axios').AxiosRequestConfig} config - The request configuration
 * @returns {import('axios').AxiosRequestConfig} The modified request configuration
 */
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

/**
 * Response interceptor to handle authentication errors
 * @param {import('axios').AxiosResponse} response - The response object
 * @param {import('axios').AxiosError} error - The error object
 * @returns {Promise<import('axios').AxiosResponse>} The response or rejected promise
 */
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

export default api; 