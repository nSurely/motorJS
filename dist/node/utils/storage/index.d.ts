import Storage from "react-native-storage";
export default class StorageManager {
    static myInstance: StorageManager;
    storage: Storage;
    constructor(storageBackend?: any);
    /**
     * InitialiseSets the storage type to be used by the StorageManager.
     * @returns {StorageManager}
     */
    static createStorage(storageBackend?: any): void;
    /**
     * @returns {StorageManager}
     */
    static getInstance(): StorageManager;
    save({ key, data }: {
        key: string;
        data: any;
    }): Promise<void>;
    load({ key }: {
        key: string;
    }): Promise<any>;
    remove({ key }: {
        key: string;
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map