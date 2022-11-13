import React from 'react';
import logo from './logo.svg';
import './App.css';
import motorJS from 'motorJS';

// Make sure env.json file is present in the example-react/src folder. If not, create one based on the env.example.json file.
import env from './env.json';

const App = () => {
    let auth = new motorJS.Auth({
        orgId: env.init.orgId, // <-- Replace with your organisation ID
        region: env.init.region, // <-- Replace with your region
        email: env.auth.email, // <-- Replace with users/drivers email
        password: env.auth.password, // <-- Replace with users/drivers password
        accountType: env.auth.accountType, // <-- Can be either "user" or "driver"
    });

    auth.login()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

    let motor = new motorJS.Motor({
        orgId: env.init.orgId,
        region: env.init.region,
        storage: window.localStorage,
        auth: auth,
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

    motor
        .createDriver({
            driver: {
                firstName: 'FirstName',
                lastName: 'LastName',
                email: 'someEmail@org.com',
            },
            password: '$tr0ngP@ssw0rd',
        })
        .then(res => {
            res.fullName();
        })
        .catch(err => {
            console.log(err);
        });

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
