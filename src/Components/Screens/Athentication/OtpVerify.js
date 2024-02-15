import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';

export default function OtpVerify({ route }) {

    const { pageMove } = route.params;

    const navigation = useNavigation();
    const OTP_COUNT = 4;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: OTP_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const VerifyHandler = () => {
        pageMove === 'VerifyRegister' ?
            navigation.navigate('PassSuccess', { pageContent: 'RegisterSuccess' }) : navigation.navigate('NewPassword')
    }

    return (

        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 70 }}>
                    <Text style={styles.ForgotTxt}>OTP Verification</Text>
                    <Text style={styles.dummyTxt}>Enter the verification code we just sent on your mobile number.</Text>
                </View>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={OTP_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <Button
                    title={pageMove === 'VerifyRegister' ? 'Verify & Register' : 'Verify & Reset'}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.loginButtonStyle}
                    containerStyle={CommonStyles.loginContainerStyle}
                    onPress={VerifyHandler}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', marginTop: 5 }}>
                    <Text>Didn’t received code?</Text>
                    <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}
                    >
                        <Text style={{ color: Colors.secondary, fontWeight: '600' }}>   Resend</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal: 50
    },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 50,
        fontSize: 25,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary75,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: Colors.secondary,
    },
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
});
