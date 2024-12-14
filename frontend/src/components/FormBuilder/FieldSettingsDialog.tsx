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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedField((prev) => ({
      ...prev,
      required: e.target.checked,
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
        { label: `Option ${(prev.options || []).length + 1}`, value: `option_${(prev.options || []).length + 1}` },
      ],
    }));
  };

  const handleRemoveOption = (index: number) => {
    setEditedField((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || [],
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
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Field Settings
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Label
              </label>
              <input
                type="text"
                name="label"
                value={editedField.label || ''}
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
                value={editedField.name || ''}
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
                value={editedField.description || ''}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="required"
                checked={editedField.required || false}
                onChange={handleRequiredChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Required
              </label>
            </div>

            {(editedField.type === 'select' ||
              editedField.type === 'radio' ||
              editedField.type === 'checkbox') && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {editedField.options?.map((option, index) => (
                  <div key={index} className="flex space-x-2">
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
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddOption}
                  className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Option</span>
                </button>
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
