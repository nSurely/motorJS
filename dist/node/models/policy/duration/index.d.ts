import { Duration } from "./interface";
export declare class PolicyDuration {
    start?: Date;
    end?: Date;
    gracePeriodMins?: number;
    constructor(duration: Duration);
    isExpired(): boolean;
}
//# sourceMappingURL=index.d.ts.map