import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import authService from './auth.service';

// Add a request interceptor
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // If 401 Unauthorized and not on the login page, logout the user and dispatch event
        const isLoginPage = window.location.pathname === '/login';
        if (!isLoginPage) {
          authService.logout();
        }
      } else if (error.response.status >= 500) {
        // Server error
        console.error('Server error:', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axios;
