import { StyleSheet, Text, View, Keyboard } from 'react-native';
import Store from '../../../Utilities/Store/Store';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { Button, Icon, Input } from '@rneui/themed';
import HeaderCommon from '../../Others/HeaderCommon'
import { ScrollView } from 'react-native'
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const AddDevice = () => {

    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [bodyData, setBodyData] = useState({
        scanQR: "",
        IMEI: "",
        controllerName: "",
        masterMobileNo: "",
        ownerId: "",

    });

    useEffect(() => {
        const fetchData = async () => {
            let id = await Store.getLocalDataUserDetails("_id");
            if (id) {
                setBodyData({ ...bodyData, ownerId: id });
            }
        }
        fetchData()
    }, [])

    // on change
    const onChange = (name, value) => {
        setBodyData({ ...bodyData, [name]: value });
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const AddDeviceHandler = async () => {
        Store?.setMainLoader(true);
        await Store?.postDeviceData(bodyData);
        Store?.setMainLoader(false);
        navigation.goBack()
    }
    // Cancel Handler
    const CancelHandler = () => {
        navigation.goBack()
    }
    // Bar Code
    const BarCodeScanHandler = () => {
        Store?.setMainLoader(true);
        setTimeout(() => {
            navigation.navigate('BarCodeScan');
            Store?.setMainLoader(false);
        }, 1000);
    }

    const validate = async () => {
        Keyboard.dismiss();

        let isValid = true;

        if (!bodyData?.scanQR) {
            handleError('Enter or Scan the QR Detail', 'scanQR');
            isValid = false;
        }
        if (!bodyData?.IMEI) {
            handleError('Enter or Scan IMEI No', 'IMEI');
            isValid = false;
        }

        if (
            !bodyData?.masterMobileNo ||
            isNaN(bodyData.masterMobileNo) ||
            bodyData.masterMobileNo.toString().length !== 10 ||
            bodyData.masterMobileNo.toString().includes('.')
        ) {
            handleError('Enter correct Mobile no', 'masterMobileNo');
            isValid = false;
        }
        if (!bodyData?.controllerName || bodyData?.controllerName.length < 3) {
            handleError('Controller Name must be min 3 Characters', 'controllerName');
            isValid = false;
        }

        if (isValid) {
            AddDeviceHandler();
        }
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Add Device</Text>
                <View>
                    <Input
                        placeholder='Enter QR code or Scan *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        rightIcon={
                            <Pressable
                                style={({ pressed }) => pressed && CommonStyles.pressed}
                                onPress={() => BarCodeScanHandler()}
                            >
                                <Icon
                                    type='material'
                                    name='qr-code-scanner'
                                    size={25}
                                    style={{ marginRight: 15, borderLeftWidth: 1, paddingLeft: 15 }}
                                />
                            </Pressable>
                        }
                        value={bodyData.scanQR.toString()}
                        onChangeText={(value) => { onChange("scanQR", value) }}
                        errorStyle={errors.scanQR ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                        errorMessage={errors.scanQR}
                        onFocus={() => handleError(null, 'scanQR')}
                    />
                    <Input
                        placeholder='IMEI *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        value={bodyData.IMEI.toString()}
                        onChangeText={(value) => { onChange("IMEI", value) }}
                        errorStyle={errors.IMEI ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                        errorMessage={errors.IMEI}
                        onFocus={() => handleError(null, 'IMEI')}
                    />
                    <Input
                        placeholder='Controller Name *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        value={bodyData.controllerName.toString()}
                        onChangeText={(value) => { onChange("controllerName", value) }}
                        errorStyle={errors.controllerName ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                        errorMessage={errors.controllerName}
                        onFocus={() => handleError(null, 'controllerName')}
                    />
                    <Input
                        placeholder='Controller Mobile Number *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={10}
                        value={bodyData.masterMobileNo.toString()}
                        onChangeText={(value) => { onChange("masterMobileNo", value) }}
                        errorStyle={errors.masterMobileNo ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                        errorMessage={errors.masterMobileNo}
                        onFocus={() => handleError(null, 'masterMobileNo')}
                    />
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                        <Button
                            title="Cancel"
                            titleStyle={CommonStyles.inputTitleStyle}
                            buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.secondary }]}
                            containerStyle={styles.ContainerStyle}
                            onPress={() => CancelHandler()}
                        />
                        <Button
                            title="Save"
                            titleStyle={CommonStyles.inputTitleStyle}
                            buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.primary }]}
                            containerStyle={styles.ContainerStyle}
                            onPress={validate}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default observer(AddDevice);
const styles = StyleSheet.create({
    pageHeading: {
        fontSize: wp('6.5'),
        fontWeight: '700',
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 25
    },
    ContainerStyle: {
        alignSelf: 'center',
        marginVertical: 10,
        width: wp('40')
    },
    ButtonStyle: {
        borderRadius: 8,
        height: hp('6%'),
    },
})