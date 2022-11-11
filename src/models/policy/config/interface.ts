export interface Config {
	display?: string;
	description?: string;
	currency?: string;
	generation?: Generation;
	terms?: Terms;
}

export interface Generation {
	maxPassengersInheritVehicle?: boolean;
	autoIssued?: boolean;
}

export interface Terms {
	url?: string;
	html?: string;
	attachments?: [];
	requiresDriverEsignature?: boolean;
}
