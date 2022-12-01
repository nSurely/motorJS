// Import the motorJS object from the motorJS package
import motorJS from '@inaza.com/motorjs';

// Initialise the auth object. Here we are using a driver account for authentication
let auth = new motorJS.Auth({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
	email: "<< some-driver@org.com >>", // <-- Pass driver email id here
	password: "<< $tr0ngP@ssw0rd >>", // <-- Pass drivers password here
	accountType: "driver", // <-- AccountType will be 'driver' for driver auth
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

// You can start using methods from the sdk
motor
	.getDriver({
		driverId: "<< driver-id >>",
	})
	.then((driver) => {
		console.log(driver.fullName());
	});
