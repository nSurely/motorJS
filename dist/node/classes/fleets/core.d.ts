import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { Fleet } from "../../models/fleets";
export declare class Fleets {
    storageManager: StorageManager;
    api: APIHandlerAuth | APIHandlerNoAuth;
    getFleet({ fleetId, query }: {
        fleetId: string;
        query: object;
    }): Promise<Fleet>;
    listFleets({ maxRecords }: {
        maxRecords: number;
    }): AsyncGenerator<Fleet, void, unknown>;
    createFleet({ fleet }: {
        fleet: Fleet;
    }): Promise<Fleet>;
}
//# sourceMappingURL=core.d.ts.map