import { DriverBase } from "../drivers/interface";

export interface BillingAccountBase {
    adrLine1?:        string;
    adrLine2?:        string;
    adrLine3?:        string;
    county?:          string;
    province?:        string;
    postcode?:        string;
    externalId?:      string;
    adrSameAsHome?:   boolean;
    expiry?:          Date;
    updatedAt?:       Date;
    isActive?:        boolean;
    isPrimary?:       boolean;
    thirdPartyId?:    string;
    card?:            CardBase;
    id?:              string;
    createdAt?:       Date;
    countryIsoCode?:  string;
    currencyIsoCode?: string;
    accountType?:     string;
    driver?:          DriverBase;
}

export interface CardBase {
    name?:         string;
    number?:       string;
    exp?:          Date;
    cvv?:          string;
    lastFour?:     string;
    updatedAt?:    Date;
    thirdPartyId?: string;
}

