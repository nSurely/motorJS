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
	let vehicleId = "<< vehicle-id >>"; // <-- Replace with the vehicle id
	let driverId = "<< driver-id >>"; // <-- Replace with the driver id

	let fleet = await motor.getFleet({
		fleetId: "<< fleet-id >>", // <-- Replace with the fleet id
	});

	// add vehicle
	await fleet.addVehicle({
		vehicleId: vehicleId,
		isOpenToAll: false,
	});

	// add driver
	await fleet.addDriver({
		driverId: driverId,
	});

	// the driver will now be able to use this vehicle
	// for the next week... (eg. a rental)
	// set expires_at to None for a non-expiring assignment (eg. commercial fleet)
	await fleet.addDriverToVehicle({
		driverId: driverId,
		vehicleId: vehicleId,
		expiresAt: new Date() + 7 * 24 * 60 * 60 * 1000,
	});
})();
