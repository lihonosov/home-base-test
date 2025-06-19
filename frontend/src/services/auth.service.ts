import axios from 'axios';
import { User, LoginResponse, AuthHeader } from '../types/auth.types';

const API_URL = '/api/v1/auth';

// Custom event name for auth state changes
const AUTH_STATE_CHANGE_EVENT = 'authStateChange';

// Helper function to dispatch auth state change event
const dispatchAuthStateChangeEvent = () => {
  window.dispatchEvent(new Event(AUTH_STATE_CHANGE_EVENT));
};

class AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await axios.post(API_URL + '/signin', {
      username,
      password
    });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      // Dispatch event to notify components about auth state change
      dispatchAuthStateChangeEvent();
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('user');
    // Dispatch event to notify components about auth state change
    dispatchAuthStateChangeEvent();
  }

  async register(username: string, email: string, password: string, firstName?: string, lastName?: string): Promise<{ data: any }> {
    return axios.post(API_URL + '/signup', {
      username,
      email,
      password,
      firstName,
      lastName
    });
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user'); // Remove invalid data
        return null;
      }
    }
    return null;
  }

  getAuthHeader(): AuthHeader {
    const user = this.getCurrentUser();
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
}

const authService = new AuthService();
export default authService;
