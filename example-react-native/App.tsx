import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import motorJS from 'motorJS';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Make sure env.json file is present in the example-react-native folder. If not, create one based on the env.example.json file.
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
        storage: AsyncStorage,
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

    motor
        .createDriver({
            driver: {
                firstName: 'Test',
                lastName: 'User',
                email: 'testuser@gmail.com',
            },
            password: 'Qwerty@123',
        })
        .then(res => {
            res.fullName();
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
