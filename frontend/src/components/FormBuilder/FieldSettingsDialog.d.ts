import { FormField } from '../../types/form';
interface FieldSettingsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    field: FormField;
    onUpdate: (field: FormField) => void;
}
export default function FieldSettingsDialog({ isOpen, onClose, field, onUpdate, }: FieldSettingsDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FieldSettingsDialog.d.ts.map