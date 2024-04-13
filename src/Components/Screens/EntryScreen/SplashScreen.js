import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { getOnboarding } from '../../../Utilities/Storage/Storage';


export default function SplashScreen({ navigation }) {

    setTimeout(() => {
        navigation.replace('LoginScreen');
    }, 5000)

    return (
        <View>
            <Image source={require('../../../../assets/splash1.png')} style={{ width: '100%', height: '100%' }} />
        </View>
    )
}
