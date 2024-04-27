import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, Keyboard, ScrollView, Alert, StyleSheet, BackHandler, Text, View, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../Utilities/GlobalStyles/WinDimension';
import Store from '../../../Utilities/Store/Store';
import Switch from '../../../Utilities/UI/Switch';
import { observer } from 'mobx-react';
import axios from 'axios';
import { URL } from '../../../Utilities/Constant/Environment';
import { localStorageGetSingleItem, localStorageStoreItem } from '../../../Utilities/Storage/Storage';
import { errorAlert, addAndUpdateAlert } from '../../../Utilities/Error/ErrorAlert';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {

    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [bodyData, setBodyData] = useState({
        mobileNo: "",
        registerType: Store.screen,
        otp: ""
    });
    const [otpStatus, setOtpStatus] = useState(false);

    const backAction = () => {
        if (navigation.isFocused()) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Exit App',
                textBody: 'Do you want to exit?',
                button: 'Okay',
                onPressButton: () => {
                    BackHandler.exitApp();
                    Dialog.hide();
                },
                onClose: () => Dialog.hide()
            });
            return true;
        }
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);

    const screenChangeHandler = async () => {
        const newValue = Store.screen === 'Admin' ? 'Dealer' : 'Admin';
        await setBodyData(bodyData => ({ ...bodyData, registerType: newValue }))
        await Store.setScreen(newValue);
    };

    // Send Otp
    const sendOtpHandler = async () => {
        Store?.setMainLoader(true)
        await axios.post(`${URL}otp-sent`, bodyData).then((response) => {
            //console.log(`sendOtpHandler -${JSON.stringify(response?.data)}`)
            addAndUpdateAlert(200, "OTP sent successfully")
            setOtpStatus(true);
        }).catch((error) => {
            if (error?.response?.status == 400) {
                errorAlert(error?.response?.status, "You are not a registered user. So please register yourself.")
            } else if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        });
        Store?.setMainLoader(false)
    }

    // login handler
    const LoginHandler = async () => {
        Store?.setMainLoader(true)
        await axios.post(`${URL}otp-verify`, bodyData).then(async (response) => {
            // console.log(`response -${ JSON.stringify(response?.data) }`)
            if (response?.data?.message == "Success") {
                await Store?.getDashboardMemberData(response?.data?.data?._id, Store.screen)
                await localStorageStoreItem('memberData', JSON.stringify(response?.data?.data));
                await navigation.navigate(Store.screen == 'Admin' ? 'AdminBottomBar' : 'DealerBottomBar');
                setBodyData({
                    mobileNo: "",
                    registerType: Store.screen,
                    otp: ""
                })
                setOtpStatus(false);
            } else {

            }
        }).catch((error) => {
            if (error?.response?.status == 400) {
                errorAlert(error?.response?.status, "Check your OTP.")
            } else if (error?.response?.status == 404 || error?.response?.status == 500) {
                errorAlert(error?.response?.status, "Server Error")
            } else if (error?.message == "Network Error") {
                errorAlert(error?.message, "Please check network connectivity")
            }
        })
        Store?.setMainLoader(false);
    }
    // On Change
    const onChange = (name, value) => {
        setBodyData(bodyData => ({ ...bodyData, [name]: value }))
    }

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const validateMobile = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (
            !bodyData.mobileNo ||
            isNaN(bodyData.mobileNo) ||
            (bodyData.mobileNo.toString().length !== 10 ||
                bodyData.mobileNo.toString().includes('.'))
        ) {
            handleError('Please provide a valid 10-digit number', 'mobileNo');
            isValid = false;
        }
        if (isValid) {
            sendOtpHandler();
        }
    }
    const validateOtp = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (
            !bodyData?.otp ||
            isNaN(bodyData?.otp) ||
            (bodyData?.otp.toString().length !== 6 ||
                bodyData?.otp.toString().includes('.'))
        ) {
            handleError('Please provide a valid OTP', 'otp');
            isValid = false;
        }

        if (isValid) {
            LoginHandler();
        }
    }

    return (
        <SafeAreaView style={CommonStyles.pageContainer}>
            <ScrollView>
                <Image
                    source={require('../../../Images/LoginScreen/loginHome.png')}
                    style={{
                        width: width * 0.95,
                        height: width * 0.95,
                        alignSelf: 'center',
                    }} />
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTxt} >Welcome back!</Text>
                    <Text style={styles.welcomeTxt}>Glad to see you, Again!</Text>
                </View>
                <View>
                    <Input
                        placeholder='Enter your Mobile Number *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        disabled={otpStatus}
                        maxLength={10}
                        value={bodyData?.mobileNo?.toString()}
                        onChangeText={(value) => { onChange("mobileNo", value) }}
                        errorStyle={errors.mobileNo ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                        errorMessage={errors.mobileNo}
                        onFocus={() => handleError(null, 'mobileNo')}
                    />
                    {
                        otpStatus == true &&
                        <Input
                            placeholder='Enter OTP *'
                            inputContainerStyle={CommonStyles.inputContainerStyle}
                            inputStyle={CommonStyles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            keyboardType='numeric'
                            maxLength={6}
                            value={bodyData?.otp?.toString()}
                            onChangeText={(value) => { onChange("otp", value) }}
                            errorStyle={errors.otp ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                            errorMessage={errors.otp}
                            onFocus={() => handleError(null, 'otp')}
                        />
                    }
                    <View style={[styles.headingContainer, { backgroundColor: Store.screen === 'Admin' ? '#EBF3FF' : '#ffe6df' }]}>
                        <Text style={styles.iotText}>Admin</Text>
                        <Switch value={Store.screen == 'Dealer'} dualType={true} onToggle={screenChangeHandler} disabled={true} />
                        <Text style={styles.iotText}>Dealer</Text>
                    </View>
                    <Button
                        title={otpStatus == false ? "Get OTP" : "Login"}
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={CommonStyles.loginButtonStyle}
                        containerStyle={CommonStyles.loginContainerStyle}
                        onPress={otpStatus == false ? validateMobile : validateOtp}
                    />

                    {/* <Input
                        placeholder='Enter your Password *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        rightIcon={
                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                <Icon
                                    type='material-community'
                                    name='eye'
                                    size={24}
                                    color={Colors.primary200}
                                    style={{ marginRight: 15 }}
                                />
                            </Pressable>
                        }
                    /> */}
                    {/* <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.forgetContainer]}
                        onPress={() => navigation.navigate("ForgotPass")}
                    >
                        <Text style={{ color: Colors.primary, fontWeight: '600' }}>Forgot Password?</Text>
                    </Pressable> */}


                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                        <Text>Don’t have an account?</Text>
                        <Pressable
                            style={({ pressed }) => pressed && CommonStyles.pressed}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={{ color: Colors.secondary, fontWeight: '600' }}>   Register Now</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default observer(LoginScreen);

const styles = StyleSheet.create({

    welcomeContainer: {
        margin: 20,
        alignItems: 'center'
    },
    welcomeTxt: {
        fontSize: wp('6.5%'),
        fontWeight: '600',
    },
    forgetContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginTop: -15
    },
    headingContainer: {
        marginHorizontal: 15,
        borderRadius: 15,
        paddingHorizontal: 25,
        paddingVertical: 25,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iotText: {
        fontSize: wp('5'),
        fontWeight: '500',
    },


})