import "regenerator-runtime/runtime";
import motorJS from "../dist/node";

// Make sure .env file is present in the root directory of the repository. If not, create one based on the env.example file.
require("dotenv").config();

describe("Auth with API Key", () => {
	let auth, motor;
	beforeAll(() => {
		expect(motorJS.Auth).toBeDefined();
		
		auth = new motorJS.Auth({
			orgId: process.env.ORG_ID,
			region: process.env.REGION,
			apiKey: process.env.API_KEY,
		});

		motor = new motorJS.Motor({
			orgId: process.env.ORG_ID,
			region: process.env.REGION,
			auth: auth,
		});
	});

	it("can authenticate with an api key", async () => {
		// async generator test with jest
		try {
			for await (let driver of motor.listDrivers({
				maxRecords: 10,
			})) {
				expect(driver).toBeDefined();
			}
		} catch (error) {
			throw error;
		}
	});
});

describe("Auth with User", () => {
	let auth;
	beforeAll(() => {
		expect(motorJS.Auth).toBeDefined();
		
		auth = new motorJS.Auth({
			orgId: process.env.ORG_ID,
			region: process.env.REGION,
			email: process.env.USER_EMAIL,
			password: process.env.USER_PASSWORD,
			accountType: "user",
		});
	});

	it("can login", async () => {
		try {
			let login = await auth.login();
		} catch (error) {
			throw error;
		}
	});
});

describe("Auth with Driver", () => {
	let auth;
	beforeAll(() => {
		expect(motorJS.Auth).toBeDefined();
		
		auth = new motorJS.Auth({
			orgId: process.env.ORG_ID,
			region: process.env.REGION,
			email: process.env.DRIVER_EMAIL,
			password: process.env.DRIVER_PASSWORD,
			accountType: "driver",
		});
	});

	it("can login", async () => {
		try {
			let login = await auth.login();
		} catch (error) {
			throw error;
		}
	});
});