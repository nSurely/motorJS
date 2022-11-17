import motorJS from "motorJS";

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
	try {
		// Search for the vehicle type
		for await (let vehicleType of motor.listVehicleTypes({
			brand: new motorJS.Search({
				operator: "ilike",
				value: "toyota",
			}),
			model: new motorJS.Search({
				operator: "ilike",
				value: "camry",
			}),
			internalFields: true,
			maxRecords: 1,
		})) {
			// Initialise a new vehicle object
			let vehicle = new motorJS.models.Vehicle({
				regPlate: "D-123-456",
				vin: "12345678901234567",
				vehicle: vehicleType,
			});

			// To create a new vehicle, ypu meed to pass the vehicle object
			await motor
				.createVehicle({
					vehicle: vehicle, // <-- Vehicle object
				})
				.then((v) => {
					// New vehicle created
					console.log(v.getDisplay());
				});
		}
	} catch (err) {
		console.log(err);
	}
})();
