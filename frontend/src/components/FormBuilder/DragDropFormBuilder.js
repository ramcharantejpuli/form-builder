import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircle } from 'lucide-react';
import FormFieldComponent from './FormFieldComponent';
import AddFieldDialog from './AddFieldDialog';
export default function DragDropFormBuilder({ fields, onFieldsChange }) {
    const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
    const handleDragEnd = (result) => {
        if (!result.destination)
            return;
        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        onFieldsChange(items);
    };
    const handleAddField = (field) => {
        onFieldsChange([...fields, field]);
        setIsAddFieldOpen(false);
    };
    const handleUpdateField = (index, updatedField) => {
        const updatedFields = [...fields];
        updatedFields[index] = updatedField;
        onFieldsChange(updatedFields);
    };
    const handleDeleteField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        onFieldsChange(updatedFields);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(DragDropContext, { onDragEnd: handleDragEnd, children: _jsx(Droppable, { droppableId: "form-fields", children: (provided) => (_jsx("div", { ...provided.droppableProps, ref: provided.innerRef, className: "space-y-4", children: _jsxs("div", { className: "flex flex-col gap-4", children: [fields.map((field, index) => (_jsx(Draggable, { draggableId: field.id, index: index, children: (provided) => (_jsx("div", { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, children: _jsx(FormFieldComponent, { field: field, onUpdate: (updatedField) => handleUpdateField(index, updatedField), onDelete: () => handleDeleteField(index) }) })) }, field.id))), provided.placeholder] }) })) }) }), _jsx("div", { className: "flex justify-center mt-4", children: _jsxs("button", { onClick: () => setIsAddFieldOpen(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: [_jsx(PlusCircle, { className: "h-5 w-5 mr-2" }), "Add Field"] }) }), _jsx(AddFieldDialog, { isOpen: isAddFieldOpen, onClose: () => setIsAddFieldOpen(false), onAdd: handleAddField })] }));
}
