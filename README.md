# motorJS

motorJS provides a simple interface to the Inaza Motor APIs.

The goal of motorJS and other Inaza libraries and SDKs are to provide a layer of abstraction above the core Inaza services. By doing so, new solutions can be created in a shorter period of time as common areas such as auth, API routing and data parsing is taken care of.

## Installation

### Option 1: Importing the package in your frontend/backend project

Install the motor-js package using npm:

```console
foo@bar:~$ npm install @inaza/motor-js
```

Import motorJS

```js
import motorJS from "motor-js";
```

### Option 2: Importing it directly via CDN

If your web based project does not support importing packages, you can still use motorJS by including it as a external script in your project

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Example HTML</title>
		<script type="text/javascript" src="link-to-bundled-script-file"></script>
	</head>
	<body>
		...
	</body>
	<script type="text/javascript">
		// You can make use on motorJS obj
	</script>
</html>
```

## Usage

```js
// Import the motorJS object from the package
import motorJS from "motor-js";

// Optional - Import AsyncStorage if you are using the MotorJS sdk in a react native project.
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialise Auth
let auth = new motorJS.Auth({
	orgId: "your-org-id",
	region: "your-region",
	email: "some-user@org.com",
	password: "$tr0ngP@ssw0rd",
	accountType: "user/driver",
});

// Login
auth.login().then((res) => {
	console.log(res);
});

// Initialise the Motor SDK and pass the Auth object
let motor = motorJS.Motor({
	orgId: "your-org-id",
	region: "your-region",
	// Pass AsyncStorage for react-native.
	// Else for any web-based project that runs in a browser, pass window.localStorage. eg. storage: window.localStorage
	// You can keep this as null, however data such as bearerToken and refershToken will not be persisted when application is closed and re-opened.
	storage: AsyncStorage,
	// Pass the auth instance
	auth: auth,
});

motor.orgSettings().then((res) => {
	console.log(res);
});

motor
	.getDriver({
		driverId: 'driver-id',
	})
	.then((driver) => {
		console.log(driver.fullName());
	});
```

# License

Copyright (c) 2022, nSurely Limited trading as Inaza
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. All advertising materials mentioning features or use of this software
   must display the following acknowledgement:
   This product includes software developed by Inaza.
4. Neither the name of Inaza nor the
   names of its contributors may be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.