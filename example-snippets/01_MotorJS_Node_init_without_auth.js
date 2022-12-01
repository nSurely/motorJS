// Import the motorJS object from the motorJS package
import motorJS from '@inaza.com/motorjs';

// Initialise the Motor SDK
let motor = motorJS.Motor({
	orgId: "<< your-org-id >>", // <-- Replace with your organisation ID
	region: "<< your-region >>", // <-- Replace with your region
});

// Perform actions here
motor.orgSettings().then((res) => {
	console.log(res);
});
