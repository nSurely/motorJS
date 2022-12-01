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
	let vehicleId = "<< vehicle-id >>"; // <-- Replace with the vehicle id

	let fleet = await motor.getFleet({
		fleetId: "<< fleet-id >>", // <-- Replace with the fleet id
	});

	// we are adding a vehicle to a fleet
	// that any driver in the fleet can use
	await fleet.addVehicle({
		vehicleId: vehicleId,
		isOpenToAll: true,
	});

	// now we are requiring the vehicle to be explicitly assigned to a driver
	await fleet.updateVehicle({
		vehicleId: vehicleId,
		isOpenToAll: false,
	});

	// cleanup
	// the vehicle is no longer in the fleet
	// this does not delete the vehicle record, but it will no longer be available to the fleet
	await fleet.removeVehicle({
		vehicleId: vehicleId,
	});
})();
