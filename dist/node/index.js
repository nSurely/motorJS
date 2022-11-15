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
require("regenerator-runtime/runtime");
const api_1 = require("./utils/api");
const storage_1 = __importDefault(require("./utils/storage"));
const auth_1 = __importDefault(require("./utils/auth"));
const helpers_1 = require("./utils/helpers");
const drivers_1 = __importDefault(require("./classes/drivers"));
const vehicles_1 = __importDefault(require("./classes/vehicles"));
const fleets_1 = __importDefault(require("./classes/fleets"));
const search_1 = require("./utils/search");
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
    /**
     * Initialise Motor and return an instance of the Motor class.
     * @returns {Motor}
     */
    constructor({ orgId, region, url, auth, storage = null }) {
        storage_1.default.createStorage(storage);
        this.orgId = orgId;
        this.region = region;
        this.url = url;
        this.storageManager = storage_1.default.getInstance();
        this.auth = auth;
        if (this.auth) {
            this.api = new api_1.APIHandlerAuth({
                orgId: this.orgId,
                region: this.region,
                url: this.url,
                auth: this.auth,
            });
        }
        else {
            this.api = new api_1.APIHandlerNoAuth({
                orgId: this.orgId,
                region: this.region,
                url: this.url,
            });
        }
    }
    orgSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.api.orgData) {
                yield this.api.refreshOrgData();
            }
            return this.api.orgData;
        });
    }
    request({ method, path, params, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.request({
                method,
                endpoint: path,
                params,
                data
            });
        });
    }
}
(0, helpers_1.applyMixins)(Motor, [drivers_1.default, vehicles_1.default, fleets_1.default]);
let motorJS = {
    Motor,
    Auth: auth_1.default,
    Search: search_1.Search
};
// For webpack
Function("r", "motorJS = r")(motorJS);
exports.default = motorJS;
//# sourceMappingURL=index.js.map