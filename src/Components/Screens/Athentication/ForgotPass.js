import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';

export default function ForgotPass() {

    const navigation = useNavigation();

    const VerifyOtpHandler = () => {
        navigation.navigate('OtpVerify', { pageMove: 'VerifyReset' })
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 70 }}>
                    <Text style={styles.ForgotTxt}>Forgot Password?</Text>
                    <Text style={styles.dummyTxt}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
                </View>
                <Input
                    placeholder='Enter your Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType='numeric'
                />
                <Button
                    title="Send Code"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.loginButtonStyle}
                    containerStyle={CommonStyles.loginContainerStyle}
                    onPress={VerifyOtpHandler}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', marginTop: 5 }}>
                    <Text>Remember Password?</Text>
                    <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={{ color: Colors.secondary, fontWeight: '600' }}>   Login</Text>
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
    dummyTxt: {
        fontSize: wp('4'),
        fontWeight: '300',
        marginBottom: 30,
        color: Colors.primary100,
    }
})