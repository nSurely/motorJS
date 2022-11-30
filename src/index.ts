import "regenerator-runtime/runtime";
import { APIHandlerNoAuth, APIHandlerAuth } from "./utils/api";
import StorageManager from "./utils/storage";
import Auth from "./utils/auth";
import { applyMixins } from "./utils/helpers";
import Drivers from "./classes/drivers";
import Vehicles from "./classes/vehicles";
import Fleets from "./classes/fleets";
import { OrgSettings } from "./utils/api/org";
import { Search } from "./utils/search";
import models from "./models";

/**
 * Entry point for the SDK to interact with the Inaza API.
 * @break
 *
 * ## 📚 Help
 * - 📘 [Documentation](https://motor-sdk-docs.vercel.app/js)
 *
 * ## ⚡️ Submodules
 * - [Drivers](https://motor-sdk-docs.vercel.app/js/classes/drivers)
 * - [Vehicles](https://motor-sdk-docs.vercel.app/js/classes/vehicles)
 * - [Fleets](https://motor-sdk-docs.vercel.app/js/classes/fleets)
 * @break
 *
 * ## 📦 Installation
 * `npm install @inaza/motorJS`
 *
 * ## 🚀 Usage
 * ```js
 * // Import the motorJS object from the package
 * import motorJS from "motorJS";
 *
 * // Optional - Import AsyncStorage if you are using the MotorJS sdk in a react native project.
 * import AsyncStorage from "@react-native-async-storage/async-storage";
 *
 * // Initialise Auth
 * let auth = new motorJS.Auth({
 * 	orgId: "your-org-id",
 * 	region: "your-region",
 * 	email: "some-user@org.com",
 * 	password: "$tr0ngP@ssw0rd",
 * 	accountType: "user/driver",
 * });
 *
 * // Login
 * auth.login().then((res) => {
 * 	console.log(res);
 * });
 *
 * // Initialise the Motor SDK and pass the Auth object
 * let motor = new motorJS.Motor({
 * 	orgId: "your-org-id",
 * 	region: "your-region",
 * 	// Pass AsyncStorage for react-native.
 * 	// Else for any web-based project that runs in a browser, pass window.localStorage. eg. storage: window.localStorage
 * 	// You can keep this as null, however data such as bearerToken and refershToken will not be persisted when application is closed and re-opened.
 * 	storage: AsyncStorage,
 * 	// Pass the auth instance
 * 	auth: auth,
 * });
 *
 * motor.orgSettings().then((res) => {
 * 	console.log(res);
 * });
 *
 * motor
 * 	.getDriver({
 * 		driverId: env.testing.driverId1,
 * 	})
 * 	.then((driver) => {
 * 		console.log(driver.fullName());
 * 	});
 * ```
 *
 */

class Motor {
	static myInstance: Motor;
	orgId: string;
	region: string;
	url?: string;
	auth?: Auth;
	storageManager: StorageManager;
	api: APIHandlerNoAuth | APIHandlerAuth;

	/**
	 * Initialise Motor and return an instance of the Motor class.
	 *
	 * @param {Object} obj - An object.
	 * @param {string} obj.orgId - Your organisation ID.
	 * @param {string} obj.region - Your region. eg. us, eu, au.
	 * @param {string} obj.url - Optional. The base url of the API.
	 * @param {string} obj.auth - Optional. An instance of the Auth class.
	 * @param {string} obj.storage - Optional. Your storage. eg. window.localStorage, AsyncStorage.
	 * @returns {Motor}
	 */
	constructor({ orgId, region, url, auth, storage = null }: { orgId: string; region: string; url?: string; auth?: Auth; storage?: any }) {
		StorageManager.createStorage(storage);
		this.orgId = orgId;
		this.region = region;
		this.url = url;
		this.storageManager = StorageManager.getInstance();
		this.auth = auth;

		if (this.auth) {
			this.api = new APIHandlerAuth({
				orgId: this.orgId,
				region: this.region,
				url: this.url,
				auth: this.auth,
			});
		} else {
			this.api = new APIHandlerNoAuth({
				orgId: this.orgId,
				region: this.region,
				url: this.url,
			});
		}
	}

	async orgSettings(): Promise<OrgSettings | undefined> {
		if (!this.api.orgData) {
			await this.api.refreshOrgData();
		}

		return this.api.orgData;
	}

	async language(): Promise<string | undefined> {
		if (this.api.orgData) {
			return this.api.orgData.defaultLang;
		}
		let orgData = await this.orgSettings();
		return orgData?.defaultLang;
	}

	async orgName(): Promise<string | undefined> {
		if (this.api.orgData) {
			return this.api.orgData.displayName;
		}
		let orgData = await this.orgSettings();
		return orgData?.displayName;
	}

	async request({ method, path, params, data }: { method: string; path?: string; params?: object; data?: any }) {
		return await this.api.request({
			method,
			endpoint: path,
			params,
			data,
		});
	}
}

interface Motor extends Drivers, Vehicles, Fleets {}
applyMixins(Motor, [Drivers, Vehicles, Fleets]);

let motorJS = {
	Motor,
	Auth,
	Search,
	models,
};

// For webpack
Function("r", "motorJS = r")(motorJS);

export default motorJS;
