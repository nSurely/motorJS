export interface RiskBase {
	lookback?: Ihr;
	dynamic?: Dynamic;
	ihr?: Ihr;
}

export interface Dynamic {
	apply?: boolean;
	process?: string;
	weighting?: number;
}

export interface Ihr {
	value?: number;
	weighting?: number;
	rates?: Premium;
	premium?: Premium;
}

export interface Premium {
	inheritance?: boolean;
	apply?: boolean;
}
