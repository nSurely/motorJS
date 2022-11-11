"use strict";
// Mixin function for multiple inheritance
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonString = exports.applyMixins = void 0;
// https://www.typescriptlang.org/docs/handbook/mixins.html
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
exports.applyMixins = applyMixins;
function isJsonString(str = "") {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isJsonString = isJsonString;
//# sourceMappingURL=index.js.map