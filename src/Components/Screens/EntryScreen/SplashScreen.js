import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { getOnboarding } from '../../../Utilities/Storage/Storage';


export default function SplashScreen({ navigation }) {

    const [showOnboarding, setShowOnboarding] = useState(null);

    useEffect(() => {
        checkIfAlreadyOnBoarded();
    }, [])

    const checkIfAlreadyOnBoarded = async () => {
        let OnBoarded = await getOnboarding('OnBoarded');
        if (OnBoarded == 1) {
            // hide onboarding
            setShowOnboarding(false);
        } else {
            // show onboarding
            setShowOnboarding(true);
        }
    }

    if (showOnboarding == null) {
        return null;
    }


    setTimeout(() => {
        navigation.replace(showOnboarding ? 'OnboardingScreen' : 'LoginScreen');
    }, 5000)

    return (
        <View>
            <Image source={require('../../../../assets/splash1.png')} style={{ width: '100%', height: '100%' }} />
        </View>
    )
}
