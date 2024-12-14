import axios from 'axios';
import { API_URL } from '../config';
// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Add response interceptor to handle errors
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = "/login";
    }
    return Promise.reject(error);
});
export const authApi = {
    login: async (email, password) => {
        try {
            console.log('Logging in with:', email);
            const response = await api.post("/auth/login", { email, password });
            console.log('Login response:', response);
            localStorage.setItem('token', response.data.token);
            return response.data;
        }
        catch (error) {
            console.error("Login error:", error);
            throw handleApiError(error);
        }
    },
    register: async (userData) => {
        try {
            console.log('Registering user with:', userData.email);
            const response = await api.post("/auth/register", userData);
            console.log('Register response:', response);
            localStorage.setItem('token', response.data.token);
            return response.data;
        }
        catch (error) {
            console.error("Registration error:", error);
            throw handleApiError(error);
        }
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    getCurrentUser: async () => {
        try {
            console.log('Fetching current user');
            const response = await api.get("/auth/me");
            console.log('Get current user response:', response);
            return response.data;
        }
        catch (error) {
            console.error("Get current user error:", error);
            throw handleApiError(error);
        }
    },
    updateProfile: async (userData) => {
        try {
            console.log('Updating profile with:', userData);
            const response = await api.put("/auth/profile", userData);
            console.log('Update profile response:', response);
            return response.data;
        }
        catch (error) {
            console.error("Update profile error:", error);
            throw handleApiError(error);
        }
    },
};
export const formApi = {
    getForms: async () => {
        try {
            console.log('Fetching forms from:', `${API_URL}/forms`);
            const response = await api.get('/forms');
            console.log('Forms response:', response.data);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching forms:', error);
            throw handleApiError(error);
        }
    },
    getForm: async (id) => {
        try {
            const response = await api.get(`/forms/${id}`);
            return response.data.data;
        }
        catch (error) {
            throw handleApiError(error);
        }
    },
    createForm: async (formData) => {
        try {
            const response = await api.post('/forms', formData);
            return response.data.data;
        }
        catch (error) {
            throw handleApiError(error);
        }
    },
    updateForm: async (id, formData) => {
        try {
            const response = await api.put(`/forms/${id}`, formData);
            return response.data.data;
        }
        catch (error) {
            throw handleApiError(error);
        }
    },
    deleteForm: async (id) => {
        try {
            await api.delete(`/forms/${id}`);
        }
        catch (error) {
            throw handleApiError(error);
        }
    },
    getShareLink: async (id) => {
        try {
            const response = await api.post(`/forms/${id}/share`);
            return response.data.shareLink;
        }
        catch (error) {
            throw handleApiError(error);
        }
    },
    submitForm: async (id, formData) => {
        try {
            const response = await api.post(`/forms/${id}/submit`, formData);
            return response.data.data;
        }
        catch (error) {
            throw handleApiError(error);
        }
    }
};
const handleApiError = (error) => {
    console.error('API Error:', error);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorData = error.response.data;
        throw {
            status: error.response.status,
            message: errorData.message || 'An error occurred',
            details: errorData.details || [],
        };
    }
    else if (error.request) {
        // The request was made but no response was received
        throw {
            status: 0,
            message: 'No response from server. Please check your connection.',
            details: [],
        };
    }
    else {
        // Something happened in setting up the request that triggered an Error
        throw {
            status: 0,
            message: error.message || 'An error occurred',
            details: [],
        };
    }
};
export default api;
