import { FormField } from '../../types/form';
interface Props {
    field: FormField;
    index: number;
    onUpdate: (index: number, field: FormField) => void;
    onDelete: (index: number) => void;
    allFields: FormField[];
}
export default function DraggableField({ field, index, onUpdate, onDelete, allFields }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DraggableField.d.ts.map