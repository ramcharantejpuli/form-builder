import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/FormBuilder';
import FormView from './pages/FormView';
import FormSubmissionView from './components/FormSubmission/FormSubmissionView';
import './App.css';
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsxs(Router, { children: [_jsx("div", { className: "min-h-screen bg-gray-50", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/forms/new", element: _jsx(ProtectedRoute, { children: _jsx(FormBuilder, {}) }) }), _jsx(Route, { path: "/forms/:id/edit", element: _jsx(ProtectedRoute, { children: _jsx(FormBuilder, {}) }) }), _jsx(Route, { path: "/forms/:id", element: _jsx(FormView, {}) }), _jsx(Route, { path: "/forms/:formId/submissions", element: _jsx(ProtectedRoute, { children: _jsx(FormSubmissionView, {}) }) })] }) }), _jsx(Toaster, { position: "top-right", toastOptions: {
                            duration: 3000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                iconTheme: {
                                    primary: '#4ade80',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                duration: 4000,
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        } })] }) }) }));
}
