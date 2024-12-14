import { Form, FormSubmission } from '../types/form';
interface ApiResponse<T> {
    message: string;
    data: T;
}
declare const api: import("axios").AxiosInstance;
export declare const authApi: {
    login: (email: string, password: string) => Promise<any>;
    register: (userData: {
        email: string;
        password: string;
        name: string;
    }) => Promise<any>;
    logout: () => void;
    getCurrentUser: () => Promise<any>;
    updateProfile: (userData: {
        name?: string;
        email?: string;
        password?: string;
    }) => Promise<any>;
};
export declare const formApi: {
    getForms: () => Promise<ApiResponse<Form[]>>;
    getForm: (id: string) => Promise<Form>;
    createForm: (formData: Partial<Form>) => Promise<Form>;
    updateForm: (id: string, formData: Partial<Form>) => Promise<Form>;
    deleteForm: (id: string) => Promise<void>;
    getShareLink: (id: string) => Promise<string>;
    submitForm: (id: string, formData: any) => Promise<FormSubmission>;
};
export default api;
//# sourceMappingURL=api.d.ts.map