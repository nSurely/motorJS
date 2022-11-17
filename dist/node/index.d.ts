import "regenerator-runtime/runtime";
import { APIHandlerNoAuth, APIHandlerAuth } from "./utils/api";
import StorageManager from "./utils/storage";
import Auth from "./utils/auth";
import Drivers from "./classes/drivers";
import Vehicles from "./classes/vehicles";
import Fleets from "./classes/fleets";
import { OrgSettings } from "./utils/api/org";
import { Search } from "./utils/search";
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
declare class Motor {
    static myInstance: Motor;
    orgId: string;
    region: string;
    url?: string;
    auth?: Auth;
    storageManager: StorageManager;
    api: APIHandlerNoAuth | APIHandlerAuth;
    /**
     * Initialise Motor and return an instance of the Motor class.
     * @returns {Motor}
     */
    constructor({ orgId, region, url, auth, storage }: {
        orgId: string;
        region: string;
        url?: string;
        auth?: Auth;
        storage: any;
    });
    orgSettings(): Promise<OrgSettings | undefined>;
    request({ method, path, params, data }: {
        method: string;
        path?: string;
        params?: object;
        data?: any;
    }): Promise<any>;
}
interface Motor extends Drivers, Vehicles, Fleets {
}
declare let motorJS: {
    Motor: typeof Motor;
    Auth: typeof Auth;
    Search: typeof Search;
    models: {
        Driver: typeof import("./models/drivers").Driver;
        BillingAccount: typeof import("./models/billing/accounts").BillingAccount;
        BillingEvent: typeof import("./models/billing/events").BillingEvent;
        Policy: typeof import("./models/policy").Policy;
        DriverVehicle: typeof import("./models/vehicles/drv").DriverVehicle;
        Vehicle: typeof import("./models/vehicles/rv").Vehicle;
        VehicleType: typeof import("./models/vehicles/v").VehicleType;
    };
};
export default motorJS;
//# sourceMappingURL=index.d.ts.map