import React from 'react';
import logo from './logo.svg';
import './App.css';
import motorJS from 'motor-js';

// Make sure env.json file is present in the example-react/src folder. If not, create one based on the env.example.json file.
import env from './env.json';

const App = () => {
    let auth = new motorJS.Auth({
        orgId: env.init.orgId,
        region: env.init.region,
        email: env.auth.email,
        password: env.auth.password,
        accountType: env.auth.accountType,
    });

    auth.login().then(res => {
        console.log(res);
    });

    let motor = new motorJS.Motor({
        orgId: env.init.orgId,
        region: env.init.region,
        storage: window.localStorage,
        auth: auth,
    });

    motor.orgSettings().then(res => {
        console.log(res);
    });

    motor
        .getDriver({
            driverId: env.testing.driverId1,
        })
        .then(res => {
            console.log(res.fullName());
            console.log(res.firstName);
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
