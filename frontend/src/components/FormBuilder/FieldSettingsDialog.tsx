import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Plus, Minus } from 'lucide-react';
import { FormField, FieldOption } from '../../types/form';

interface FieldSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  field: FormField;
  onUpdate: (field: FormField) => void;
}

export default function FieldSettingsDialog({
  isOpen,
  onClose,
  field,
  onUpdate,
}: FieldSettingsDialogProps) {
  const [editedField, setEditedField] = useState<FormField>({ ...field });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setEditedField((prev) => ({
      ...prev,
      validation: {
        ...prev.validation,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleOptionChange = (index: number, field: keyof FieldOption, value: string) => {
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
        { label: `Option ${(prev.options?.length || 0) + 1}`, value: \`option_\${(prev.options?.length || 0) + 1}\` },
      ],
    }));
  };

  const handleRemoveOption = (index: number) => {
    setEditedField((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onUpdate(editedField);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Field Settings
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Label
                </label>
                <input
                  type="text"
                  name="label"
                  value={editedField.label}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedField.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Placeholder
                </label>
                <input
                  type="text"
                  name="placeholder"
                  value={editedField.placeholder}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editedField.description}
                  onChange={handleInputChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Validation Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Validation
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="required"
                    checked={editedField.validation?.required}
                    onChange={handleValidationChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Required
                  </label>
                </div>

                {(editedField.type === 'text' ||
                  editedField.type === 'textarea') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Min Length
                      </label>
                      <input
                        type="number"
                        name="minLength"
                        value={editedField.validation?.minLength || ''}
                        onChange={handleValidationChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max Length
                      </label>
                      <input
                        type="number"
                        name="maxLength"
                        value={editedField.validation?.maxLength || ''}
                        onChange={handleValidationChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}

                {editedField.type === 'number' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Min Value
                      </label>
                      <input
                        type="number"
                        name="min"
                        value={editedField.validation?.min || ''}
                        onChange={handleValidationChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max Value
                      </label>
                      <input
                        type="number"
                        name="max"
                        value={editedField.validation?.max || ''}
                        onChange={handleValidationChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Options (for select and radio) */}
            {(editedField.type === 'select' || editedField.type === 'radio') && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Options</h3>
                  <button
                    onClick={handleAddOption}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </button>
                </div>
                <div className="space-y-2">
                  {editedField.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) =>
                          handleOptionChange(index, 'label', e.target.value)
                        }
                        placeholder="Label"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        value={option.value}
                        onChange={(e) =>
                          handleOptionChange(index, 'value', e.target.value)
                        }
                        placeholder="Value"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
