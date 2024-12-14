import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FormField } from '../../types/form';
import FormFieldComponent from './FormFieldComponent';
import AddFieldDialog from './AddFieldDialog';

interface DragDropFormBuilderProps {
  fields: FormField[];
  onFieldsChange: (fields: FormField[]) => void;
}

export default function DragDropFormBuilder({ fields, onFieldsChange }: DragDropFormBuilderProps) {
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onFieldsChange(items);
  };

  const handleAddField = (field: FormField) => {
    onFieldsChange([...fields, field]);
    setIsAddFieldOpen(false);
  };

  const handleUpdateField = (index: number, updatedField: FormField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    onFieldsChange(updatedFields);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    onFieldsChange(updatedFields);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="form-fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FormFieldComponent
                          field={field}
                          onUpdate={(updatedField) => handleUpdateField(index, updatedField)}
                          onDelete={() => handleDeleteField(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAddFieldOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Field
        </button>
      </div>

      <AddFieldDialog
        isOpen={isAddFieldOpen}
        onClose={() => setIsAddFieldOpen(false)}
        onAdd={handleAddField}
      />
    </div>
  );
}
