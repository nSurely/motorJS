import "regenerator-runtime/runtime";
import motorJS from "../dist/node";
require("dotenv").config();

// Make sure env.json file is present in the root directory of the repository. If not, create one based on the env.example.json file.
// import * as env from "../env.json";

describe("Auth", () => {
	it("should be defined", () => {
		expect(motorJS.Auth).toBeDefined();
	});
	it("should be able to create a new instance", async () => {
		let auth = new motorJS.Auth({
			orgId: process.env.ORG_ID, // <-- Replace with your organisation ID
			region: process.env.REGION, // <-- Replace with your region
			email: process.env.USER_EMAIL, // <-- Replace with users/drivers email
			password: process.env.USER_PASSWORD, // <-- Replace with users/drivers password
			accountType: "user", // <-- Can be either "user" or "driver"
		});

		try {
			let login = await auth.login();
		} catch (error) {
            throw error;
        }
	});
});
