let ops = ["eq", "ne", "gt", "gte", "lt", "lte", "like", "ilike"];

/**
 * Advanced search
 */
export class Search {
	value: any;
	operator: string;

	constructor({ value, operator = "eq" }: { value: any; operator?: string }) {
		this.value = value;
		this.operator = operator;
	}

	// Checks the type and returns the value as a string. Datetime is converted to ISO format
	private _getValueString() {
		if (this.value instanceof Date) {
			return this.value.toISOString();
		}
		return this.value.toString();
	}

	availableOperators() {
		return ops;
	}

	toString() {
		return `${this.operator}.${this._getValueString()}`;
	}
}
