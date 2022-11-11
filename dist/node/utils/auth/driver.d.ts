import { JWTAuth } from "./jwt";
export declare class DriverAuth extends JWTAuth {
    constructor({ url, region, orgId, authType, email, password }: {
        url?: string;
        region?: string;
        orgId: string;
        authType?: string;
        email: string;
        password: string;
    });
    signup({ email, password, firstName, lastName, fields, login, }: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        fields?: object;
        login: boolean;
    }): Promise<void>;
}
//# sourceMappingURL=driver.d.ts.map