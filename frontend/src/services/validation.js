export class ValidationService {
    static evaluateCondition(condition, fields) {
        const fieldValue = fields[condition.field];
        const conditionValue = condition.value;
        switch (condition.operator) {
            case 'equals':
                return fieldValue === conditionValue;
            case 'not_equals':
                return fieldValue !== conditionValue;
            case 'contains':
                return String(fieldValue).includes(String(conditionValue));
            case 'not_contains':
                return !String(fieldValue).includes(String(conditionValue));
            case 'greater_than':
                return Number(fieldValue) > Number(conditionValue);
            case 'less_than':
                return Number(fieldValue) < Number(conditionValue);
            case 'is_empty':
                return !fieldValue || fieldValue.length === 0;
            case 'is_not_empty':
                return fieldValue && fieldValue.length > 0;
            default:
                return true;
        }
    }
    static shouldApplyRule(rule, fields) {
        if (!rule.conditions || rule.conditions.length === 0) {
            return true;
        }
        return rule.conditions.every((condition) => this.evaluateCondition(condition, fields));
    }
    static validateField(field, value, fields) {
        if (!field.validationRules) {
            return null;
        }
        for (const rule of field.validationRules) {
            if (!this.shouldApplyRule(rule, fields)) {
                continue;
            }
            const error = this.validateRule(rule, value);
            if (error) {
                return error;
            }
        }
        return null;
    }
    static validateRule(rule, value) {
        switch (rule.type) {
            case 'required':
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    return rule.message || 'This field is required';
                }
                break;
            case 'email':
                if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return rule.message || 'Please enter a valid email address';
                }
                break;
            case 'url':
                try {
                    if (value) {
                        new URL(value);
                    }
                }
                catch {
                    return rule.message || 'Please enter a valid URL';
                }
                break;
            case 'pattern':
                if (value && rule.pattern && !new RegExp(rule.pattern).test(value)) {
                    return rule.message || 'Please enter a valid value';
                }
                break;
            case 'minLength':
                if (value && String(value).length < Number(rule.value)) {
                    return (rule.message ||
                        `Please enter at least ${rule.value} characters`);
                }
                break;
            case 'maxLength':
                if (value && String(value).length > Number(rule.value)) {
                    return (rule.message ||
                        `Please enter no more than ${rule.value} characters`);
                }
                break;
            case 'min':
                if (value && Number(value) < Number(rule.value)) {
                    return (rule.message ||
                        `Please enter a value greater than or equal to ${rule.value}`);
                }
                break;
            case 'max':
                if (value && Number(value) > Number(rule.value)) {
                    return (rule.message ||
                        `Please enter a value less than or equal to ${rule.value}`);
                }
                break;
            case 'custom':
                if (rule.pattern) {
                    try {
                        // eslint-disable-next-line no-new-func
                        const customValidator = new Function('value', rule.pattern);
                        if (!customValidator(value)) {
                            return rule.message || 'Invalid value';
                        }
                    }
                    catch (error) {
                        console.error('Error in custom validation:', error);
                        return 'Invalid validation rule';
                    }
                }
                break;
        }
        return null;
    }
}
