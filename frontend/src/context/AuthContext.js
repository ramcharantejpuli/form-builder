import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        checkAuth();
    }, []);
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const user = await authApi.getCurrentUser();
                setUser(user);
            }
        }
        catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('token');
        }
        finally {
            setLoading(false);
        }
    };
    const login = async (email, password) => {
        try {
            const { token, user } = await authApi.login(email, password);
            localStorage.setItem('token', token);
            setUser(user);
        }
        catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };
    const register = async (email, password, name) => {
        try {
            const { token, user } = await authApi.register({ email, password, name });
            localStorage.setItem('token', token);
            setUser(user);
        }
        catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
