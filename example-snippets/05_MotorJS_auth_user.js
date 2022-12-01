// Import the motorJS object from the motorJS package
import motorJS from '@inaza.com/motorjs';

// Initialise the auth object. Here we are using a user account for authentication
let auth = new motorJS.Auth({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	email: "<< some-user@org.com >>", // <-- Pass users email id here
	password: "<< $tr0ngP@ssw0rd >>", // <-- Pass users password here
	accountType: "user", // <-- AccountType will be 'user' for user auth
});

// Try login in to validate if credentials are correct
auth.login().then((res) => {
	console.log(res);
});

// Initialise the Motor SDK and pass the auth object to it
let motor = new motorJS.Motor({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	auth: auth, // <-- Pass the auth object here
});

// You can start calling methods in the sdk
// As an example we are iterating over drivers in the system
(async () => {
	for await (let driver of motor.listDrivers({
		maxRecords: 10,
	})) {
		console.log(`Driver Fetched: ${driver.fullName()}`);
	}
})();
