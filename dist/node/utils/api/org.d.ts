export interface App {
    autoTrackingOn?: boolean;
    uiLayout?: number;
    showTripsOn?: boolean;
    signupOn?: boolean;
    enforcements?: Enforcements;
}
export interface Enforcements {
    billingAccount?: boolean;
    policy?: boolean;
    vehicle?: boolean;
    documents?: boolean;
}
export interface Config {
    defaultLang?: string;
    requireProofOfAddress?: boolean;
    requireId?: boolean;
    requireSelfie?: boolean;
    requireVehiclePicFull?: boolean;
    requireVehiclePicSingle?: boolean;
    requireVehicleProofOfReg?: boolean;
    requireDriversLicense?: boolean;
    driverApproval?: boolean;
    vehicleApproval?: boolean;
}
export interface Design {
    primaryHex?: string;
    secondaryHex?: string;
    tertiaryHex?: string;
    fontFamilyPrimary?: string;
    fontFamilySecondary?: string;
    fontPrimaryHex?: string;
    fontSecondaryHex?: string;
    primaryLogoUrl?: string;
    secondaryLogoUrl?: string;
    primaryLogoUrlSmall?: string;
    secondaryLogoUrlSmall?: string;
}
export interface Features {
    claimsOn?: boolean;
    emergenciesOn?: boolean;
    rewardsOn?: boolean;
    scoringOn?: boolean;
    scoringLeaderboardOn?: boolean;
    billingOn?: boolean;
    fleetOn?: boolean;
    fleetBillingOn?: boolean;
}
export interface Policy {
    policyDrvOn?: boolean;
    policyRvOn?: boolean;
    policyDriverOn?: boolean;
    policyFleetOn?: boolean;
}
export interface Telematics {
    autoTracking?: AutoTracking;
    dataCapture?: DataCapture;
}
export interface AutoTracking {
    on?: boolean;
    allowSnooze?: boolean;
    checkInterval?: number;
    distance?: number;
    distanceOn?: boolean;
    duration?: number;
    durationOn?: boolean;
}
export interface DataCapture {
    gpsInterval?: number;
    accelerometerInterval?: number;
    gyroscopeInterval?: number;
    magnetometerInterval?: number;
    gpsOn?: boolean;
    accelerometerOn?: boolean;
    gyroscopeOn?: boolean;
    magnetometerOn?: boolean;
}
export interface OrgSettings {
    profileType?: string;
    sourceIdType?: string;
    design?: Design;
    policy?: Policy;
    features?: Features;
    app?: App;
    telematics?: Telematics;
    displayName?: string;
    defaultLang?: string;
    tos?: {
        [key: string]: boolean | null;
    };
    config?: Config;
}
//# sourceMappingURL=org.d.ts.map