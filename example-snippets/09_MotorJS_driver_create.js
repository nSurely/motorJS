import motorJS from "motorJS";

// The new driver
// Note: Driver is not created yet
let driverToCreate = new motorJS.models.Driver({
	firstName: "FirstName",
	lastName: "LastName",
	email: "someEmail@org.com",
});

// for most operations, we need an auth object
// Here we are using the user credentials for authentication
let auth = new motorJS.Auth({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	email: "<< some-user@org.com >>", // <-- Pass users email id here
	password: "<< $tr0ngP@ssw0rd >>", // <-- Pass users password here
	accountType: "user", // <-- AccountType will be 'user' for user auth
});

// Initialise the Motor SDK and pass the auth object to it
let motor = new motorJS.Motor({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	auth: auth, // <-- Pass the auth object here
});

// Create the driver
(async () => {
	let driver = await motor.createDriver({
		driver: driverToCreate,
		password: "somePassword",
	});

	let driverFetched = await motor.getDriver({
		driverId: driver.id,
	});

	// Assert that the driver was created
	console.assert(driverFetched.id === driver.id);
})();
