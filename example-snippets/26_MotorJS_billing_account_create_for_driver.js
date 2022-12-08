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

	// we need to create a billing account object
	let account = new motorJS.models.BillingAccount({
		isPrimary: true,
		currencyIsoCode: "EUR",
		externalId: "my_external_id",
		card: {
			name: "My Card",
			number: "4111111111111111",
			expiry: "12/2022",
			cvv: "123",
		},
	});

	// this creates a new primary billing account for the driver
	// any new billing events will be charged to this account
	await driver.createBillingAccount(account);

	// let's fetch the new account and run some checks
	let newAccount = await driver.getPrimaryBillingAccount();

	// we can add an external id to the account to help us identify it
	console.assert(newAccount.externalId === account.externalId);
	console.assert(newAccount.isPrimary === true);
})();
