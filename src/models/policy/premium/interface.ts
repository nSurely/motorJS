export interface Premium {
	value?: number;
	payableImmediate?: boolean;
	frequency?: string;
	useFrequency?: boolean;
	nextPaymentDate?: Date;
	variable?: boolean;
}