import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getOnboarding } from '../Utilities/Storage/Storage';

//Screens
import DevicePage from '../Components/Screens/HomeScreen/DevicePage';
import ForgotPass from '../Components/Screens/Athentication/ForgotPass';
import LoginScreen from '../Components/Screens/Athentication/LoginScreen';
import NewPassword from '../Components/Screens/Athentication/NewPassword';
import OtpVerify from '../Components/Screens/Athentication/OtpVerify';
import PassSuccess from '../Components/Screens/Athentication/PassSuccess';
import RegisterScreen from '../Components/Screens/Athentication/RegisterScreen';
import HomeScreen from '../Components/Screens/HomeScreen/HomeScreen';
import OnboardingScreen from '../Components/Screens/EntryScreen/OnboardingScreen';
import SplashScreen from '../Components/Screens/EntryScreen/SplashScreen';
import ProfileScreen from '../Components/Screens/ProfileScreen/ProfileScreen';
import AddDevice from '../Components/Screens/HomeScreen/AddDevice';
import BottomTabBar from './BottomTabBar';
import DeviceReport from '../Components/Screens/Reports/DeviceReport';
import PumpSettingHome from '../Components/Screens/PumpSettings/PumpSettingHome';
import CalibrationSettings from '../Components/Screens/PumpSettings/CalibrationSettings';
import CurrentSettings from '../Components/Screens/PumpSettings/CurrentSettings';
import DelaySettings from '../Components/Screens/PumpSettings/DelaySettings';
import ModeSettings from '../Components/Screens/PumpSettings/ModeSettings';
import NumberSettings from '../Components/Screens/PumpSettings/NumberSettings';
import TimerSettings from '../Components/Screens/PumpSettings/TimerSettings';
import VoltageSettings from '../Components/Screens/PumpSettings/VoltageSettings'
import BarCodeScan from '../Components/Screens/HomeScreen/BarCodeScan';
import MotorRunHistory from '../Components/Screens/Reports/MotorRunHistory';
import NotificationScreen from '../Components/Screens/Notification/NotificationScreen';
import RechargeSettings from '../Components/Screens/PumpSettings/RechargeSettings';
import AccountManage from '../Components/Screens/SettingScreen/AccountManage';

const Stack = createNativeStackNavigator();

export default function NativeStackNav() {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="SplashScreen"
                    options={{ headerShown: false }}
                    component={SplashScreen} />
                <Stack.Screen
                    name="OnboardingScreen"
                    options={{ headerShown: false }}
                    component={OnboardingScreen} />
                <Stack.Screen
                    name="LoginScreen"
                    options={{ headerShown: false }}
                    component={LoginScreen} />
                <Stack.Screen
                    name="ForgotPass"
                    options={{ headerShown: false }}
                    component={ForgotPass} />
                <Stack.Screen
                    name="OtpVerify"
                    options={{ headerShown: false }}
                    component={OtpVerify} />
                <Stack.Screen
                    name="NewPassword"
                    options={{ headerShown: false }}
                    component={NewPassword} />
                <Stack.Screen
                    name="PassSuccess"
                    options={{ headerShown: false }}
                    component={PassSuccess} />
                <Stack.Screen
                    name="RegisterScreen"
                    options={{ headerShown: false }}
                    component={RegisterScreen} />
                <Stack.Screen
                    name="BottomTabBar"
                    options={{ headerShown: false }}
                    component={BottomTabBar} />
                <Stack.Screen
                    name="HomeScreen"
                    options={{ headerShown: false }}
                    component={HomeScreen} />
                <Stack.Screen
                    name="ProfileScreen"
                    options={{ headerShown: false }}
                    component={ProfileScreen} />
                <Stack.Screen
                    name="DevicePage"
                    options={{ headerShown: false }}
                    component={DevicePage} />
                <Stack.Screen
                    name="AddDevice"
                    options={{ headerShown: false }}
                    component={AddDevice} />
                <Stack.Screen
                    name="PumpSettingHome"
                    options={{ headerShown: false }}
                    component={PumpSettingHome} />
                <Stack.Screen
                    name="DeviceReport"
                    options={{ headerShown: false }}
                    component={DeviceReport} />
                <Stack.Screen
                    name="BarCodeScan"
                    options={{ headerShown: false }}
                    component={BarCodeScan} />
                <Stack.Screen
                    name="VoltageSettings"
                    options={{ headerShown: false }}
                    component={VoltageSettings} />
                <Stack.Screen
                    name="CurrentSettings"
                    options={{ headerShown: false }}
                    component={CurrentSettings} />
                <Stack.Screen
                    name="TimerSettings"
                    options={{ headerShown: false }}
                    component={TimerSettings} />
                <Stack.Screen
                    name="DelaySettings"
                    options={{ headerShown: false }}
                    component={DelaySettings} />
                <Stack.Screen
                    name="ModeSettings"
                    options={{ headerShown: false }}
                    component={ModeSettings} />
                <Stack.Screen
                    name="NumberSettings"
                    options={{ headerShown: false }}
                    component={NumberSettings} />
                <Stack.Screen
                    name="CalibrationSettings"
                    options={{ headerShown: false }}
                    component={CalibrationSettings} />
                <Stack.Screen
                    name="MotorRunHistory"
                    options={{ headerShown: false }}
                    component={MotorRunHistory} />
                <Stack.Screen
                    name="NotificationScreen"
                    options={{ headerShown: false }}
                    component={NotificationScreen} />
                <Stack.Screen
                    name="RechargeSettings"
                    options={{ headerShown: false }}
                    component={RechargeSettings} />
                <Stack.Screen
                    name="AccountManage"
                    options={{ headerShown: false }}
                    component={AccountManage} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({})