import axios from 'axios';
import { API_URL } from '../config';
import { Form, FormSubmission } from '../types/form';

interface ApiResponse<T> {
  message: string;
  data: T;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to add auth token
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

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string): Promise<any> => {
    try {
      console.log('Logging in with:', email);
      const response = await api.post("/auth/login", { email, password });
      console.log('Login response:', response);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw handleApiError(error);
    }
  },

  register: async (userData: { email: string; password: string; name: string }): Promise<any> => {
    try {
      console.log('Registering user with:', userData.email);
      const response = await api.post("/auth/register", userData);
      console.log('Register response:', response);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw handleApiError(error);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<any> => {
    try {
      console.log('Fetching current user');
      const response = await api.get("/auth/me");
      console.log('Get current user response:', response);
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);
      throw handleApiError(error);
    }
  },

  updateProfile: async (userData: { name?: string; email?: string; password?: string }): Promise<any> => {
    try {
      console.log('Updating profile with:', userData);
      const response = await api.put("/auth/profile", userData);
      console.log('Update profile response:', response);
      return response.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw handleApiError(error);
    }
  },
};

export const formApi = {
  getForms: async (): Promise<ApiResponse<Form[]>> => {
    try {
      console.log('Fetching forms from:', `${API_URL}/forms`);
      const response = await api.get<ApiResponse<Form[]>>('/forms');
      console.log('Forms response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching forms:', error);
      throw handleApiError(error);
    }
  },

  getForm: async (id: string): Promise<Form> => {
    try {
      const response = await api.get<ApiResponse<Form>>(`/forms/${id}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createForm: async (formData: Partial<Form>): Promise<Form> => {
    try {
      const response = await api.post<ApiResponse<Form>>('/forms', formData);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateForm: async (id: string, formData: Partial<Form>): Promise<Form> => {
    try {
      const response = await api.put<ApiResponse<Form>>(`/forms/${id}`, formData);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteForm: async (id: string): Promise<void> => {
    try {
      await api.delete(`/forms/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getShareLink: async (id: string): Promise<string> => {
    try {
      const response = await api.post(`/forms/${id}/share`);
      return response.data.shareLink;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  submitForm: async (id: string, formData: any): Promise<FormSubmission> => {
    try {
      const response = await api.post<ApiResponse<FormSubmission>>(`/forms/${id}/submit`, formData);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

const handleApiError = (error: any) => {
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
  } else if (error.request) {
    // The request was made but no response was received
    throw {
      status: 0,
      message: 'No response from server. Please check your connection.',
      details: [],
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    throw {
      status: 0,
      message: error.message || 'An error occurred',
      details: [],
    };
  }
};

export default api;
