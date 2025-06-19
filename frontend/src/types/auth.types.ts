export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
  type?: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
  type: string;
}

export interface AuthHeader {
  Authorization?: string;
}