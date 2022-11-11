"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromObject = exports.isJsonString = exports.applyMixins = void 0;
// Mixin function for multiple inheritance
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
function deleteFromObject(keyPart, obj) {
    for (var k in obj) { // Loop through the object
        if (~k.indexOf(keyPart)) { // If the current key contains the string we're looking for
            delete obj[k]; // Delete obj[key];
        }
    }
}
exports.deleteFromObject = deleteFromObject;
//# sourceMappingURL=index.js.map