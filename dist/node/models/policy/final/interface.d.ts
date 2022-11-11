export interface Final {
    requiresReprice?: boolean;
    rates?: FinalRates;
    premium?: FinalPremium;
}
export interface FinalPremium {
    value?: number;
    appliedRiskMultiplier?: number;
}
export interface FinalRates {
    value?: number;
    max?: number;
    min?: number;
    appliedRiskMultiplier?: number;
}
//# sourceMappingURL=interface.d.ts.map