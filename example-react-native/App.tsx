import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import motorJS from '@inaza.com/motorjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Make sure env.json file is present in the example-react-native folder. If not, create one based on the env.example.json file.
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
        storage: AsyncStorage,
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
            driver: new motorJS.models.Driver({
                firstName: 'FirstName',
                lastName: 'LastName',
                email: 'someEmail@org.com',
            }),
            password: '$tr0ngP@ssw0rd',
        })
        .then(res => {
            res.fullName();
        })
        .catch(err => {
            console.log(err);
        });

    return (
        <SafeAreaView>
            <StatusBar />
            <View>
                <Text style={styles.sectionTitle}>Inaza JS SDK Demo</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 32,
    },
});

export default App;
