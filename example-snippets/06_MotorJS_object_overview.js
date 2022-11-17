// Import the motorJS object from the motorJS package
import motorJS from "motorJS";

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

// Everything is an object
// Here we are iterating over 10 drivers
(async () => {
	for await (let driver of motor.listDrivers({
		maxRecords: 10,
	})) {
		// Each driver is actually a Driver object...
		console.log(driver.firstName);

		// and methods to keep things simple
		driver.listVehicles().then((vehicles) => {
			vehicles.forEach((vehicle) => {
				// now we are using a Vehicle object
				console.log(vehicle.getDisplay()); // "Toyota Corolla 08-C-1234
			});
		});
	}
})();
