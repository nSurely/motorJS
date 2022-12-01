// Import the motorJS object from the motorJS package
import motorJS from '@inaza.com/motorjs';

// Initialise the auth object. Here we are using the apiKey for authentication
let auth = new motorJS.Auth({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	apiKey: "<< your-api-key >>", // <-- Replace with your api key
});

// Initialise the Motor SDK and pass the auth object to it
let motor = new motorJS.Motor({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	auth: auth, // <-- Pass the auth object here
});

// As an example we are iterating over drivers in the system
(async () => {
	for await (let driver of motor.listDrivers({
		maxRecords: 10,
	})) {
		console.log(`Driver Fetched: ${driver.fullName()}`);
	}
})();
