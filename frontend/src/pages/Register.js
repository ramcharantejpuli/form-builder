import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success('Registration successful!');
            navigate('/dashboard');
        }
        catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Create your account" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Or", ' ', _jsx(Link, { to: "/login", className: "font-medium text-indigo-600 hover:text-indigo-500", children: "sign in to your account" })] })] }), _jsxs("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { className: "rounded-md shadow-sm -space-y-px", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "sr-only", children: "Full name" }), _jsx("input", { id: "name", name: "name", type: "text", required: true, value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), className: "appearance-none rounded-t-md relative block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Full name" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "sr-only", children: "Email address" }), _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), className: "appearance-none relative block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Email address" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "sr-only", children: "Password" }), _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), className: "appearance-none rounded-b-md relative block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Password" })] })] }), _jsx("div", { children: _jsx("button", { type: "submit", className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Create account" }) })] })] }) }));
}