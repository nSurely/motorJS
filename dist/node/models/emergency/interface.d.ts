import { DriverBase } from "../drivers/interface";
export interface EmergencyBase {
    latitude?: number;
    longitude?: number;
    adrLine1?: string;
    adrLine2?: string;
    adrLine3?: string;
    county?: string;
    province?: string;
    postcode?: string;
    isCancelled?: boolean;
    isResolved?: boolean;
    resolvedAt?: Date;
    useDefaultTel?: boolean;
    contactTelE164?: string;
    driverMessage?: string;
    id?: string;
    createdAt?: Date;
    emergencyType?: EmergencyType;
    comments?: EmergencyCommentBase[];
    driver?: DriverBase;
}
export interface EmergencyType {
    externalId?: string;
    severity?: string;
    title?: string;
    display?: string;
    isBillable?: boolean;
    billableAmount?: number;
    expectedResponseMinutes?: number;
    displayExpectedResponseMinutes?: boolean;
    id?: string;
    translations?: Object;
}
export interface EmergencyCommentBase {
    display?: string;
    driverSeenAt?: Date;
    userSeenAt?: Date;
    isInternal?: boolean;
    id?: string;
    createdAt?: Date;
    fromDriver?: boolean;
    fromUser?: boolean;
}
//# sourceMappingURL=interface.d.ts.map