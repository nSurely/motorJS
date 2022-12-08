import motorJS from '@inaza/motorjs';

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

// create a search object
// here we are doing a loose match for emails that contain "gmail" (ilike)
let emailSearch = new motorJS.Search({
	operator: "ilike",
	value: "gmail",
});

// date of birth search
// here we are doing a strict match for date of birth
let dobSearch = new motorJS.Search({
	operator: "eq",
	value: new Date("1980-01-31"),
});

// here we are looping over 10 drivers who:
// - have a gmail account
// - were born on the 31st of January 1980
(async () => {
	for await (let driver of motor.listDrivers({
		maxRecords: 10,
		email: emailSearch,
		dob: dobSearch,
	})) {
		console.log(driver.email); // xxx@gmail.com
		console.log(driver.dob); // 1980-01-31
	}
})();
