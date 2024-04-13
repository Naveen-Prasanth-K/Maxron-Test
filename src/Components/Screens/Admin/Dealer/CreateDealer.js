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
        memberType: "65ff86d39a46960cfddc7640"
    });

    useEffect(() => {
        Store?.bindDistrict?.length == 0 && Store?.getDistrictData();
    }, [])
    // on change
    const onChange = (name, value) => {
        setBodyData({ ...bodyData, [name]: value });
    }
    const sendHandler = () => {
        Store?.postMemberData(bodyData?.memberType, bodyData)
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?.rfId ? 'Update Dealer Info' : 'Create Dealer'}</Text>
                <Input
                    label='Business Name'
                    labelStyle={styles.labelStyle}
                    placeholder='Business Name*'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    maxLength={25}
                    value={bodyData.bussinessName.toString()}
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
                    value={bodyData.customerName.toString()}
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
                    value={bodyData.mobileNo.toString()}
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
                    value={bodyData.alternateMobile.toString()}
                    onChangeText={(value) => { onChange("alternateMobile", value) }}
                />
                <Input
                    label='Address'
                    labelStyle={styles.labelStyle}
                    placeholder='Address *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.address.toString()}
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
                    value={bodyData.Pincode.toString()}
                    onChangeText={(value) => { onChange("Pincode", value) }}
                />
                <Input
                    label='GST No'
                    labelStyle={styles.labelStyle}
                    placeholder='GST No *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.GSTNo.toString()}
                    onChangeText={(value) => { onChange("GSTNo", value) }}
                />
                <Input
                    label='Mail Id'
                    labelStyle={styles.labelStyle}
                    placeholder='Mail Id *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={bodyData.mailId.toString()}
                    onChangeText={(value) => { onChange("mailId", value) }}
                />
                <Button
                    title="Create Dealer"
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