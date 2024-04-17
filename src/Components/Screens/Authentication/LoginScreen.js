import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
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
const { width, height } = Dimensions.get('window');

const LoginScreen = () => {

    const navigation = useNavigation();
    const [bodyData, setBodyData] = useState({
        mobileNo: "",
        registerType: Store.screen,
        otp: ""
    });
    const [otpStatus, setOtpStatus] = useState(false)
    const { screenWidth, screenHeight } = WinDimensions();
    const isLandscape = screenWidth > screenHeight;
    const isTablet = Dimensions.get('window').width >= 600;

    const screenChangeHandler = async () => {
        const newValue = Store.screen === 'Admin' ? 'Dealer' : 'Admin';
        await setBodyData(bodyData => ({ ...bodyData, registerType: newValue }))
        await Store.setScreen(newValue);
    };

    // Send Otp
    const sendOtpHandler = async () => {
        console.log(`bodyData -${JSON.stringify(bodyData)}`)
        await axios.post(`${URL}otp-sent`, bodyData).then((response) => {
            console.log(`response -${JSON.stringify(response?.data)}`)
            setOtpStatus(true);
        }).catch((error) => {
            console.log(error)
        });
    }
    // login handler
    const LoginHandler = async () => {
        await axios.post(`${URL}otp-verify`, bodyData).then(async (response) => {
            // console.log(`response -${ JSON.stringify(response?.data) }`)
            if (response?.data?.message == "Success") {
                await Store?.getDashboardMemberData(response?.data?.data?._id, Store.screen)
                await localStorageStoreItem('memberData', JSON.stringify(response?.data?.data));
                navigation.navigate(Store.screen == 'Admin' ? 'AdminBottomBar' : 'DealerBottomBar');
            } else {

            }
        }).catch((error) => {
            console.log(error)
        })
        // setOtpStatus(true)
        // navigation.navigate(Store.screen == 'Admin' ? 'AdminBottomBar' : 'DealerBottomBar')
    }
    // On Change
    const onChange = (name, value) => {
        setBodyData(bodyData => ({ ...bodyData, [name]: value }))
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
                        value={bodyData?.mobileNo?.toString()}
                        onChangeText={(value) => { onChange("mobileNo", value) }}
                    />
                    {otpStatus == true && <Input
                        placeholder='Enter your Otp Number *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        value={bodyData?.otp?.toString()}
                        onChangeText={(value) => { onChange("otp", value) }}
                    />}
                    <View style={[styles.headingContainer, { backgroundColor: Store.screen === 'Admin' ? '#EBF3FF' : '#ffe6df' }]}>
                        <Text style={styles.iotText}>Admin</Text>
                        <Switch value={Store.screen == 'Dealer'} dualType={true} onToggle={screenChangeHandler} disabled={true} />
                        <Text style={styles.iotText}>Dealer</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        {otpStatus == false ? <Button
                            title="Send OTP"
                            titleStyle={CommonStyles.inputTitleStyle}
                            buttonStyle={CommonStyles.loginButtonStyle}
                            containerStyle={CommonStyles.loginContainerStyle}
                            onPress={sendOtpHandler}
                        /> :
                            <Button
                                title="Login"
                                titleStyle={CommonStyles.inputTitleStyle}
                                buttonStyle={CommonStyles.loginButtonStyle}
                                containerStyle={CommonStyles.loginContainerStyle}
                                onPress={LoginHandler}
                            />
                        }
                    </View>

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