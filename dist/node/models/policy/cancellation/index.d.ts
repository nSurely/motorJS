import { Cancellation } from "./interface";
export declare class PolicyCancellation {
    cancelledAt?: Date;
    message?: string;
    constructor(cancellation: Cancellation);
    isCancelled(): boolean;
}
//# sourceMappingURL=index.d.ts.map