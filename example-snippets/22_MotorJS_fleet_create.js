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
	let fleetToCreate = new motorJS.models.Fleet({
		display: "New Fleet",
		description: "This is a new fleet",
		isActive: true,
	});

	let fleet = await motor.createFleet(fleetToCreate);

	// do something with the fleet...

	let fleetFetched = await motor.getFleet(fleet.id);

	console.assert(fleetFetched.id === fleet.id);
})();
