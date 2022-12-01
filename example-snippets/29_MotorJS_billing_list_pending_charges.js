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
	let driver = await motor.getDriver({
		driverId: "<< driver-id >>", // <-- Replace with the driver id
	});

	// you can optionally filter by type and/or status
	// in this example, we are listing all pending charges for premium payments
	// if you leave these as None, it will list all events
	let type = "base_premium";
	let status = "pending";

	for await (let charge of driver.listCharges({ event_type: type, event_status: status })) {
		console.log(charge);
	}
})();
