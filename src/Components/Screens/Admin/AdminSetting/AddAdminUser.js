import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderCommon from '../../../Others/HeaderCommon';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Store from '../../../../Utilities/Store/Store';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import CheckBox from 'react-native-check-box'

const AddAdminUser = ({ route }) => {

    const { item } = route.params;
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [bodyData, setBodyData] = useState({
        _id: item?._id != "" ? item?._id : "",
        customerName: item?.customerName != "" ? item?.customerName : "",
        mobileNo: item?.mobileNo != "" ? item?.mobileNo?.toString() : "",
        location: item?.location != "" ? item?.location : "",
        bussinessName: item?.bussinessName != "" ? item?.bussinessName : "",
        alternateMobile: item?.alternateMobile != "" ? item?.alternateMobile?.toString() : "",
        address: item?.address != "" ? item?.address : "",
        district: item?.district?._id != "" ? item?.district?._id : "",
        Pincode: item?.Pincode != "" ? item?.Pincode : "",
        GSTNo: item?.GSTNo != "" ? item?.GSTNo : "",
        mailId: item?.mailId != "" ? item?.mailId : "",
        registerType: "Staff",
        permissions: item?.permissions?.length == 0 ? [] : item?.permissions?.map(data => data?._id)
    });

    useEffect(() => {
        const fetchData = async () => {
            Store?.bindDistrict?.length == 0 && await Store?.getDistrictData();
            Store?.bindPermission?.length == 0 && await Store?.getPermissionData()
        }
        fetchData()
    }, [])

    // on press Handler
    const onPressHandler = (value) => {
        let permission = bodyData?.permissions;

        if (permission?.length > 0) {
            if (permission?.filter(data => data == value)?.length == 0) {
                permission.push(value)
            } else {
                permission = permission?.filter(data => data != value);
            }
        } else {
            permission.push(value)
        }
        setBodyData(bodyData => ({ ...bodyData, permissions: permission }));
    }

    // on change
    const onChange = (name, value) => {
        setBodyData({ ...bodyData, [name]: value });
    }
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    const sendHandler = () => {
        Store?.setMainLoader(true);
        // console.log(`body data -${ JSON.stringify(bodyData) }`)
        bodyData?._id == "" || bodyData?._id == undefined ? Store?.postMemberData(bodyData?.registerType, bodyData) :
            Store?.putMemberData(bodyData?.registerType, bodyData)
        navigation.goBack();
        Store?.setMainLoader(false);
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
        if (!bodyData?.location || bodyData?.location.length < 3) {
            handleError('Location must be min 3 Characters', 'location');
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

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?._id ? 'Update User Info' : 'Create User'}
                </Text>
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
                    placeholder='Alternative Mobile Number *'
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
                    value={bodyData?.address}
                    onChangeText={(value) => { onChange("address", value) }}
                    errorStyle={errors.address ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.address}
                    onFocus={() => handleError(null, 'address')}
                />
                <Input
                    placeholder='Location *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData?.location}
                    onChangeText={(value) => { onChange("location", value) }}
                    errorStyle={errors.location ? CommonStyles.errorStyle : CommonStyles.baseErrorStyle}
                    errorMessage={errors.location}
                    onFocus={() => handleError(null, 'location')}
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
                    value={bodyData?.Pincode?.toString()}
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
                    value={bodyData?.mailId}
                    onChangeText={(value) => { onChange("mailId", value) }}
                />
                <View style={{ marginHorizontal: 15, }}>
                    <Text style={[styles.labelStyle, { marginBottom: 25 }]}>Select Permissions</Text>
                    {
                        Store?.bindPermission?.length > 0 &&
                        Store?.bindPermission?.map((data, index) => {
                            const checked = bodyData?.permissions?.length > 0 ? bodyData?.permissions?.filter(check => check == data?._id)?.length == 1 ? true : false : false
                            return <View style={styles.checkBoxContainer} key={data?._id}>
                                <CheckBox
                                    style={{ flex: 1, padding: 18 }}
                                    onClick={() => onPressHandler(data?._id)}
                                    isChecked={checked}
                                    rightText={data?.dataName}
                                    checkBoxColor={Colors.primary}
                                />
                            </View>
                        })
                    }
                </View>
                <Button
                    title={item?._id ? 'Update' : 'Create'}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={validate}
                />
            </ScrollView>
        </View>
    )
}

export default observer(AddAdminUser);

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
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: -20
    },
})