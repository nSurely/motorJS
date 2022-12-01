import motorJS from '@inaza.com/motorjs';

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
	// fetching a vehicle (regstered vehicle)
	let vehicle = await motor.getVehicle({
		vehicleId: "<< vehicle-id >>", // <-- Replace with the vehicle id
	});

	// NOTE: you don't need to add any of these fields if you don't want to
	// it will use default values set on the org level

	// create a policy for the vehicle
	// with a premium of 1000 and a voluntary deductible (excess) of 100
	// for a period of 1 year.

	let policy = new motorJS.models.Policy({
		premium: {
			// currency is in cents
			value: 100000,
			payableImmediate: true,
		},
		duration: {
			start: new Date(),
			end: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000),
		},
		excess: {
			voluntary: 10000,
		},
	});

	// pass optional policy, if you don't pass it, it will use the defaults
	let newPolicy = await vehicle.createPolicy({
		policy: policy,
	});

	console.log(`Premium ${newPolicy.premiumAmount() / 100}`); // 'Premium $1000.00'
})();
