export declare const API_URL: any;
export declare const TOKEN_KEY = "token";
export declare const TOKEN_EXPIRY: number;
export declare const MAX_FORM_FIELDS = 50;
export declare const SUPPORTED_FIELD_TYPES: readonly ["text", "textarea", "number", "email", "tel", "date", "time", "url", "checkbox", "radio", "select"];
export declare const VALIDATION_RULES: {
    text: {
        minLength: number;
        maxLength: number;
    };
    textarea: {
        minLength: number;
        maxLength: number;
    };
    number: {
        min: number;
        max: number;
    };
    tel: {
        pattern: string;
    };
    email: {
        pattern: string;
    };
    url: {
        pattern: string;
    };
};
export declare const TOAST_DURATION = 3000;
export declare const ANIMATION_DURATION = 300;
export declare const DEBOUNCE_DELAY = 300;
export declare const ERROR_MESSAGES: {
    REQUIRED: string;
    INVALID_EMAIL: string;
    INVALID_URL: string;
    INVALID_PHONE: string;
    MIN_LENGTH: (min: number) => string;
    MAX_LENGTH: (max: number) => string;
    MIN_VALUE: (min: number) => string;
    MAX_VALUE: (max: number) => string;
    SERVER_ERROR: string;
    NETWORK_ERROR: string;
};
//# sourceMappingURL=config.d.ts.map