import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Settings2 } from 'lucide-react';
import FormFieldInput from './FormFieldInput';
import ValidationRuleBuilder from '../FormFields/ValidationRules/ValidationRuleBuilder';
export default function DraggableField({ field, index, onUpdate, onDelete, allFields }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showValidationBuilder, setShowValidationBuilder] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, } = useSortable({ id: field.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    const handleFieldUpdate = (updates) => {
        onUpdate(index, { ...field, ...updates });
    };
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        handleFieldUpdate({
            [name]: type === 'checkbox' ? e.target.checked : value,
        });
    };
    const handleValidationChange = (e) => {
        const { name, value, type } = e.target;
        handleFieldUpdate({
            validation: {
                ...field.validation,
                [name]: type === 'checkbox' ? e.target.checked : value,
            },
        });
    };
    const handleOptionChange = (index, key, newValue) => {
        const newOptions = [...(field.options || [])];
        newOptions[index] = {
            ...newOptions[index],
            [key]: newValue,
        };
        handleFieldUpdate({ options: newOptions });
    };
    const addOption = () => {
        const newOptions = [
            ...(field.options || []),
            { label: `Option ${(field.options?.length || 0) + 1}`, value: `option-${(field.options?.length || 0) + 1}` },
        ];
        handleFieldUpdate({ options: newOptions });
    };
    const removeOption = (index) => {
        const newOptions = [...(field.options || [])];
        newOptions.splice(index, 1);
        handleFieldUpdate({ options: newOptions });
    };
    return (_jsxs("div", { ref: setNodeRef, style: style, className: `bg-white rounded-lg border ${isDragging ? 'border-indigo-500' : 'border-gray-200'} p-4`, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("button", { type: "button", ...attributes, ...listeners, className: "cursor-move", children: _jsx(GripVertical, { className: "h-5 w-5 text-gray-400" }) }), _jsx("div", { className: "flex-1", children: _jsx(FormFieldInput, { field: field, onUpdate: handleFieldUpdate, isBuilder: true }) })] }) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { type: "button", onClick: () => setShowValidationBuilder(true), className: "text-sm text-indigo-600 hover:text-indigo-700", children: "Validation Rules" }), _jsx("button", { type: "button", onClick: () => setIsSettingsOpen(!isSettingsOpen), className: "text-gray-400 hover:text-gray-500", children: _jsx(Settings2, { className: "h-5 w-5" }) }), _jsx("button", { type: "button", onClick: () => onDelete(index), className: "text-gray-400 hover:text-gray-500", children: _jsx(Trash2, { className: "h-5 w-5" }) })] })] }), isSettingsOpen && (_jsxs("div", { className: "mt-4 space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Field Label" }), _jsx("input", { type: "text", name: "label", value: field.label, onChange: handleInputChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Field Name" }), _jsx("input", { type: "text", name: "name", value: field.name, onChange: handleInputChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Placeholder" }), _jsx("input", { type: "text", name: "placeholder", value: field.placeholder || '', onChange: handleInputChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }), (field.type === 'select' || field.type === 'radio') && (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Options" }), _jsx("button", { type: "button", onClick: addOption, className: "text-sm text-indigo-600 hover:text-indigo-700", children: "Add Option" })] }), _jsx("div", { className: "space-y-2", children: field.options?.map((option, optionIndex) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: option.label, onChange: (e) => handleOptionChange(optionIndex, 'label', e.target.value), placeholder: "Option Label", className: "flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" }), _jsx("input", { type: "text", value: option.value, onChange: (e) => handleOptionChange(optionIndex, 'value', e.target.value), placeholder: "Option Value", className: "flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" }), _jsx("button", { type: "button", onClick: () => removeOption(optionIndex), className: "text-red-500 hover:text-red-700", children: _jsx(Trash2, { className: "h-5 w-5" }) })] }, optionIndex))) })] }))] })), showValidationBuilder && (_jsx(ValidationRuleBuilder, { field: field, onUpdate: handleFieldUpdate, onClose: () => setShowValidationBuilder(false), allFields: allFields }))] }));
}
