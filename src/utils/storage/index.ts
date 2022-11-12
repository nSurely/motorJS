import Storage from "react-native-storage";

export default class StorageManager {
	static myInstance: StorageManager;
	storage: Storage;

	constructor(storageBackend: any = null) {
		this.storage = new Storage({
			// maximum capacity, default 1000 key-ids
			size: 1000,

			// Use AsyncStorage for RN apps, or window.localStorage for web apps.
			// If storageBackend is not set, data will be lost after reload.
			storageBackend: storageBackend, // for web: window.localStorage

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
    static createStorage(storageBackend: any = null): void {
		if (this.myInstance == null) {
			this.myInstance = new StorageManager(storageBackend);
		}
	}

	/**
	 * @returns {StorageManager}
	 */
    static getInstance(): StorageManager {
		if (this.myInstance == null) {
			throw new Error("StorageManager has not been initialised. Initialise with StorageManager.createStorage(storageBackend)");
		}

		return this.myInstance;
	}

	async save({ key, data }: { key: string; data: any }) {
		await this.storage.save({
			key: key,
			data: data,
		});
	}

	async load({ key }: { key: string }) {
		return await this.storage.load({
			key: key,
		});
	}

	async remove({ key }: { key: string }) {
		await this.storage.remove({
			key: key,
		});
	}
}
