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
import HeaderCommon from '../../Others/HeaderCommon';

const PinReset = () => {

    const navigation = useNavigation();
    const OTP_COUNT = 4;
    const [newValue, setNewValue] = useState('');
    const [reEnterValue, setReEnterValue] = useState('');

    const refNew = useBlurOnFulfill({ value: newValue, cellCount: OTP_COUNT });
    const [propsNew, getCellOnLayoutHandlerNew] = useClearByFocusCell({
        value: newValue,
        setValue: setNewValue,
    });

    const refReEnter = useBlurOnFulfill({ value: reEnterValue, cellCount: OTP_COUNT });
    const [propsReEnter, getCellOnLayoutHandlerReEnter] = useClearByFocusCell({
        value: reEnterValue,
        setValue: setReEnterValue,
    });
    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.ForgotTxt}>Reset Security PIN</Text>
                    <Text style={[styles.dummyTxt, { marginTop: 25 }]}>Enter your New Security PIN</Text>
                </View>
                <CodeField
                    ref={refNew}
                    {...propsNew}
                    value={newValue}
                    onChangeText={setNewValue}
                    cellCount={OTP_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandlerNew(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.dummyTxt}>Re-enter your Security PIN</Text>
                </View>
                <CodeField
                    ref={refReEnter}
                    {...propsReEnter}
                    value={reEnterValue}
                    onChangeText={setReEnterValue}
                    cellCount={OTP_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandlerReEnter(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <Button
                    title={'Reset PIN'}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    )
}

export default PinReset

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: -20,
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
})
