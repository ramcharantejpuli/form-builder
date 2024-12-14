import { ValidationRule, FormField, Condition } from '../types/form';
export declare class ValidationService {
    static evaluateCondition(condition: Condition, fields: Record<string, any>): boolean;
    static shouldApplyRule(rule: ValidationRule, fields: Record<string, any>): boolean;
    static validateField(field: FormField, value: any, fields: Record<string, any>): string | null;
    private static validateRule;
}
//# sourceMappingURL=validation.d.ts.map