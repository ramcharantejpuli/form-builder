import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
const FIELD_TYPES = [
    {
        type: 'text',
        label: 'Text Input',
        description: 'Single line text input for short answers',
    },
    {
        type: 'textarea',
        label: 'Text Area',
        description: 'Multi-line text input for longer answers',
    },
    {
        type: 'number',
        label: 'Number',
        description: 'Input field for numerical values',
    },
    {
        type: 'email',
        label: 'Email',
        description: 'Input field for email addresses',
    },
    {
        type: 'tel',
        label: 'Phone',
        description: 'Input field for phone numbers',
    },
    {
        type: 'date',
        label: 'Date',
        description: 'Input field for selecting dates',
    },
    {
        type: 'time',
        label: 'Time',
        description: 'Input field for selecting times',
    },
    {
        type: 'select',
        label: 'Dropdown',
        description: 'Dropdown menu for selecting from predefined options',
    },
    {
        type: 'radio',
        label: 'Radio Buttons',
        description: 'Radio buttons for selecting one option from a list',
    },
    {
        type: 'checkbox',
        label: 'Checkbox',
        description: 'Checkbox for yes/no or true/false selections',
    },
];
export default function AddFieldDialog({ isOpen, onClose, onAdd, }) {
    const handleAddField = (type) => {
        const newField = {
            id: uuidv4(),
            type,
            label: `New ${type} field`,
            name: `field_${uuidv4().split('-')[0]}`,
            placeholder: '',
            description: '',
            validation: {
                required: false,
            },
            options: type === 'select' || type === 'radio' ? [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
            ] : undefined,
        };
        onAdd(newField);
        onClose();
    };
    return (_jsx(Dialog, { open: isOpen, onClose: onClose, className: "fixed inset-0 z-10 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-screen items-center justify-center", children: [_jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black opacity-30" }), _jsxs("div", { className: "relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx(Dialog.Title, { className: "text-lg font-medium text-gray-900", children: "Add Form Field" }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: FIELD_TYPES.map((fieldType) => (_jsxs("button", { onClick: () => handleAddField(fieldType.type), className: "flex flex-col items-center p-4 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors", children: [_jsx("span", { className: "text-sm font-medium text-gray-900", children: fieldType.label }), _jsx("span", { className: "mt-1 text-xs text-gray-500 text-center", children: fieldType.description })] }, fieldType.type))) })] })] }) }));
}
