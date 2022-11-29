import 'regenerator-runtime/runtime'
import motorJS from "../dist/node";

// Make sure env.json file is present in the root directory of the repository. If not, create one based on the env.example.json file.
import * as env from '../env.json';

describe("motorAuth", () => {
	it("should be defined", () => {
		expect(motorJS.Auth).toBeDefined();
	});
    it("should be able to create a new instance", () => {
        let auth = new motorJS.Auth({
            orgId: env.init.orgId, // <-- Replace with your organisation ID
            region: env.init.region, // <-- Replace with your region
            email: env.auth.email, // <-- Replace with users/drivers email
            password: env.auth.password, // <-- Replace with users/drivers password
            accountType: env.auth.accountType, // <-- Can be either "user" or "driver"
        });
    });
});
