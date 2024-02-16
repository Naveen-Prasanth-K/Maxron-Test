import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input, CheckBox } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderCommon from '../../../Others/HeaderCommon';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';


const AddAdminUser = ({ route }) => {

    const { item } = route.params;
    const navigation = useNavigation();

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);

    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?.rfId ? 'Update User Info' : 'Create User'}
                </Text>
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
                />
                <Input
                    label='Location'
                    labelStyle={styles.labelStyle}
                    placeholder='Location *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    value={item?.alternateMobile}
                />
                <Input
                    label={item?.rfId ? 'Change Password' : 'New Password'}
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
                <View style={{ marginHorizontal: 15, }}>
                    <Text style={[styles.labelStyle, { marginBottom: 25 }]}>Select Permissions</Text>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            center
                            title="Create Dealer"
                            containerStyle={{ backgroundColor: 'transparent' }}
                            checked={check1}
                            onPress={() => setCheck1(!check1)}
                            textStyle={{ fontSize: 13, fontWeight: '400' }}
                        />
                        <CheckBox
                            center
                            title="Create Customers"
                            containerStyle={{ backgroundColor: 'transparent' }}
                            checked={check2}
                            onPress={() => setCheck2(!check2)}
                            textStyle={{ fontSize: 13, fontWeight: '400' }}
                        />
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            center
                            title="Manage Dealer"

                            containerStyle={{ backgroundColor: 'transparent' }}
                            checked={check3}
                            onPress={() => setCheck3(!check3)}
                            textStyle={{ fontSize: 13, fontWeight: '400' }}
                        />
                        <CheckBox
                            center
                            title="Manage Customers"
                            containerStyle={{ backgroundColor: 'transparent' }}
                            checked={check4}
                            onPress={() => setCheck4(!check4)}
                            textStyle={{ fontSize: 13, fontWeight: '400' }}
                        />
                    </View>
                </View>
                <Button
                    title={item?.rfId ? 'Update' : 'Create'}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    )
}

export default AddAdminUser

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