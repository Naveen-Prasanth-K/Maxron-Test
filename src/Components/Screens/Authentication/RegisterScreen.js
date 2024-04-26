import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import Store from '../../../Utilities/Store/Store';
import { observer } from 'mobx-react';
import { Dropdown } from 'react-native-element-dropdown';
import { errorAlert, addAndUpdateAlert } from '../../../Utilities/Error/ErrorAlert';
import axios from 'axios';
import { URL } from '../../../Utilities/Constant/Environment';

const RegisterScreen = () => {

    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [bodyData, setBodyData] = useState({
        customerName: "",
        mobileNo: "",
        location: "",
        bussinessName: "",
        alternateMobile: "",
        address: "",
        district: "",
        Pincode: "",
        GSTNo: "",
        mailId: "",
        registerType: "Dealer",
    });

    useEffect(() => {
        Store?.bindDistrict?.length == 0 && Store?.getDistrictData();
    }, [])

    // on change
    const onChange = (name, value) => {
        setBodyData({ ...bodyData, [name]: value });
    }
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const sendHandler = async () => {
        Store?.setMainLoader(true)
        await Store?.postMemberData(bodyData?.registerType, bodyData)
        navigation.goBack();
        Store?.setMainLoader(false)
    }

    const validate = async () => {
        Keyboard.dismiss();

        let isValid = true;

        if (!bodyData?.customerName || bodyData?.customerName.length < 3) {
            handleError('Name must be min 3 Characters', 'customerName');
            isValid = false;
        }

        if (
            !bodyData?.mobileNo ||
            isNaN(bodyData.mobileNo) ||
            bodyData.mobileNo.toString().length !== 10 ||
            bodyData.mobileNo.toString().includes('.')
        ) {
            handleError('Enter correct Mobile no', 'mobileNo');
            isValid = false;
        }
        if (!bodyData?.address || bodyData?.address.length < 3) {
            handleError('Address must be min 3 Characters', 'address');
            isValid = false;
        }
        if (!bodyData?.district) {
            handleError('Pick District', 'district');
            isValid = false;
        }
        if (
            !bodyData?.Pincode ||
            isNaN(bodyData.Pincode) ||
            bodyData.Pincode.toString().length !== 6 ||
            bodyData.Pincode.toString().includes('.')
        ) {
            handleError('Enter valid Pincode', 'Pincode');
            isValid = false;
        }

        if (isValid) {
            sendHandler();
        }
    }

    // const VerifyOtpHandler = () => {
    //     navigation.navigate('OtpVerify', { pageMove: 'VerifyRegister' })
    // }



    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <Text style={styles.ForgotTxt}>Hello! Register to get started..</Text>
                </View>
                <Input
                    placeholder='Name *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={15}
                    value={bodyData.customerName.toString()}
                    onChangeText={(value) => { onChange("customerName", value) }}
                    errorStyle={errors.customerName ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.customerName}
                    onFocus={() => handleError(null, 'customerName')}
                />
                <Input
                    placeholder='Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType="numeric"
                    maxLength={10}
                    value={bodyData.mobileNo.toString()}
                    onChangeText={(value) => { onChange("mobileNo", value) }}
                    errorStyle={errors.mobileNo ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.mobileNo}
                    onFocus={() => handleError(null, 'mobileNo')}
                />
                <Input
                    placeholder='Alternative Mobile Number'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType="numeric"
                    maxLength={10}
                    value={bodyData.alternateMobile.toString()}
                    onChangeText={(value) => { onChange("alternateMobile", value) }}
                />
                <Input
                    placeholder='Address *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.address.toString()}
                    onChangeText={(value) => { onChange("address", value) }}
                    errorStyle={errors.address ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.address}
                    onFocus={() => handleError(null, 'address')}
                />
                <Dropdown
                    style={CommonStyles.dropdown}
                    placeholderStyle={CommonStyles.placeholderStyle}
                    selectedTextStyle={CommonStyles.selectedTextStyle}
                    inputSearchStyle={CommonStyles.inputSearchStyle}
                    activeColor={Colors.secondary}
                    itemContainerStyle={CommonStyles.itemContainerStyle}
                    placeholder='District *'
                    search
                    searchPlaceholder="Search..."
                    data={Store?.bindDistrict}
                    labelField="cityName"
                    valueField="_id"
                    value={bodyData?.district}
                    onChange={item => {
                        onChange("district", item?._id);
                        setErrors(prevState => ({ ...prevState, district: '' }));
                    }}
                />
                {errors.district &&
                    <Text style={CommonStyles.errorDistrict}>{errors.district}</Text>}
                <Input
                    placeholder='Pincode *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={6}
                    value={bodyData.Pincode.toString()}
                    onChangeText={(value) => { onChange("Pincode", value) }}
                    errorStyle={errors.Pincode ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.Pincode}
                    onFocus={() => handleError(null, 'Pincode')}
                />
                <Input
                    placeholder='Mail Id'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.mailId.toString()}
                    onChangeText={(value) => { onChange("mailId", value) }}
                />
                <Button
                    title="Register"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.loginButtonStyle}
                    containerStyle={CommonStyles.loginContainerStyle}
                    onPress={validate}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5, marginBottom: 50 }}>
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

export default observer(RegisterScreen);

const styles = StyleSheet.create({
    ForgotTxt: {
        fontSize: wp('7'),
        fontWeight: '700',
        marginBottom: 10
    },
})