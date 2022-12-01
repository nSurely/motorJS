import motorJS from "../../dist/node";
import { auth, motor } from "./init";

describe("Base Driver with API Key Auth", () => {
	it("can list drivers", async () => {
		let len = 0;
		try {
			for await (let driver of motor.listDrivers({
				maxRecords: 1,
			})) {
				len += 1;
				expect(len).toBe(1);
				expect(driver).toBeInstanceOf(motorJS.models.Driver);
			}
		} catch (error) {
			throw error;
		}
	});

	it("can search drivers", async () => {
		let len = 0;
		try {
			for await (let driver of motor.listDrivers({
				firstName: new motorJS.Search({
					value: "joe",
					operator: "ilike",
				}),
				dob: new motorJS.Search({
					value: "1942-11-20",
					operator: "eq",
				}),
				maxRecords: 10,
			})) {
				len += 1;
				expect(len).toBeGreaterThan(0);
				expect(driver).toBeInstanceOf(motorJS.models.Driver);
				// lower case the first name
				expect(driver.firstName!.toLowerCase()).toBe("joe");
			}
		} catch (error) {
			throw error;
		}
	});

	it("can fetch a driver", async () => {
		let len = 0;
		try {
			for await (let d of motor.listDrivers({
				maxRecords: 1,
			})) {
				if (!d.id) {
					throw new Error("Driver ID is missing");
				}
				let driver = await motor.getDriver({
					driverId: d.id,
				});
				expect(driver).toBeInstanceOf(motorJS.models.Driver);
				expect(driver.id).toBe(d.id);
			}
		} catch (error) {
			throw error;
		}
	});

	it("can create a driver", async () => {
		let driverToCreate = new motorJS.models.Driver({
			firstName: "MotorJS",
			lastName: "Test",
			// generate random 5 character email
			email: Math.random().toString(36).slice(2, 12) + "@example.com",
		});

		try {
			let driver = await motor.createDriver({
				driver: driverToCreate,
				password: Math.random().toString(36).slice(2, 12),
				sendInvite: false,
				sendWebhook: false,
			});
			expect(driver).toBeInstanceOf(motorJS.models.Driver);
			expect(driver.firstName).toBe(driverToCreate.firstName);
			expect(driver.lastName).toBe(driverToCreate.lastName);
			expect(driver.email).toBe(driverToCreate.email);

			try {
				await driver.delete();
			} catch (error) {
				throw error;
			}

			// try to fetch the driver again
			try {
				await motor.getDriver({
					driverId: driver.id!,
				});
				throw new Error("Driver should not exist");
			} catch (error) {
				expect(error.message).not.toBe("Driver should not exist");
			}
		} catch (error) {
			throw error;
		}
	});
});
