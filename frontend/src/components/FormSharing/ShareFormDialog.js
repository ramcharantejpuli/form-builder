import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { formApi } from '../../services/api';
export default function ShareFormDialog({ isOpen, onClose, formId, currentSettings, }) {
    const [settings, setSettings] = useState(currentSettings);
    const [shareLink, setShareLink] = useState('');
    const [loading, setLoading] = useState(false);
    const handleGenerateLink = async () => {
        setLoading(true);
        try {
            const response = await formApi.generateShareLink(formId);
            setShareLink(response.shareLink);
            toast.success('Share link generated successfully!');
        }
        catch (error) {
            toast.error('Failed to generate share link');
        }
        finally {
            setLoading(false);
        }
    };
    const handleSaveSettings = async () => {
        setLoading(true);
        try {
            await formApi.updateShareSettings(formId, settings);
            toast.success('Share settings updated successfully!');
            onClose();
        }
        catch (error) {
            toast.error('Failed to update share settings');
        }
        finally {
            setLoading(false);
        }
    };
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            toast.success('Link copied to clipboard!');
        }
        catch (error) {
            toast.error('Failed to copy link');
        }
    };
    return (_jsxs(Dialog, { open: isOpen, onClose: onClose, className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { className: "mx-auto max-w-lg rounded-lg bg-white p-6", children: [_jsx(Dialog.Title, { className: "text-lg font-medium leading-6 text-gray-900 mb-4", children: "Share Form" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Who can access this form?" }), _jsxs("select", { value: settings.accessLevel, onChange: (e) => setSettings({ ...settings, accessLevel: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", children: [_jsx("option", { value: "private", children: "Private - Only me" }), _jsx("option", { value: "restricted", children: "Restricted - Anyone with the link" }), _jsx("option", { value: "public", children: "Public - Anyone can access" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Submission Settings" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: settings.allowSubmissions, onChange: (e) => setSettings({ ...settings, allowSubmissions: e.target.checked }), className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" }), _jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Allow form submissions" })] }), _jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: settings.requireAuth, onChange: (e) => setSettings({ ...settings, requireAuth: e.target.checked }), className: "rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4" }), _jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Require authentication to submit" })] })] })] }), settings.accessLevel !== 'private' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Share Link" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: shareLink, readOnly: true, className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", placeholder: "Generate a share link..." }), _jsx("button", { type: "button", onClick: handleGenerateLink, disabled: loading, className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Generate" }), shareLink && (_jsx("button", { type: "button", onClick: copyToClipboard, className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Copy" }))] })] }))] }), _jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [_jsx("button", { type: "button", onClick: onClose, className: "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSaveSettings, disabled: loading, className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Save Settings" })] })] }) })] }));
}
