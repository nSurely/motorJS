import { OrgSettings } from "./org";
import Auth from "../auth";
export declare class APIHandlerNoAuth {
    url?: string;
    region?: string;
    orgId: string;
    telematicsUrl: string;
    orgUrl: string;
    orgData?: OrgSettings;
    orgDataRefreshing: boolean;
    constructor({ url, region, orgId }: {
        url?: string;
        region?: string;
        orgId: string;
    });
    request({ method, endpoint, params, data, headers, urlOverride, }: {
        method: string;
        endpoint?: string;
        params?: object;
        data?: any;
        headers?: any;
        urlOverride?: string;
    }): Promise<any>;
    refreshOrgData(): Promise<void>;
    batchFetch({ endpoint, params, headers, limit, offset, }: {
        endpoint: string;
        params?: object;
        headers?: any;
        limit?: number;
        offset?: number;
    }): AsyncGenerator<any, void, unknown>;
}
export declare class APIHandlerAuth {
    url?: string;
    region?: string;
    orgId: string;
    telematicsUrl: string;
    orgUrl: string;
    orgData?: OrgSettings;
    orgDataRefreshing: boolean;
    auth: Auth;
    constructor({ url, region, orgId, auth }: {
        url?: string;
        region?: string;
        orgId: string;
        auth: Auth;
    });
    makeRequest({ method, params, data, headers, url }: {
        method: string;
        params?: object;
        data?: any;
        headers?: any;
        url: string;
    }): Promise<{
        status: number;
        body: any;
    }>;
    refreshOrgData(): Promise<void>;
    authOk(): boolean;
    checkAuth(): Promise<void>;
    request({ method, endpoint, params, data, headers, urlOverride, }: {
        method: string;
        endpoint?: string;
        params?: object;
        data?: any;
        headers?: any;
        urlOverride?: string;
    }): Promise<any>;
    telematicsRequest({ method, endpoint, params, data, headers }: {
        method: string;
        endpoint?: string;
        params?: object;
        data?: any;
        headers?: any;
    }): Promise<any>;
    batchFetch({ endpoint, params, headers, limit, offset, }: {
        endpoint: string;
        params?: object;
        headers?: any;
        limit?: number;
        offset?: number;
    }): AsyncGenerator<any, void, unknown>;
}
//# sourceMappingURL=core.d.ts.map