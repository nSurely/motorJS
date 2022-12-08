import motorJS from '@inaza/motorjs';

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
		// getting the premium amount using the attribute
		// this is equivalent to the final calculated amount
		// also returned on the policy object
		console.assert(policy.premiumAmount() == policy.final.premium.value);

		// the premium is an integer (cents, pence, etc.)
		console.log(`Premium: ${policy.premiumAmount() / 100}`);
	}
})();
