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

	// fetching our policy
	// usually there will only be one policy
	for await (let policy of driver.listPolicies()) {
		// if we are using a UBI policy, we can get the rates
		// otherwise this may return 0 or None, depending on configuration
		// here we are getting the rate per KM amount using the attribute
		// this is equivalent to the final calculated amount
		// also returned on the policy object
		console.assert(policy.ratePerKm == policy.final.rates.value);
		// the rate is an integer (cents, pence, etc.)
		// it is always in km
		console.log(`Rate per KM: ${policy.ratePerKm() / 100}`);
		// there is also an attribute to approximate the rate per mile
		console.log(`Rate per mile: ${policy.ratePerMile() / 100}`);
	}
})();
