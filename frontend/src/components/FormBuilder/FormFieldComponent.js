import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { GripVertical, Settings, Trash2 } from 'lucide-react';
import FormFieldInput from '../FormFields/FormFieldInput';
import FieldSettingsDialog from './FieldSettingsDialog';
export default function FormFieldComponent({ field, onUpdate, onDelete, isPreview = false, }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const handleFieldChange = (value) => {
        const updatedField = {
            ...field,
            value: value
        };
        console.log('Updating field:', updatedField);
        onUpdate(updatedField);
    };
    const handleSettingsUpdate = (updatedSettings) => {
        onUpdate({
            ...field,
            ...updatedSettings,
        });
        setIsSettingsOpen(false);
    };
    return (_jsxs("div", { className: "group relative flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm", children: [!isPreview && (_jsx("div", { className: "cursor-move text-gray-400", children: _jsx(GripVertical, { className: "h-5 w-5" }) })), _jsxs("div", { className: "flex-1", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700", children: [field.label, field.validation?.required && _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("div", { className: "mt-1", children: _jsx(FormFieldInput, { field: field, value: field.value, onChange: handleFieldChange, isBuilder: !isPreview }) })] }), !isPreview && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { type: "button", onClick: () => setIsSettingsOpen(true), className: "rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500", children: _jsx(Settings, { className: "h-5 w-5" }) }), _jsx("button", { type: "button", onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }, className: "rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500", children: _jsx(Trash2, { className: "h-5 w-5" }) })] })), isSettingsOpen && (_jsx(FieldSettingsDialog, { field: field, onClose: () => setIsSettingsOpen(false), onUpdate: handleSettingsUpdate }))] }));
}
