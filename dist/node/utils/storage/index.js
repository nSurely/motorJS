"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_storage_1 = __importDefault(require("react-native-storage"));
class StorageManager {
    constructor(storageBackend = null) {
        this.storage = new react_native_storage_1.default({
            // maximum capacity, default 1000 key-ids
            size: 1000,
            // Use AsyncStorage for RN apps, or window.localStorage for web apps.
            // If storageBackend is not set, data will be lost after reload.
            storageBackend: storageBackend,
            // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
            // can be null, which means never expire.
            defaultExpires: null,
            // cache data in the memory. default is true.
            enableCache: true,
        });
    }
    /**
     * InitialiseSets the storage type to be used by the StorageManager.
     * @returns {StorageManager}
     */
    static createStorage(storageBackend = null) {
        if (this.myInstance == null) {
            this.myInstance = new StorageManager(storageBackend);
        }
    }
    /**
     * @returns {StorageManager}
     */
    static getInstance() {
        if (this.myInstance == null) {
            throw new Error("StorageManager has not been initialised. Initialise with StorageManager.createStorage(storageBackend)");
        }
        return this.myInstance;
    }
    save({ key, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.save({
                key: key,
                data: data,
            });
        });
    }
    load({ key }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.load({
                key: key,
            });
        });
    }
    remove({ key }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.remove({
                key: key,
            });
        });
    }
}
exports.default = StorageManager;
//# sourceMappingURL=index.js.map