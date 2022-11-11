export declare class APIKeyAuth {
    apiKey: string;
    apiSecret: string;
    headers: object | undefined;
    constructor(key: string, secret: string);
    requiresRefresh(): boolean;
    refresh(): Promise<void>;
    getToken(): string;
    getHeaders(): object;
    isLoggedIn(): boolean;
    login(): Promise<boolean>;
    logout(): Promise<boolean>;
}
//# sourceMappingURL=apiKey.d.ts.map