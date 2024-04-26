import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Store from '../../../Utilities/Store/Store';
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
    const [formData, setFormData] = useState({
        "_id" : "",
        "pin" : "", // ReEnter Pin
        "newPin": "" // New Pin
    });

    const refReEnter = useBlurOnFulfill({ value: reEnterValue, cellCount: OTP_COUNT });
    const [propsReEnter, getCellOnLayoutHandlerReEnter] = useClearByFocusCell({
        value: reEnterValue,
        setValue: setReEnterValue,
    });
    
    useEffect(() => {
        const fetchData = async () => {
        
           
            let dealerData = await Store.getLocalDataUserFullDetails();
            if(dealerData._id != null){
                setFormData(formData => ({ ...formData ,_id :  dealerData._id  }))
            }   
        }
        fetchData()
    }, [])

    const onChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }
    const sendHandler =async () => {
        if(formData?.pin == formData?.newPin){
            console.log(`refNew -${ JSON.stringify(formData) }`);
            await  Store?.updateResetPinData(formData)
        }
       
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
                    value={formData?.newPin?.toString()}
                    onChangeText={(value) => { onChange("newPin", value) }}
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
                    value={formData?.pin?.toString()}
                    onChangeText={(value) => { onChange("pin", value) }}
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

export default observer(PinReset);

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
