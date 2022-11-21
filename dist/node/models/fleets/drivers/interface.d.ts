import { Driver } from "../../drivers";
export interface FleetDriverBase {
    fleetId?: string;
    isVehicleManager?: boolean;
    isDriverManager?: boolean;
    isBillingManager?: boolean;
    isActive?: boolean;
    expiresAt?: Date;
    createdAt?: Date;
    sourceId?: string;
    driver?: Driver;
}
//# sourceMappingURL=interface.d.ts.map