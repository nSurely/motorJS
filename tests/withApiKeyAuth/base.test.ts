import motorJS from "../../dist/node";
import { auth, motor } from "./init";

describe("Base with API Key Auth", () => {
	it("can fetch org settings", async () => {
		try {
			let orgSettings = await motor.orgSettings();
			expect(typeof orgSettings).toBe("object");
		} catch (error) {
			throw error;
		}
	});

	it("has org name", async () => {
		try {
			let orgName = await motor.orgName();
			expect(typeof orgName).toBe("string");
		} catch (error) {
			throw error;
		}
	});

	it("can fetch language", async () => {
		try {
			let language = await motor.language();
			// exptect to be a string
			expect(typeof language).toBe("string");
			expect(["en", "fr", "de", "es", "it", "nl", "pt", "sv", "ar"].includes(language!)).toBe(true);
		} catch (error) {
			throw error;
		}
	});

	it("can make additional api requests", async () => {
		try {
			let response = await motor.request({
				method: "GET",
				path: "/config/drivers",
			});
			expect(typeof response).toBe("object");
		} catch (error) {
			throw error;
		}

		try {
			let response = await motor.request({
				method: "GET",
				path: "/config/risk",
			});
			expect(Array.isArray(response)).toBe(true);
		} catch (error) {
			throw error;
		}
	});
});
