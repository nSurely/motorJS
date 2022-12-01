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
	let driverId = "<< driver-id >>"; // <-- Replace with the driver id

	let fleet = await motor.getFleet({
		fleetId: "<< fleet-id >>", // <-- Replace with the fleet id
	});

	// the driver is now in the fleet
	// with no privileges to manage vehicles, billing or other drivers
	await fleet.addDriver({
		driverId: driverId,
		isVehicleManager: false,
		isDriverManager: false,
		isBillingManager: false,
	});

	// lets remove the driver and add them again, but with vehicles

	await fleet.removeDriver({
		driverId: driverId,
	});

	// if we also want to assign vehicles to the driver on create...
	// the driver will only have access to these 2 vehicles and any "open" vehicles
	await fleet.addDriver({
		driverId: driverId,
		vehicleIds: ["<< vehicle-id >>", "<< vehicle-id >>"],
	});

	// and lets update the privileges to give the driver access to manage vehicles
	await fleet.updateDriver({
		driverId: driverId,
		isVehicleManager: true,
	});
})();
