import { DriverBase } from "../../drivers/interface";
export interface FleetDriverBase {
    isVehicleManager?: boolean;
    isDriverManager?: boolean;
    isBillingManager?: boolean;
    isActive?: boolean;
    expiresAt?: Date;
    createdAt?: Date;
    sourceId?: string;
    driver?: DriverBase;
}
//# sourceMappingURL=interface.d.ts.map