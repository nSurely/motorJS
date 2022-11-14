import { BillingAccountBase, CardBase } from "./interface";
import { DriverBase } from "../../drivers/interface";

export class BillingAccount {
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

	constructor(billingAccount: BillingAccountBase) {
		Object.assign(this, billingAccount);
	}
    
	getDisplay(): string {
		if (!this.card) {
			return "Unknown";
		}
		return `${this.isPrimary ? "Primary " : ""}${this.card.name} - ${this.card.lastFour}`;
	}
}
