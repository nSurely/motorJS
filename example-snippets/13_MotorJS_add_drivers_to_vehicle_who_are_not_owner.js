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
	// fetch our vehicle
	let vehicle = await motor.getVehicle({
		vehicleId: "<< vehicle-id >>", // <-- Replace with the vehicle id
	});

	// now we can simply add a named driver to it
	let drv = await vehicle.addDriver({
		driverId: "<< driver-id >>", // <-- Replace with the driver id
		isOwner: false,
		isPrimaryDriver: false,
	});

	console.log(drv.getDisplay());

	// or
	// if you would like more control over the DRV record that is created, you can pass a DRV object
	let drv_obj = new motorJS.models.DriverVehicle({
		displayName: "My Weekend Car",
		// they only have access to the vehicle temporarily (a week)
		expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
	});

    drv = await vehicle.addDrv({
        driverId: "<< driver-id >>", // <-- Replace with the driver id
        drv: drv_obj,
    });

    console.log(drv.getDisplay());
})();
