import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getOnboarding } from '../../../Utilities/Storage/Storage';
import Store from '../../../Utilities/Store/Store';

export default function SplashScreen({ navigation }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [memberType, setMemberType] = useState("");

    const fetchData = async () => {
        let id = await Store.getLocalDataUserDetails("_id");
        let memberType = await Store.getLocalDataUserDetails("memberType");
        setMemberType(memberType?.dataName)
        if (id && memberType?.dataName) {
            setLoggedIn(true)
            await Store?.getDashboardMemberData(id, memberType?.dataName)
        }
    }

    useEffect(() => {
        fetchData();
        const timer = setTimeout(() => {
            navigation.replace(loggedIn != true ? 'LoginScreen' : memberType == 'Admin' ? 'AdminBottomBar' : 'DealerBottomBar');
        }, 5000);

        return () => clearTimeout(timer);
    }, [loggedIn]);

    return (
        <View>
            <Image source={require('../../../../assets/splash1.png')} style={{ width: '100%', height: '100%' }} />
        </View>
    )
}
