export interface Extras {
	repairs?: Repairs;
	alarm?: Alarm;
	breakdown?: Breakdown;
	rescue?: Rescue;
	theft?: Theft;
	keyReplacement?: KeyReplacement;
	windscreen?: Windscreen;
}

export interface Alarm {
	enforce?: boolean;
}

export interface Breakdown {
	cover?: boolean;
	coverLimit?: number;
	cost?: number;
}

export interface Rescue {
	cover?: boolean;
	coverLimit?: number;
	cost?: number;
}

export interface Theft {
	cover?: boolean;
	coverLimit?: number;
	cost?: number;
}

export interface KeyReplacement {
	cover?: boolean;
	coverLimit?: number;
	cost?: number;
}

export interface Repairs {
	enforceApprovedSuppliers?: boolean;
	courtesyVehicle?: boolean;
}

export interface Windscreen {
	cover?: boolean;
	cost?: number;
}