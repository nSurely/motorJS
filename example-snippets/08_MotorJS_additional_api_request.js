import motorJS from "motorJS";

let auth = new motorJS.Auth({
	orgId: "<< your-org-id >>",
	region: "<< your-region >>",
	apiKey: "<< your-api-key >>",
});

let motor = new motorJS.Motor({
	orgId: "<< your-org-id >>",
	region: "<< your-region >>",
	auth: auth,
});

// lets fetch the weekly utilization report for a vehicle over the course of a month
(async () => {
	let vehicleId = "<<my vehicle id>>";

	// make request
	let response = motor.request({
		method: "GET",
		path: `/registered-vehicles/${vehicleId}/utilization`,
		params: {
			start: "2022-01-01",
			end: "2022-01-31",
		},
	});

	// loop through each object in the response
	for (let week of response) {
		console.log(`${week.utilisation * 100}%`); // 43%
		console.log(`${week.distance.total}km`); // 123km
	}
})();
