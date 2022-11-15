"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
let ops = ["eq", "ne", "gt", "gte", "lt", "lte", "like", "ilike"];
/**
 * Advanced search
 */
class Search {
    constructor({ value, operator = "eq" }) {
        this.value = value;
        this.operator = operator;
    }
    // Checks the type and returns the value as a string. Datetime is converted to ISO format
    _getValueString() {
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
exports.Search = Search;
//# sourceMappingURL=index.js.map