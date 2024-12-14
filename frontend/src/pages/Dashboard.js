import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Eye, Trash2, Pencil, Share2, Copy } from 'lucide-react';
import { formApi } from '../services/api';
import { toast } from 'react-hot-toast';
export default function Dashboard() {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shareFormId, setShareFormId] = useState(null);
    const [shareLink, setShareLink] = useState('');
    const [showShareDialog, setShowShareDialog] = useState(false);
    const fetchForms = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await formApi.getForms();
            console.log('Fetched forms:', response);
            // Extract forms from the data property
            setForms(response.data || []);
        }
        catch (error) {
            console.error('Error fetching forms:', error);
            toast.error('Failed to load forms');
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchForms();
    }, [fetchForms]);
    const handleShare = async (form) => {
        try {
            // Use the existing shareable link if available
            const shareUrl = form.shareableLink || `${window.location.origin}/forms/${form.id}`;
            setShareLink(shareUrl);
            setShareFormId(form.id);
            setShowShareDialog(true);
            toast.success('Share link ready!');
        }
        catch (error) {
            console.error('Error with share link:', error);
            toast.error('Failed to get share link');
        }
    };
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            toast.success('Share link copied to clipboard!');
        }
        catch (error) {
            console.error('Error copying link:', error);
            toast.error('Failed to copy link');
        }
    };
    const handleDelete = async (formId) => {
        if (!window.confirm('Are you sure you want to delete this form?'))
            return;
        try {
            await formApi.deleteForm(formId);
            toast.success('Form deleted successfully');
            fetchForms(); // Refresh the list
        }
        catch (error) {
            console.error('Error deleting form:', error);
            toast.error('Failed to delete form');
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" }) }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "My Forms" }), _jsxs("button", { onClick: () => navigate('/forms/new'), className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: [_jsx(PlusCircle, { className: "h-5 w-5 mr-2" }), "Create New Form"] })] }), forms.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx(FileText, { className: "mx-auto h-12 w-12 text-gray-400" }), _jsx("h3", { className: "mt-2 text-lg font-medium text-gray-900", children: "No forms yet" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Get started by creating a new form." })] })) : (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: forms.map((form) => (_jsxs("div", { className: `bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200`, children: [_jsx("div", { className: "flex justify-between items-start mb-4", children: _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-gray-900", children: form.title }), form.description && (_jsx("p", { className: "mt-1 text-sm text-gray-600", children: form.description })), _jsx("div", { className: "mt-2 flex items-center", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${form.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'}`, children: form.isActive ? 'Active' : 'Inactive' }) })] }) }), _jsxs("div", { className: "flex flex-wrap gap-3 mt-4", children: [_jsxs("button", { onClick: () => navigate(`/forms/${form.id}`), className: "inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200", children: [_jsx(Eye, { className: "h-4 w-4 mr-1.5" }), "View"] }), _jsxs("button", { onClick: () => navigate(`/forms/${form.id}/edit`), className: "inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors duration-200", children: [_jsx(Pencil, { className: "h-4 w-4 mr-1.5" }), "Edit"] }), _jsxs("button", { onClick: () => handleShare(form), className: "inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 rounded-md transition-colors duration-200", children: [_jsx(Share2, { className: "h-4 w-4 mr-1.5" }), "Share"] }), _jsxs("button", { onClick: () => handleDelete(form.id), className: "inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-200", children: [_jsx(Trash2, { className: "h-4 w-4 mr-1.5" }), "Delete"] })] })] }, form.id))) })), showShareDialog && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-lg w-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Share Form" }), _jsxs("button", { onClick: () => setShowShareDialog(false), className: "text-gray-400 hover:text-gray-500", children: [_jsx("span", { className: "sr-only", children: "Close" }), _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("label", { htmlFor: "share-link", className: "block text-sm font-medium text-gray-700", children: "Share Link" }), _jsxs("div", { className: "mt-1 flex rounded-md shadow-sm", children: [_jsx("input", { type: "text", id: "share-link", value: shareLink, readOnly: true, className: "flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md bg-white text-gray-900 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }), _jsxs("button", { onClick: handleCopyLink, className: "inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: [_jsx(Copy, { className: "h-4 w-4 mr-1.5" }), "Copy"] })] })] }), _jsx("div", { className: "mt-6 flex justify-end", children: _jsx("button", { onClick: () => setShowShareDialog(false), className: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Close" }) })] }) }))] }));
}
