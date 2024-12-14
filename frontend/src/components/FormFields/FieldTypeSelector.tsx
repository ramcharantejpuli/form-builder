import React from 'react';
import {
  Type,
  AlignLeft,
  Hash,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckSquare,
  List,
  Radio,
  File,
  Link,
} from 'lucide-react';

interface Props {
  onSelect: (type: string) => void;
}

const fieldTypes = [
  {
    type: 'text',
    label: 'Text',
    icon: Type,
    description: 'Single line text input'
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: AlignLeft,
    description: 'Multi-line text input'
  },
  {
    type: 'number',
    label: 'Number',
    icon: Hash,
    description: 'Numeric input with validation'
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Email address input with validation'
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: Phone,
    description: 'Phone number input with formatting'
  },
  {
    type: 'date',
    label: 'Date',
    icon: Calendar,
    description: 'Date picker'
  },
  {
    type: 'time',
    label: 'Time',
    icon: Clock,
    description: 'Time picker'
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: CheckSquare,
    description: 'Single checkbox for yes/no options'
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: List,
    description: 'Dropdown menu with options'
  },
  {
    type: 'radio',
    label: 'Radio',
    icon: Radio,
    description: 'Radio buttons for single selection'
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: File,
    description: 'File upload field'
  },
  {
    type: 'url',
    label: 'URL',
    icon: Link,
    description: 'Website URL input with validation'
  }
];

export default function FieldTypeSelector({ onSelect }: Props) {
  const handleFieldClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(type);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fieldTypes.map(({ type, label, icon: Icon, description }) => (
        <button
          key={type}
          type="button"
          onClick={(e) => handleFieldClick(e, type)}
          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200 group"
        >
          <Icon className="h-6 w-6 text-gray-500 group-hover:text-indigo-600 mb-2" />
          <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">{label}</span>
          <span className="text-xs text-gray-500 text-center mt-1">{description}</span>
        </button>
      ))}
    </div>
  );
}
