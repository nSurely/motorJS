export interface Rewards {
	enabled?: boolean;
	maxMonthly?: number;
	rates?: RatesClass;
	premium?: RatesClass;
}

export interface RatesClass {
	enabled?: boolean;
	maxDiscountPc?: number;
}