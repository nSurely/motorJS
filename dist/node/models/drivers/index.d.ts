import { DriverBase, Occupation } from "./interface";
import { FleetsBase } from "../fleets/interface";
import { RiskBase } from "../risk/interface";
import { PolicyBase } from "../policy/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";
import { PrivateApiHandler } from "../custom";
import { Vehicle } from "../vehicles/rv";
import { BillingAccount } from "../billing/accounts";
import { Policy } from "../policy";
import { BillingEvent } from "../billing/events";
export declare class Driver extends PrivateApiHandler {
    api: APIHandlerAuth | APIHandlerNoAuth;
    adrLine1?: string;
    adrLine2?: string;
    adrLine3?: string;
    county?: string;
    province?: string;
    postcode?: string;
    externalId?: string;
    lang?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    approvedAt?: Date;
    driverActivated?: boolean;
    activatedAt?: Date;
    dob?: Date;
    isApproved?: boolean;
    isActive?: boolean;
    gender?: string;
    telE164?: string;
    drivingStartDate?: Date;
    countryIsoCode?: string;
    occupation?: Occupation;
    id?: string;
    sourceId?: string;
    email?: string;
    createdAt?: Date;
    countryName?: string;
    driversLicenseLoc?: string;
    proofOfAddressLoc?: string;
    idLoc?: string;
    profilePicLoc?: string;
    fleets?: FleetsBase[];
    vehicleCount?: number;
    totalPoints?: number;
    distanceKm30Days?: number;
    risk?: RiskBase;
    policies?: PolicyBase[];
    constructor(driver: DriverBase);
    private _checkId;
    fullName(): string;
    refresh(): Promise<void>;
    delete(): Promise<void>;
    save(fields?: Object): Promise<void>;
    update({ persist, fields }: {
        persist?: boolean;
        fields?: Object;
    }): Promise<void>;
    listVehicles(): Promise<Vehicle[]>;
    getDisplay(): string;
    telematicsId(): string | undefined;
    listBillingAccounts(primaryOnly?: boolean): Promise<BillingAccount[]>;
    getBillingAccount({ id }: {
        id: string;
    }): Promise<BillingAccount>;
    listVehiclePolicies({ vehicleId }: {
        vehicleId?: string;
    }): Promise<Policy[]>;
    getPrimaryBillingAccount(): Promise<BillingAccount | undefined>;
    createBillingAccount({ account }: {
        account: BillingAccount;
    }): Promise<BillingAccount>;
    charge({ amount, event }: {
        amount?: number;
        event?: BillingEvent;
    }): Promise<BillingEvent>;
    listCharges({ eventType, eventStatus, maxRecords }: {
        eventType?: string;
        eventStatus?: string;
        maxRecords?: number;
    }): AsyncGenerator<BillingEvent, void, unknown>;
    listPolicies({ looseMatch, isActivePolicy }: {
        looseMatch?: boolean;
        isActivePolicy?: boolean;
    }): AsyncGenerator<Policy>;
    createPolicy({ policy }: {
        policy?: Policy;
    }): Promise<Policy>;
}
//# sourceMappingURL=index.d.ts.map