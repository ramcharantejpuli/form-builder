import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Plus, Minus } from 'lucide-react';
export default function FieldSettingsDialog({ isOpen, onClose, field, onUpdate, }) {
    const [editedField, setEditedField] = useState({ ...field });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleRequiredChange = (e) => {
        setEditedField((prev) => ({
            ...prev,
            required: e.target.checked,
        }));
    };
    const handleOptionChange = (index, field, value) => {
        setEditedField((prev) => {
            const newOptions = [...(prev.options || [])];
            newOptions[index] = {
                ...newOptions[index],
                [field]: value,
            };
            return {
                ...prev,
                options: newOptions,
            };
        });
    };
    const handleAddOption = () => {
        setEditedField((prev) => ({
            ...prev,
            options: [
                ...(prev.options || []),
                { label: `Option ${(prev.options || []).length + 1}`, value: `option_${(prev.options || []).length + 1}` },
            ],
        }));
    };
    const handleRemoveOption = (index) => {
        setEditedField((prev) => ({
            ...prev,
            options: prev.options?.filter((_, i) => i !== index) || [],
        }));
    };
    const handleSave = () => {
        onUpdate(editedField);
        onClose();
    };
    return (_jsx(Dialog, { open: isOpen, onClose: onClose, className: "fixed inset-0 z-10 overflow-y-auto", children: _jsxs("div", { className: "min-h-screen px-4 text-center", children: [_jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black opacity-30" }), _jsxs("div", { className: "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Dialog.Title, { as: "h3", className: "text-lg font-medium leading-6 text-gray-900", children: "Field Settings" }), _jsx("button", { onClick: onClose, className: "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none", children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("div", { className: "mt-4 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Label" }), _jsx("input", { type: "text", name: "label", value: editedField.label || '', onChange: handleInputChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Name" }), _jsx("input", { type: "text", name: "name", value: editedField.name || '', onChange: handleInputChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Description" }), _jsx("textarea", { name: "description", value: editedField.description || '', onChange: handleInputChange, rows: 3, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", name: "required", checked: editedField.required || false, onChange: handleRequiredChange, className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" }), _jsx("label", { className: "ml-2 block text-sm text-gray-900", children: "Required" })] }), (editedField.type === 'select' ||
                                    editedField.type === 'radio' ||
                                    editedField.type === 'checkbox') && (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Options" }), editedField.options?.map((option, index) => (_jsxs("div", { className: "flex space-x-2", children: [_jsx("input", { type: "text", value: option.label, onChange: (e) => handleOptionChange(index, 'label', e.target.value), placeholder: "Label", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" }), _jsx("input", { type: "text", value: option.value, onChange: (e) => handleOptionChange(index, 'value', e.target.value), placeholder: "Value", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" }), _jsx("button", { onClick: () => handleRemoveOption(index), className: "p-2 text-gray-400 hover:text-gray-500", children: _jsx(Minus, { className: "h-5 w-5" }) })] }, index))), _jsxs("button", { onClick: handleAddOption, className: "flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-500", children: [_jsx(Plus, { className: "h-5 w-5" }), _jsx("span", { children: "Add Option" })] })] }))] }), _jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Cancel" }), _jsx("button", { onClick: handleSave, className: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Save Changes" })] })] })] }) }));
}
