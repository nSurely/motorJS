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
	// simply create a vehicle type, optionally along with risk loadings
	// note: risk loadings can be added throughout the system, on many models
	let vehicleType = await motor.createVehicleType({
		vehicleType: new motorJS.models.VehicleType({
			brand: "Toyota",
			model: "Camry",
			yearFloor: 2020,
			yearTop: 2022,
			fuelType: "petrol",
			transmission: "auto",
			risk: {
				ihr: {
					value: 1.2,
					weighting: 1.0,
					premium: {
						apply: true,
						inheritance: true,
					},
				},
			},
		}),
	});

	console.log(vehicleType.getDisplay());
})();
