import { APIKeyAuth } from "./apiKey";
import { DriverAuth } from "./driver";
import { UserAuth } from "./user";
declare enum AuthType {
    API_KEY = 1,
    JWT_DRIVER = 2,
    JWT_USER = 3
}
export declare class Auth {
    apiKey?: string;
    apiSecret?: string;
    email?: string;
    password?: string;
    accountType?: string;
    authMethod: AuthType | undefined;
    authObject: APIKeyAuth | DriverAuth | UserAuth;
    region?: string;
    url: string | undefined;
    orgId: string;
    constructor({ apiKey, apiSecret, email, password, accountType, orgId, region, url, }: {
        apiKey?: string;
        apiSecret?: string;
        email?: string;
        password?: string;
        accountType?: string;
        orgId: string;
        region?: string;
        url?: string;
    });
    requiresRefresh(): boolean;
    refresh(): Promise<void>;
    login(): Promise<string | boolean | undefined>;
    logout(): Promise<boolean | void>;
    getToken(): string;
    getHeaders(): object;
    isLoggedIn(): boolean;
}
export {};
//# sourceMappingURL=core.d.ts.map