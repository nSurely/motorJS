import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { Vehicle } from "../../models/vehicles/rv";
export declare class Vehicles {
    storageManager: StorageManager;
    api: APIHandlerAuth | APIHandlerNoAuth;
    getVehicle({ vehicleId, includeTranslations, includeDistance, includeDrvCount, }: {
        vehicleId: string;
        includeTranslations?: boolean;
        includeDistance?: boolean;
        includeDrvCount?: boolean;
    }): Promise<Vehicle>;
}
//# sourceMappingURL=core.d.ts.map