export declare class JWTAuth {
    url?: string;
    region?: string;
    orgId: string;
    authType?: string;
    email: string;
    password: string;
    tokenType?: string;
    accessToken?: string;
    expiresIn?: number;
    refreshToken?: string;
    refreshExpiresIn?: number;
    lastRefreshTime?: EpochTimeStamp;
    accountId?: string;
    accountType?: string;
    orgs?: Array<{
        id: string;
        display: string;
    }>;
    loginUrl: string;
    refreshUrl: string;
    logoutUrl: string;
    constructor({ url, region, orgId, authType, email, password }: {
        url?: string;
        region?: string;
        orgId: string;
        authType?: string;
        email: string;
        password: string;
    });
    refreshExpired(): boolean;
    requiresRefresh(): boolean;
    login(email: string, password: string): Promise<string | undefined>;
    logout(): Promise<void>;
    isLoggedIn(): boolean;
    refresh(): Promise<string | undefined>;
    getToken(): string;
    getHeaders(): {
        Authorization?: undefined;
    } | {
        Authorization: string;
    };
}
//# sourceMappingURL=jwt.d.ts.map