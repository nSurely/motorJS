
import "regenerator-runtime/runtime";
import motorJS from "../../dist/node";

// Make sure .env file is present in the root directory of the repository. If not, create one based on the env.example file.
require("dotenv").config();

if (!process.env.ORG_ID || !process.env.REGION || !process.env.API_KEY || !process.env.USER_ID || !process.env.USER_PASSWORD) {
	throw new Error("Please set the environment variables in the .env file");
}

let auth = new motorJS.Auth({
	orgId: process.env.ORG_ID,
	region: process.env.REGION,
	email: process.env.USER_EMAIL,
	password: process.env.USER_PASSWORD,
	accountType: "user",
});

let motor = new motorJS.Motor({
	orgId: process.env.ORG_ID,
	region: process.env.REGION,
	auth: auth,
});

export { motor, auth };
