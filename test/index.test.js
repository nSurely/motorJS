import 'regenerator-runtime/runtime'
import { motorAuth } from "../src/index";

// Make sure env.json file is present in the root directory of the repository. If not, create one based on the env.example.json file.
import * as env from '../env.json';

describe("motorAuth", () => {
	it("should be defined", () => {
		expect(motorAuth).toBeDefined();
	});
    it("should be able to create a new instance", () => {
        let auth = new motorAuth({
            orgId: env.orgId,
            region: env.region,
            email: env.email,
            password: env.password,
            accountType: env.accountType,
        });
    });
});
