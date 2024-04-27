import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, StyleSheet, Text, View, Pressable, Keyboard } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../../Others/HeaderCommon';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';

import Store from '../../../../Utilities/Store/Store';

const CreateDealer = ({ route }) => {

    const { item } = route.params
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [bodyData, setBodyData] = useState({
        _id: item?._id != "" ? item?._id : "",
        customerName: item?.customerName != "" ? item?.customerName : "",
        mobileNo: item?.mobileNo != "" ? item?.mobileNo : "",
        location: item?.location != "" ? item?.location : "",
        bussinessName: item?.bussinessName != "" ? item?.bussinessName : "",
        alternateMobile: item?.alternateMobile != "" ? item?.alternateMobile : "",
        address: item?.address != "" ? item?.address : "",
        district: item?.district?._id != "" ? item?.district?._id : "",
        Pincode: item?.Pincode != "" ? item?.Pincode : "",
        GSTNo: item?.GSTNo != "" ? item?.GSTNo : "",
        mailId: item?.mailId != "" ? item?.mailId : "",
        registerType: "Dealer"
    });

    useEffect(() => {
        const fetchData = async () => {
            Store?.bindDistrict?.length == 0 && await Store?.getDistrictData();
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

    const sendHandler = () => {
        Store?.setMainLoader(true);
        bodyData?._id == "" || bodyData?._id == undefined ? Store?.postMemberData(bodyData?.registerType, bodyData) : Store?.putMemberData(bodyData?.registerType, bodyData)
        navigation.goBack()
        Store?.setMainLoader(false);
    }

    const validate = async () => {
        Keyboard.dismiss();

        let isValid = true;

        if (!bodyData?.bussinessName || bodyData?.bussinessName.length < 3) {
            handleError('Name must be min 3 Characters', 'bussinessName');
            isValid = false;
        }

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
        if (
            !bodyData?.GSTNo ||
            bodyData.GSTNo.toString().length !== 15 ||
            bodyData.GSTNo.toString().includes('.')
        ) {
            handleError('Enter correct GST number', 'GSTNo');
            isValid = false;
        }
        if (
            !bodyData?.mailId ||
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(bodyData.mailId)
        ) {
            handleError('Enter a valid email address', 'mailId');
            isValid = false;
        }

        if (isValid) {
            sendHandler();
        }
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?._id ? 'Update Dealer Info' : 'Create Dealer'}</Text>
                <Input
                    placeholder='Business Name *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={25}
                    value={bodyData?.bussinessName}
                    onChangeText={(value) => { onChange("bussinessName", value) }}
                    errorStyle={errors.bussinessName ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.bussinessName}
                    onFocus={() => handleError(null, 'bussinessName')}
                />
                <Input
                    placeholder='Name *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={15}
                    value={bodyData?.customerName}
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
                    value={bodyData?.mobileNo?.toString()}
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
                    value={bodyData?.alternateMobile?.toString()}
                    onChangeText={(value) => { onChange("alternateMobile", value) }}
                />
                <Input
                    placeholder='Address *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.address}
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
                    keyboardType='numeric'
                    value={bodyData.Pincode}
                    onChangeText={(value) => { onChange("Pincode", value) }}
                    errorStyle={errors.Pincode ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.Pincode}
                    onFocus={() => handleError(null, 'Pincode')}
                />
                <Input
                    placeholder='GST No *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={15}
                    value={bodyData?.GSTNo}
                    onChangeText={(value) => { onChange("GSTNo", value) }}
                    errorStyle={errors.GSTNo ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.GSTNo}
                    onFocus={() => handleError(null, 'GSTNo')}
                />
                <Input
                    placeholder='Mail Id *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData?.mailId}
                    onChangeText={(value) => { onChange("mailId", value) }}
                    errorStyle={errors.mailId ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.mailId}
                    onFocus={() => handleError(null, 'mailId')}
                />
                <Button
                    title={bodyData?._id == "" || bodyData?._id == undefined ? "Create Dealer" : "Update Dealer"}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={validate}
                />
            </ScrollView>
        </View>
    )
}

export default observer(CreateDealer)

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: wp(4.5),
        fontWeight: '800',
        color: Colors.primary,
        marginHorizontal: 10
    },
    text1: {
        marginHorizontal: 20,
        marginBottom: 8,
        marginTop: -20,
        fontSize: hp('1.2'),
    },

})