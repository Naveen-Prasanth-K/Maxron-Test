import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../../Others/HeaderCommon';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';

import Store from '../../../../Utilities/Store/Store';

const CreateDealer = ({ route }) => {

    const { item } = route.params
    const navigation = useNavigation();
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
    }
    const sendHandler = () => {
        item?._id == "" ? Store?.postMemberData(bodyData?.memberType, bodyData) : Store?.putMemberData(bodyData?.memberType, bodyData)
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?._id ? 'Update Dealer Info' : 'Create Dealer'}</Text>
                <Input
                    label='Business Name'
                    labelStyle={styles.labelStyle}
                    placeholder='Business Name*'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={25}
                    value={bodyData.bussinessName}
                    onChangeText={(value) => { onChange("bussinessName", value) }}
                />
                <Input
                    label='Name'
                    labelStyle={styles.labelStyle}
                    placeholder='Name*'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={15}
                    value={bodyData.customerName}
                    onChangeText={(value) => { onChange("customerName", value) }}
                />
                <Input
                    label='Mobile Number'
                    labelStyle={styles.labelStyle}
                    placeholder='Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType="numeric"
                    maxLength={10}
                    value={bodyData?.mobileNo}
                    onChangeText={(value) => { onChange("mobileNo", value) }}
                />
                <Input
                    label='Alternative Mobile Number'
                    labelStyle={styles.labelStyle}
                    placeholder='Alternative Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType="numeric"
                    maxLength={10}
                    value={bodyData?.alternateMobile}
                    onChangeText={(value) => { onChange("alternateMobile", value) }}
                />
                <Input
                    label='Address'
                    labelStyle={styles.labelStyle}
                    placeholder='Address *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.address}
                    onChangeText={(value) => { onChange("address", value) }}
                />
                <Dropdown
                    placeholder='District'
                    style={CommonStyles.dropdown}
                    search
                    searchPlaceholder="Search..."
                    placeholderStyle={CommonStyles.placeholderStyle}
                    selectedTextStyle={CommonStyles.selectedTextStyle}
                    containerStyle={CommonStyles.containerStyle}
                    itemContainerStyle={CommonStyles.itemContainerStyle}
                    activeColor={Colors.primary50}
                    data={Store?.bindDistrict}
                    labelField="cityName"
                    valueField="_id"
                    value={bodyData?.district}
                    onChange={item => {
                        onChange("district", item?._id)
                    }}
                />
                <Input
                    label='Pincode'
                    labelStyle={styles.labelStyle}
                    placeholder='Pincode *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData?.Pincode}
                    onChangeText={(value) => { onChange("Pincode", value) }}
                />
                <Input
                    label='GST No'
                    labelStyle={styles.labelStyle}
                    placeholder='GST No *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.GSTNo}
                    onChangeText={(value) => { onChange("GSTNo", value) }}
                />
                <Input
                    label='Mail Id'
                    labelStyle={styles.labelStyle}
                    placeholder='Mail Id *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.mailId}
                    onChangeText={(value) => { onChange("mailId", value) }}
                />
                <Button
                    title={bodyData?._id != "" ? "Update Dealer" : "Create Dealer"}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
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