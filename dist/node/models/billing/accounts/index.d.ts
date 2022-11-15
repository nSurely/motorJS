import { BillingAccountBase, CardBase } from "./interface";
import { DriverBase } from "../../drivers/interface";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../../utils/api";
export declare class BillingAccount {
    api?: APIHandlerAuth | APIHandlerNoAuth;
    adrLine1?: string;
    adrLine2?: string;
    adrLine3?: string;
    county?: string;
    province?: string;
    postcode?: string;
    externalId?: string;
    adrSameAsHome?: boolean;
    expiry?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    isPrimary?: boolean;
    thirdPartyId?: string;
    card?: CardBase;
    id?: string;
    createdAt?: Date;
    countryIsoCode?: string;
    currencyIsoCode?: string;
    accountType?: string;
    driver?: DriverBase;
    constructor(billingAccount: BillingAccountBase);
    getDisplay(): string;
}
//# sourceMappingURL=index.d.ts.map