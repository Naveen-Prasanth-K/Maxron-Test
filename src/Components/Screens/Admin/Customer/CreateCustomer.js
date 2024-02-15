
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../../Others/Header';

const CreateCustomer = ({ route }) => {

    const { item } = route.params
    const navigation = useNavigation();

    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?.rfId ? 'Update Customer Info' : 'Create Customer'}</Text>
                <Input
                    label='Name'
                    labelStyle={styles.labelStyle}
                    placeholder='Name*'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.customerName}
                />
                <Input
                    label='Mobile Number'
                    labelStyle={styles.labelStyle}
                    placeholder='Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.alternateMobile}
                    maxLength={10}
                />
                <Input
                    label='Alternative Mobile Number'
                    labelStyle={styles.labelStyle}
                    placeholder='Alternative Mobile Number *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.alternateMobile}
                    maxLength={10}
                />
                <Input
                    label='Address'
                    labelStyle={styles.labelStyle}
                    placeholder='Address *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.address}
                />
                <Input
                    label='District'
                    labelStyle={styles.labelStyle}
                    placeholder='District *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.District}
                />
                <Input
                    label='Pincode'
                    labelStyle={styles.labelStyle}
                    placeholder='Pincode *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.Pincode}
                />
                <Input
                    label='Mail Id'
                    labelStyle={styles.labelStyle}
                    placeholder='Mail Id *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.MailId}
                />
                <Input
                    label='Change Password'
                    labelStyle={styles.labelStyle}
                    placeholder='Change Password *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.password}
                    secureTextEntry={true}
                />
                <Text style={styles.text1}>*If you want to reset password use this fields. Otherwise leave it empty</Text>
                <Input
                    label='Re Enter Password'
                    labelStyle={styles.labelStyle}
                    placeholder='Re Enter Password *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.password}
                    secureTextEntry={true}
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

export default CreateCustomer

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