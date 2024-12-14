import React, { useState } from 'react';
import { Form, FormField } from '../../types/form';
import { formApi } from '../../services/api';
import { toast } from 'react-hot-toast';

interface FormPreviewProps {
  form: Form;
  isShared?: boolean;
}

export default function FormPreview({ form, isShared = false }: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (field: FormField, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await formApi.submitForm(form.id, formData);
      toast.success('Form submitted successfully!');
      setFormData({});
    } catch (error) {
      toast.error('Failed to submit form');
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.validation?.required,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        handleInputChange(field, e.target.value),
      value: formData[field.name] || '',
      className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
        return <input type={field.type} {...commonProps} />;
      case 'textarea':
        return <textarea {...commonProps} rows={4} />;
      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );
      case 'date':
      case 'time':
        return <input type={field.type} {...commonProps} />;
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="mt-1 space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.name}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="mt-1">
            <input
              type="checkbox"
              {...commonProps}
              checked={formData[field.name] || false}
              onChange={(e) => handleInputChange(field, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600 mb-6">{form.description}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                  {field.validation?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {field.description && (
                  <p className="mt-1 text-sm text-gray-500">{field.description}</p>
                )}
                {renderField(field)}
              </div>
            ))}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
