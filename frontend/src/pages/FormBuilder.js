import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import DraggableField from '../components/FormFields/DraggableField';
import FieldTypeSelector from '../components/FormFields/FieldTypeSelector';
import { formApi } from '../services/api';
import ShareFormDialog from '../components/FormSharing/ShareFormDialog';
export default function FormBuilder() {
    const navigate = useNavigate();
    const { id: formIdParam } = useParams();
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [fields, setFields] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);
    useEffect(() => {
        if (formIdParam) {
            loadForm(formIdParam);
        }
    }, [formIdParam]);
    const loadForm = async (id) => {
        try {
            const response = await formApi.getForm(id);
            const form = response.form;
            setFormTitle(form.title);
            setFormDescription(form.description || '');
            setFields(form.fields);
            setCurrentForm(form);
        }
        catch (error) {
            toast.error('Failed to load form');
            navigate('/forms');
        }
    };
    const handleAddField = (type) => {
        const newField = {
            id: uuidv4(),
            type,
            label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} field`,
            name: `field_${uuidv4().split('-')[0]}`,
            required: false,
            options: type === 'select' || type === 'radio' ? [
                { label: 'Option 1', value: 'option-1' },
                { label: 'Option 2', value: 'option-2' }
            ] : undefined,
            placeholder: '',
            validation: {
                required: false,
                pattern: '',
                minLength: undefined,
                maxLength: undefined,
                min: undefined,
                max: undefined,
            },
        };
        setFields([...fields, newField]);
    };
    const handleFieldUpdate = (fieldId, updates) => {
        setFields(fields.map(field => field.id === fieldId ? { ...field, ...updates } : field));
    };
    const handleFieldDelete = (fieldId) => {
        setFields(fields.filter(field => field.id !== fieldId));
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex(field => field.id === active.id);
            const newIndex = fields.findIndex(field => field.id === over.id);
            const newFields = [...fields];
            const [movedField] = newFields.splice(oldIndex, 1);
            newFields.splice(newIndex, 0, movedField);
            setFields(newFields);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formFields = fields.map(field => ({
                ...field,
                label: field.label.trim(),
                name: field.name.trim(),
                placeholder: field.placeholder?.trim() || '',
                required: field.validation?.required || false,
                validation: {
                    required: field.validation?.required || false,
                    minLength: field.validation?.minLength || undefined,
                    maxLength: field.validation?.maxLength || undefined,
                    min: field.validation?.min || undefined,
                    max: field.validation?.max || undefined,
                    pattern: field.validation?.pattern || undefined,
                },
                options: field.type === 'select' || field.type === 'radio'
                    ? (field.options?.map(opt => ({
                        label: opt.label.trim(),
                        value: opt.value.trim()
                    })) || [])
                    : undefined
            }));
            const formData = {
                title: formTitle.trim(),
                description: formDescription.trim() || undefined,
                fields: formFields,
                isActive: true,
                settings: {
                    allowMultipleSubmissions: true,
                    requireAuthentication: false,
                    notifyOnSubmission: false,
                    submitButtonText: 'Submit',
                    successMessage: 'Thank you for your submission!'
                }
            };
            console.log('Form submission data:', JSON.stringify(formData, null, 2));
            let response;
            if (formIdParam) {
                response = await formApi.updateForm(formIdParam, formData);
                toast.success('Form updated successfully!');
                navigate(`/forms/${formIdParam}/edit`);
            }
            else {
                response = await formApi.createForm(formData);
                toast.success('Form created successfully!');
                navigate('/dashboard', { replace: true });
            }
            if (response?.form) {
                setCurrentForm(response.form);
            }
        }
        catch (error) {
            console.error('Form submission error:', error);
            let errorMessage = 'Failed to save form';
            if (error?.details && Array.isArray(error.details)) {
                errorMessage = error.details
                    .map((detail) => detail.message || detail.error)
                    .filter(Boolean)
                    .join(', ');
            }
            else if (error?.message) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: formIdParam ? 'Edit Form' : 'Create New Form' }), _jsxs("div", { className: "flex space-x-4", children: [currentForm && (_jsx("button", { type: "button", onClick: () => setShowShareDialog(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700", children: "Share Form" })), _jsx("button", { type: "submit", disabled: isSubmitting, className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50", children: isSubmitting ? 'Saving...' : formIdParam ? 'Update Form' : 'Create Form' })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700", children: "Form Title" }), _jsx("input", { type: "text", id: "title", value: formTitle, onChange: (e) => setFormTitle(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", placeholder: "Enter form title" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700", children: "Form Description (Optional)" }), _jsx("textarea", { id: "description", value: formDescription, onChange: (e) => setFormDescription(e.target.value), rows: 3, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", placeholder: "Enter form description" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Form Fields" }), _jsx(FieldTypeSelector, { onSelect: handleAddField })] }), _jsx(DndContext, { sensors: [], collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: _jsx(SortableContext, { items: fields.map(f => f.id), strategy: verticalListSortingStrategy, children: _jsx("div", { className: "space-y-4", children: fields.map((field, index) => (_jsx(DraggableField, { field: field, onUpdate: (updates) => handleFieldUpdate(field.id, updates), onDelete: () => handleFieldDelete(field.id) }, field.id))) }) }) })] })] })] }), currentForm && (_jsx(ShareFormDialog, { isOpen: showShareDialog, onClose: () => setShowShareDialog(false), formId: currentForm.id, currentSettings: currentForm.settings || {} }))] }));
}
