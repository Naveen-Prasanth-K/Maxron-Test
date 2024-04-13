
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Store from '../../../../Utilities/Store/Store';
import HeaderCommon from '../../../Others/HeaderCommon';

const CreateCustomer = ({ route }) => {

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
        memberType: "65ff86df9a46960cfddc7646"
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
                <Text style={CommonStyles.pageHeading}>{item?.rfId ? 'Update Customer Info' : 'Create Customer'}</Text>
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
                    style={CommonStyles.dropdown}
                    placeholderStyle={CommonStyles.placeholderStyle}
                    selectedTextStyle={CommonStyles.selectedTextStyle}
                    inputSearchStyle={CommonStyles.inputSearchStyle}
                    activeColor={Colors.primary50}
                    itemContainerStyle={CommonStyles.itemContainerStyle}
                    placeholder='District'
                    search
                    searchPlaceholder="Search..."
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
                    title={item?.rfId ? 'Update Customer' : 'Create Customer'}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    )
}

export default observer(CreateCustomer);

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