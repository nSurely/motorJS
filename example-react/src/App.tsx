import React from 'react';
import logo from './logo.svg';
import './App.css';
import motorJS from '@inaza/motorjs';

// Make sure env.json file is present in the example-react/src folder. If not, create one based on the env.example.json file.
import env from './env.json';

const App = () => {
    // Initialise Auth
    // Option 1 - User user / driver credentials
    let authJWT = new motorJS.Auth({
        orgId: env.init.orgId, // <-- Replace with your organisation ID
        region: env.init.region, // <-- Replace with your region
        email: env.auth.email, // <-- Replace with users/drivers email
        password: env.auth.password, // <-- Replace with users/drivers password
        accountType: env.auth.accountType, // <-- Can be either "user" or "driver"
    });

    // Optional: Try logging in beforehand to see if the credentials are correct. If not, Motor SDK will try to login automatically when you use it.
    authJWT
        .login()
        .then(res => {
            console.log('Logged in successfully. Token:', res);
        })
        .catch(err => {
            console.error('Failed to login:', err);
        });

    // Option 2 - Use API key
    let authApikey = new motorJS.Auth({
        orgId: env.init.orgId, // <-- Replace with your organisation ID
        region: env.init.region, // <-- Replace with your region
        apiKey: env.auth.apiKey,
    });

    let motor = new motorJS.Motor({
        orgId: env.init.orgId,
        region: env.init.region,
        storage: window.localStorage,
        auth: authApikey,
    });

    motor
        .orgSettings()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

    motor
        .getDriver({
            driverId: env.testing.driverId1,
        })
        .then(res => {
            console.log(res.fullName());
            console.log(res.firstName);
        })
        .catch(err => {
            console.log(err);
        });

    let driver = new motorJS.models.Driver({
        firstName: 'FirstName',
        lastName: 'LastName',
        email: 'someEmail@org.com',
    });

    motor
        .createDriver({
            driver: driver,
            password: '$tr0ngP@ssw0rd',
        })
        .then(res => {
            res.fullName();
        })
        .catch(err => {
            console.log(err);
        });

    (async () => {
        let response = await motor.request({
            method: 'GET',
            path: `/registered-vehicles/${env.testing.rvId1}/utilization`,
            params: {
                start: '2022-01-01',
                end: '2022-01-31',
            },
        });

        // loop through each object in the response
        for (let week of response) {
            console.log(`${week.utilisation * 100}%`); // 43%
            console.log(`${week.distance.total}km`); // 123km
        }
    })();

    (async () => {
        // List multiple drivers. Uses asyncGenerator for multiple async calls.
        // Below example shows how to loop throght the listDrives response.
        try {
            for await (let driver of motor.listDrivers({
                maxRecords: 5,
                dob: new motorJS.Search({
                    operator: 'eq',
                    value: '2022-08-02',
                }),
            })) {
                // Each driver is a driver object. You can use the driver object to call other methods.
                console.log(driver.fullName());

                // Example: Get the drivers regstered vehicles
                driver.listVehicles().then(vehicles => {
                    vehicles.forEach(vehicle => {
                        // You can also use the vehicle object to call other methods.
                        console.log(vehicle.getDisplay());
                    });
                });
            }
        } catch (err) {
            console.log(err);
        }

        try {
            // Search for the vehicle type
            for await (let vehicleType of motor.listVehicleTypes({
                brand: new motorJS.Search({
                    operator: 'ilike',
                    value: 'toyota',
                }),
                model: new motorJS.Search({
                    operator: 'ilike',
                    value: 'camry',
                }),
                internalFields: true,
                maxRecords: 1,
            })) {
                // Initialise a new vehicle object
                let vehicle = new motorJS.models.Vehicle({
                    regPlate: 'ABC123',
                    vin: '12345678901234567',
                    vehicle: vehicleType,
                });

                // To create a new vehicle, you need to pass the vehicle object
                await motor
                    .createVehicle({
                        vehicle: vehicle, // <-- Vehicle object
                        driverId: env.testing.driverId1,
                    })
                    .then(v => {
                        // New vehicle created
                        console.log(v.getDisplay());
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } catch (err) {
            console.log(err);
        }

        // Create vehicle type
        try {
            let vehicleType = await motor.createVehicleType({
                vehicleType: new motorJS.models.VehicleType({
                    brand: 'Toyota',
                    model: 'Camry',
                    yearFloor: 2020,
                    yearTop: 2022,
                    fuelType: 'petrol',
                    transmission: 'auto',
                    risk: {
                        ihr: {
                            value: 1.2,
                            weighting: 1.0,
                            premium: {
                                apply: true,
                                inheritance: true,
                            },
                        },
                    },
                }),
            });

            console.log(vehicleType.getDisplay());
        } catch (err) {
            console.log(err);
        }
    })();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default App;
