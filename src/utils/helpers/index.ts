
// Mixin function for multiple inheritance
// https://www.typescriptlang.org/docs/handbook/mixins.html
export function applyMixins(derivedCtor: any, constructors: any) {
	constructors.forEach((baseCtor: any) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
		});
	});
}

export function isJsonString(str = "") {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function deleteFromObject(keyPart: string, obj: any){
    for (var k in obj){          // Loop through the object
        if(~k.indexOf(keyPart)){ // If the current key contains the string we're looking for
            delete obj[k];       // Delete obj[key];
        }
    }
}