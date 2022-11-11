import { JWTAuth } from "./jwt";
export declare class UserAuth extends JWTAuth {
    constructor({ url, region, orgId, authType, email, password }: {
        url?: string;
        region?: string;
        orgId: string;
        authType?: string;
        email: string;
        password: string;
    });
}
//# sourceMappingURL=user.d.ts.map