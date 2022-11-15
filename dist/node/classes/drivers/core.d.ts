import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { Driver } from "../../models/drivers";
import { DriverBase } from "../../models/drivers/interface";
import { Search } from "../../utils/search";
export declare class Drivers {
    storageManager: StorageManager;
    api: APIHandlerAuth | APIHandlerNoAuth;
    /**
     * Returns a drivers record.
     * @returns {Promise<Driver>}
     *
     * @param {string} driverId - The ID of the driver to retrieve.
     * @param {boolean} risk - Whether to include the driver's risk data. Defaults to true
     * @param {boolean} address - Whether to include the driver's address data. Defaults to true
     * @param {boolean} fleets - Whether to include the driver's fleet data. Defaults to true
     * @param {boolean} vehicleCount - Whether to include the driver's vehicle count. Defaults to true
     * @param {boolean} distance - Whether to include the driver's distance data. Defaults to true
     * @param {boolean} points - Whether to include the driver's points data. Defaults to true
     * @param {boolean} files - Whether to include the driver's files data. Defaults to true
     * @param {boolean} contact - Whether to include the driver's contact data. Defaults to true
     * @param {boolean} occupation - Whether to include the driver's occupation data. Defaults to true
     */
    getDriver({ driverId, risk, address, fleets, vehicleCount, distance, points, files, contact, occupation, }: {
        driverId: string;
        risk?: boolean;
        address?: boolean;
        fleets?: boolean;
        vehicleCount?: boolean;
        distance?: boolean;
        points?: boolean;
        files?: boolean;
        contact?: boolean;
        occupation?: boolean;
    }): Promise<Driver>;
    listDrivers({ dob, email, firstName, lastName, externalId, isActive, maxRecords, }: {
        dob?: string | Search;
        email?: string | Search;
        firstName?: string | Search;
        lastName?: string | Search;
        externalId?: string | Search;
        isActive?: boolean;
        maxRecords?: number;
    }): AsyncGenerator<Driver>;
    createDriver({ driver, password, sendInvite, sendWebhook }: {
        driver: DriverBase;
        password?: string;
        sendInvite?: boolean;
        sendWebhook?: boolean;
    }): Promise<Driver>;
}
//# sourceMappingURL=core.d.ts.map