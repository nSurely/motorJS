import motorJS from "../../dist/node";
import { Vehicle } from "../../dist/node/models/vehicles/rv";
import { auth, motor } from "./init";

describe("Base Vehicle with API Key Auth", () => {
	it("can list vehicles", async () => {
		let len = 0;
		try {
			for await (let driver of motor.listVehicles({
				maxRecords: 1,
			})) {
				len += 1;
				expect(len).toBe(1);
				expect(driver).toBeInstanceOf(motorJS.models.Vehicle);
			}
		} catch (error) {
			throw error;
		}
	});

	it("can search vehicles", async () => {
		let len = 0;
		try {
			for await (let vehicle of motor.listVehicles({
				maxRecords: 5,
			})) {
				len += 1;
				expect(len).toBeGreaterThan(0);
				expect(vehicle).toBeInstanceOf(motorJS.models.Vehicle);
				
                if (vehicle.vin && vehicle.regPlate) {
                    try {
                        for await (let v of motor.listVehicles({
                            maxRecords: 10,
                            vin: new motorJS.Search({
                                value: vehicle.vin,
                                operator: "ilike",
                            }),
                            regPlate: new motorJS.Search({
                                value: vehicle.regPlate,
                                operator: "ilike",
                            }),
                        })) {
                            expect(v).toBeInstanceOf(motorJS.models.Vehicle);
                            expect(v.vin).toBe(vehicle.vin);
                            expect(v.regPlate).toBe(vehicle.regPlate);
                        }
                    } catch (error) {
                        throw error;
                    }
                }

			}
		} catch (error) {
			throw error;
		}
	}, 10000);

	it("can fetch a vehicle", async () => {
		try {
			for await (let v of motor.listVehicles({
				maxRecords: 1,
			})) {
				if (!v.id) {
					throw new Error("Vehicle ID is missing");
				}
				let vehicle = await motor.getVehicle({
					vehicleId: v.id,
				});
				expect(vehicle).toBeInstanceOf(motorJS.models.Vehicle);
				expect(vehicle.id).toBe(v.id);
			}
		} catch (error) {
			throw error;
		}
	});

    it("can list vehicle types", async () => {
		let len = 0;
        try {
            for await (let vehicleType of motor.listVehicleTypes({
				maxRecords: 100,
			})) {
				len += 1;
				expect(len).toBeGreaterThan(0);
                expect(vehicleType).toBeInstanceOf(motorJS.models.VehicleType);
            }
        }
		catch (error) {
			throw error;
		}
	}, 10000);

	// it("can create a driver", async () => {
	// 	let driverToCreate = new motorJS.models.Driver({
	// 		firstName: "John",
	// 		lastName: "Doe",
	// 		// generate random 5 character email
	// 		email: Math.random().toString(36).slice(2, 12) + "@example.com",
	// 	});

	// 	try {
	// 		let driver = await motor.createDriver({
	// 			driver: driverToCreate,
	// 			password: Math.random().toString(36).slice(2, 12),
	// 			sendInvite: false,
	// 			sendWebhook: false,
	// 		});
	// 		expect(driver).toBeInstanceOf(motorJS.models.Driver);
	// 		expect(driver.firstName).toBe(driverToCreate.firstName);
	// 		expect(driver.lastName).toBe(driverToCreate.lastName);
	// 		expect(driver.email).toBe(driverToCreate.email);

	// 		await driver.delete();

	// 		// try to fetch the driver again
	// 		try {
	// 			await motor.getDriver({
	// 				driverId: driver.id!,
	// 			});
    //             throw new Error("Driver should not exist");
	// 		} catch (error) {
	// 			expect(error.message).not.toBe("Driver should not exist");
	// 		}
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// });
});
