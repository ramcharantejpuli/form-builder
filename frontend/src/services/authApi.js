import axios from 'axios';
import { API_BASE_URL } from '../config';
const api = axios.create({
    baseURL: API_BASE_URL,
});
// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const authApi = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            return response.data;
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    register: async (email, password, name) => {
        try {
            const response = await api.post('/auth/register', { email, password, name });
            return response.data;
        }
        catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        }
        catch (error) {
            console.error('Get current user error:', error);
            throw error;
        }
    },
    updateProfile: async (data) => {
        try {
            const response = await api.put('/auth/profile', data);
            return response.data;
        }
        catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    },
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            return response.data;
        }
        catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    },
    resetPassword: async (token, newPassword) => {
        try {
            const response = await api.post('/auth/reset-password', { token, newPassword });
            return response.data;
        }
        catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    },
};
