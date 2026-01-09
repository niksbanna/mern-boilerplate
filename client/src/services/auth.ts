import api from './api';
import { LoginCredentials, RegisterData, ApiResponse, AuthResponse, User } from '../types';

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },

  async login(credentials: LoginCredentials) {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data;
  },

  async logout() {
    const response = await api.post<ApiResponse>('/auth/logout');
    return response.data;
  },

  async refreshToken() {
    const response = await api.post<ApiResponse<{ accessToken: string }>>('/auth/refresh');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data;
  },
};
