import motorJS from "motorJS";

// Initialise the auth object. Here we are using the apiKey for authentication
let auth = new motorJS.Auth({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	apiKey: "<< your-api-key >>", // <-- Replace with your api key
});

let motor = new motorJS.Motor({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	auth: auth, // <-- Pass the auth object here
});

(async () => {
	let driver = await motor.getDriver({
		driverId: "<< driver-id >>", // <-- Replace with the driver id
	});

	// fetching their drv
    let drv = await driver.listVehicles();

    // this will create a DRV policy type using all the org defaults
    let newPolicy = await drv[0].createPolicy();

    console.log(`Premium ${newPolicy.premiumAmount() / 100}`); // 'Premium $1000.00'

    // policy may be in 'quote' state, in which case you need to accept it...
})();
