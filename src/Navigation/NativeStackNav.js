import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getOnboarding } from '../Utilities/Storage/Storage';

//Screens
import DevicePage from '../Components/Screens/DeviceScreen/DevicePage';
import ForgotPass from '../Components/Screens/Athentication/ForgotPass';
import LoginScreen from '../Components/Screens/Athentication/LoginScreen';
import NewPassword from '../Components/Screens/Athentication/NewPassword';
import OtpVerify from '../Components/Screens/Athentication/OtpVerify';
import PassSuccess from '../Components/Screens/Athentication/PassSuccess';
import RegisterScreen from '../Components/Screens/Athentication/RegisterScreen';
import HomeScreen from '../Components/Screens/DeviceScreen/DeviceHome';
import SplashScreen from '../Components/Screens/EntryScreen/SplashScreen';
import ProfileScreen from '../Components/Screens/ProfileScreen/ProfileScreen';
import AddDevice from '../Components/Screens/DeviceScreen/AddDevice';
import DeviceReport from '../Components/Screens/Reports/DeviceReport';
import PumpSettingHome from '../Components/Screens/PumpSettings/PumpSettingHome';
import CalibrationSettings from '../Components/Screens/PumpSettings/CalibrationSettings';
import CurrentSettings from '../Components/Screens/PumpSettings/CurrentSettings';
import DelaySettings from '../Components/Screens/PumpSettings/DelaySettings';
import ModeSettings from '../Components/Screens/PumpSettings/ModeSettings';
import NumberSettings from '../Components/Screens/PumpSettings/NumberSettings';
import TimerSettings from '../Components/Screens/PumpSettings/TimerSettings';
import VoltageSettings from '../Components/Screens/PumpSettings/VoltageSettings'
import BarCodeScan from '../Components/Screens/DeviceScreen/BarCodeScan';
import MotorRunHistory from '../Components/Screens/Reports/MotorRunHistory';
import NotificationScreen from '../Components/Screens/Notification/NotificationScreen';
import RechargeSettings from '../Components/Screens/PumpSettings/RechargeSettings';
import AccountManage from '../Components/Screens//Admin/AdminSetting/AccountManage';
import AdminBottomBar from './AdminBottomBar';
import AdminHome from '../Components/Screens/Admin/AdminHome';
import SoldDevices from '../Components/Screens/Admin/SoldDevices';
import DeviceDetails from '../Components/Screens/DeviceScreen/DeviceDetails';
import CustomerList from '../Components/Screens/Admin/Customer/CustomerList';
import CustomerDetail from '../Components/Screens/Admin/Customer/CustomerDetail';
import UnSoldDevices from '../Components/Screens/Admin/UnSoldDevices';
import ActivateDevice from '../Components/Screens/DeviceScreen/ActivateDevice';
import DealerInfo from '../Components/Screens/Admin/Dealer/DealerInfo';
import CreateDealer from '../Components/Screens/Admin/Dealer/CreateDealer';
import AdminUser from '../Components/Screens/Admin/AdminSetting/AdminUser';
import AddAdminUser from '../Components/Screens//Admin/AdminSetting/AddAdminUser';
import DeviceOrder from '../Components/Screens/Admin/DeviceOrder/DeviceOrder';
import StockHome from '../Components/Screens/Admin/Stock/StockHome';
import AddStock from '../Components/Screens/Admin/Stock/AddStock';
import PinReset from '../Components/Screens/Athentication/PinReset';
import CreateCustomer from '../Components/Screens/Admin/Customer/CreateCustomer';

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
                <Stack.Screen
                    name="AdminBottomBar"
                    options={{ headerShown: false }}
                    component={AdminBottomBar} />
                <Stack.Screen
                    name="AdminHome"
                    options={{ headerShown: false }}
                    component={AdminHome} />
                <Stack.Screen
                    name="SoldDevices"
                    options={{ headerShown: false }}
                    component={SoldDevices} />
                <Stack.Screen
                    name="DeviceDetails"
                    options={{ headerShown: false }}
                    component={DeviceDetails} />
                <Stack.Screen
                    name="CustomerList"
                    options={{ headerShown: false }}
                    component={CustomerList} />
                <Stack.Screen
                    name="CustomerDetail"
                    options={{ headerShown: false }}
                    component={CustomerDetail} />
                <Stack.Screen
                    name="UnSoldDevices"
                    options={{ headerShown: false }}
                    component={UnSoldDevices} />
                <Stack.Screen
                    name="ActivateDevice"
                    options={{ headerShown: false }}
                    component={ActivateDevice} />
                <Stack.Screen
                    name="DealerInfo"
                    options={{ headerShown: false }}
                    component={DealerInfo} />
                <Stack.Screen
                    name="CreateDealer"
                    options={{ headerShown: false }}
                    component={CreateDealer} />
                <Stack.Screen
                    name="AddAdminUser"
                    options={{ headerShown: false }}
                    component={AddAdminUser} />
                <Stack.Screen
                    name="AdminUser"
                    options={{ headerShown: false }}
                    component={AdminUser} />
                <Stack.Screen
                    name="DeviceOrder"
                    options={{ headerShown: false }}
                    component={DeviceOrder} />
                <Stack.Screen
                    name="StockHome"
                    options={{ headerShown: false }}
                    component={StockHome} />
                <Stack.Screen
                    name="AddStock"
                    options={{ headerShown: false }}
                    component={AddStock} />
                <Stack.Screen
                    name="PinReset"
                    options={{ headerShown: false }}
                    component={PinReset} />
                <Stack.Screen
                    name="CreateCustomer"
                    options={{ headerShown: false }}
                    component={CreateCustomer} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

const styles = StyleSheet.create({})