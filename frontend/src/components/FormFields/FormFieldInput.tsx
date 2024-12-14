import React from 'react';
import { FormField } from '../../types/form';

interface FormFieldInputProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  isBuilder?: boolean;
}

const FormFieldInput: React.FC<FormFieldInputProps> = ({ field, value, onChange, isBuilder = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof onChange === 'function') {
      const newValue = field.type === 'checkbox' ? e.target.checked : e.target.value;
      console.log('Field input change:', { type: field.type, value: newValue });
      onChange(newValue);
    }
  };

  const renderInput = () => {
    const commonProps = {
      id: field.id,
      name: field.name,
      value: value || '',
      onChange: handleChange,
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
      disabled: false,
      'aria-label': field.label
    };

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            {...commonProps}
            min={field.validation?.min}
            max={field.validation?.max}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'tel':
        return (
          <input
            type="tel"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'time':
        return (
          <input
            type="time"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'url':
        return (
          <input
            type="url"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            {...commonProps}
            checked={value || false}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onClick={(e) => e.stopPropagation()}
          />
        );
      case 'select':
        return (
          <select {...commonProps} onClick={(e) => e.stopPropagation()}>
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
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  onClick={(e) => e.stopPropagation()}
                />
                <label
                  htmlFor={`${field.id}-${option.value}`}
                  className="ml-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <input
            type="text"
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          />
        );
    }
  };

  return renderInput();
};

export default FormFieldInput;
