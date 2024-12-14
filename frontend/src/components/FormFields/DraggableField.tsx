import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import FormFieldInput from './FormFieldInput';
import ValidationRuleBuilder from '../FormFields/ValidationRules/ValidationRuleBuilder';
import { FormField, FieldType } from '../../types/form';

interface Props {
  field: FormField;
  index: number;
  onUpdate: (index: number, field: FormField) => void;
  onDelete: (index: number) => void;
  allFields: FormField[];
}

export default function DraggableField({ field, index, onUpdate, onDelete, allFields }: Props) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showValidationBuilder, setShowValidationBuilder] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    onUpdate(index, { ...field, ...updates });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    handleFieldUpdate({
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleValidationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    handleFieldUpdate({
      validation: {
        ...field.validation,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      },
    });
  };

  const handleOptionChange = (index: number, key: 'label' | 'value', newValue: string) => {
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

  const removeOption = (index: number) => {
    const newOptions = [...(field.options || [])];
    newOptions.splice(index, 1);
    handleFieldUpdate({ options: newOptions });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg border ${isDragging ? 'border-indigo-500' : 'border-gray-200'} p-4`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              {...attributes}
              {...listeners}
              className="cursor-move"
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </button>
            <div className="flex-1">
              <FormFieldInput
                field={field}
                onUpdate={handleFieldUpdate}
                isBuilder={true}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowValidationBuilder(true)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Validation Rules
          </button>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Settings2 className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(index)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field Label
              </label>
              <input
                type="text"
                name="label"
                value={field.label}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field Name
              </label>
              <input
                type="text"
                name="name"
                value={field.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Placeholder
            </label>
            <input
              type="text"
              name="placeholder"
              value={field.placeholder || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {(field.type === 'select' || field.type === 'radio') && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                <button
                  type="button"
                  onClick={addOption}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Add Option
                </button>
              </div>
              <div className="space-y-2">
                {field.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) =>
                        handleOptionChange(optionIndex, 'label', e.target.value)
                      }
                      placeholder="Option Label"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) =>
                        handleOptionChange(optionIndex, 'value', e.target.value)
                      }
                      placeholder="Option Value"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(optionIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showValidationBuilder && (
        <ValidationRuleBuilder
          field={field}
          onUpdate={handleFieldUpdate}
          onClose={() => setShowValidationBuilder(false)}
          allFields={allFields}
        />
      )}
    </div>
  );
}
