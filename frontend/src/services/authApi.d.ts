export declare const authApi: {
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string, name: string) => Promise<any>;
    getCurrentUser: () => Promise<any>;
    updateProfile: (data: {
        name?: string;
        email?: string;
        currentPassword?: string;
        newPassword?: string;
    }) => Promise<any>;
    forgotPassword: (email: string) => Promise<any>;
    resetPassword: (token: string, newPassword: string) => Promise<any>;
};
//# sourceMappingURL=authApi.d.ts.map