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
	let driver = await motor.getDriver({
		driverId: "<< driver-id >>", // <-- Replace with the driver id
	});

	// we don't need to get the primary billing account, we can just charge
	// it will use the primary billing account, or fail if there is none

	// remember all billing amounts are in cents
	let amount = 10000;

	// this is a simple charge, with no extra data
	let charge_1 = await driver.charge((amount = amount));

	console.assert(charge_1.amount == amount);

	// or if you want to add some extra data
	// you can create a BillingEvent object and pass it to charge

	let charge_2 = await driver.charge({
		event: new motorJS.models.BillingEvent({
			amount: amount,
			description: "This is a charge",
			type: "other",
		}),
	});

	console.assert(charge_2.amount == amount);
})();
