import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { DriverVehicle } from "../../models/vehicles/drv";
import { Vehicle } from "../../models/vehicles/rv";
import { Search } from "../../utils/search";
import { VehicleType } from "../../models/vehicles/v";
export declare class Vehicles {
    storageManager: StorageManager;
    api: APIHandlerAuth | APIHandlerNoAuth;
    getVehicle({ vehicleId, includeTranslations, includeDistance, includeDrvCount, }: {
        vehicleId: string;
        includeTranslations?: boolean;
        includeDistance?: boolean;
        includeDrvCount?: boolean;
    }): Promise<Vehicle>;
    listVehicles({ isActive, isApproved, regPlate, vin, sourceId, externalId, fullResponse, maxRecords, }: {
        isActive?: boolean;
        isApproved?: boolean;
        regPlate?: string | Search;
        vin?: string | Search;
        sourceId?: string | Search;
        externalId?: string | Search;
        fullResponse?: string;
        maxRecords?: number;
    }): AsyncGenerator<Vehicle, void, unknown>;
    createVehicle({ vehicle, driverId, drv, sendWebhook }: {
        vehicle: Vehicle;
        driverId?: string;
        drv?: DriverVehicle;
        sendWebhook?: boolean;
    }): Promise<Vehicle>;
    listVehicleTypes({ brand, model, vehicleName, year, externalId, sourceId, isActive, internalFields, maxRecords, }: {
        brand?: string | Search;
        model?: string | Search;
        vehicleName?: string | Search;
        year?: string | number | Search;
        externalId?: string | Search;
        sourceId?: string | Search;
        isActive?: boolean;
        internalFields?: boolean;
        maxRecords?: number;
    }): AsyncGenerator<VehicleType, void, unknown>;
    createVehicleType({ vehicleType, sendWebhook }: {
        vehicleType: VehicleType;
        sendWebhook?: boolean;
    }): Promise<VehicleType>;
    getVehicleType({ vehicleTypeId }: {
        vehicleTypeId: string;
    }): Promise<VehicleType>;
}
//# sourceMappingURL=core.d.ts.map