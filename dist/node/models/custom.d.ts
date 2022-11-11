import { APIHandlerAuth, APIHandlerNoAuth } from "../utils/api";
export declare class PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    _update({ persist, endpoint, fields, exclude, params, }: {
        persist?: boolean;
        endpoint?: string;
        fields?: Object;
        exclude?: string[];
        params?: Object;
    }): Promise<void>;
    _save({ endpoint, fields, exclude, params }: {
        endpoint: string;
        fields?: Object;
        exclude?: string[];
        params?: Object;
    }): Promise<any>;
}
//# sourceMappingURL=custom.d.ts.map