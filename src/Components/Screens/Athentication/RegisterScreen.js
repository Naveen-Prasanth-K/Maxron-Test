import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/themed';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';

const { width, height } = Dimensions.get('window');


export default function RegisterScreen() {
    const navigation = useNavigation();

    const VerifyOtpHandler = () => {
        navigation.navigate('OtpVerify', { pageMove: 'VerifyRegister' })
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <Text style={styles.ForgotTxt}>Hello! Register to get started..</Text>
                </View>
                <Input
                    placeholder='Username *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                />
                <Input
                    placeholder='Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType='numeric'
                />
                <Input
                    placeholder='Address Line 1 *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                />
                <Input
                    placeholder='Address Line 2 *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                />
                <Input
                    placeholder='New Password *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}

                />
                <Input
                    placeholder='Confirm Password *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}

                />
                <Button
                    title="Verify OTP"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.loginButtonStyle}
                    containerStyle={CommonStyles.loginContainerStyle}
                    onPress={VerifyOtpHandler}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                    <Text>Already have an account?</Text>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={{ color: Colors.secondary, fontWeight: '600' }}>   Login Now</Text>
                    </Pressable>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    ForgotTxt: {
        fontSize: wp('7'),
        fontWeight: '700',
        marginBottom: 10
    },
})