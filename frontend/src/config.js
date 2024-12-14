// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// Authentication
export const TOKEN_KEY = 'token';
export const TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
// Form Builder Configuration
export const MAX_FORM_FIELDS = 50;
export const SUPPORTED_FIELD_TYPES = [
    'text',
    'textarea',
    'number',
    'email',
    'tel',
    'date',
    'time',
    'url',
    'checkbox',
    'radio',
    'select'
];
// Form Validation
export const VALIDATION_RULES = {
    text: {
        minLength: 0,
        maxLength: 1000,
    },
    textarea: {
        minLength: 0,
        maxLength: 5000,
    },
    number: {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
    },
    tel: {
        pattern: '^[0-9+\\-\\s()]*$',
    },
    email: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
    url: {
        pattern: '^https?://.+',
    },
};
// UI Configuration
export const TOAST_DURATION = 3000;
export const ANIMATION_DURATION = 300;
export const DEBOUNCE_DELAY = 300;
// Error Messages
export const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_PHONE: 'Please enter a valid phone number',
    MIN_LENGTH: (min) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max) => `Must be no more than ${max} characters`,
    MIN_VALUE: (min) => `Must be at least ${min}`,
    MAX_VALUE: (max) => `Must be no more than ${max}`,
    SERVER_ERROR: 'An error occurred. Please try again later.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
};
