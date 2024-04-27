import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from 'react'
import { Button, Icon, Input } from '@rneui/themed';
import HeaderCommon from '../../Others/HeaderCommon'
import { ScrollView } from 'react-native'
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Store from '../../../Utilities/Store/Store';

const  ActivateDevice = ({ route }) => {
    const { item } = route.params
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [bodyData, setBodyData] = useState({
        scanQR: item.scanQR != "" ? item.scanQR :  "",
        controllerName: item.controllerName != "" ? item.controllerName :  "",
        masterMobileNo: item.masterMobileNo != "" ? item.masterMobileNo :  "",
        ownerId:  "",
        IMEI: item.IMEI != "" ? item.IMEI :  "",
        customerId : "",
        deviceId : item._id != "" ? item._id : ""
    });

    

    useEffect(() => {
        const fetchData = async () => {
            let id = await Store.getLocalDataUserDetails("_id");
            if (id) {
                setBodyData({ ...bodyData, ownerId: id });
            }
            Store?.getFilterMemberData(0, 0, 0, "User");
        }
        fetchData()

    }, [])

      // on change
      const onChange = (name, value) => {
        setBodyData({ ...bodyData, [name]: value });
    }
    // Active Device Handler
    const ActiveDeviceHandler = async () => {
     await Store?.postActiveDeviceData(bodyData);
     navigation.goBack()
    }

    const CancelHandler = () => {
        navigation.goBack()
    }

    const BarCodeScanHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigation.navigate('BarCodeScan');
            setIsLoading(false);
        }, 1000);
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.secondary} />
                </View>
            )}
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Activate Device</Text>
                <View>
                    <Input
                        placeholder='Enter or Scan QR *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        value={bodyData.scanQR.toString()}
                        onChangeText={(value) => { onChange("scanQR", value) }}
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
                    />
                    <Input
                        placeholder='Controller Name *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        value={bodyData.controllerName.toString()}
                        onChangeText={(value) => { onChange("controllerName", value) }}
                    />
                    <Input
                        placeholder='Controller Mobile Number *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        value={bodyData.masterMobileNo.toString()}
                        onChangeText={(value) => { onChange("masterMobileNo", value) }}
                    />
                     <Dropdown
                        style={CommonStyles.dropdown}
                        placeholderStyle={CommonStyles.placeholderStyle}
                        selectedTextStyle={CommonStyles.selectedTextStyle}
                        inputSearchStyle={CommonStyles.inputSearchStyle}
                        activeColor={Colors.primary50}
                        itemContainerStyle={CommonStyles.itemContainerStyle}
                        placeholder='Customer Name'
                        search
                        searchPlaceholder="Search..."
                        data={Store?.customerData}
                        labelField="customerName"
                        valueField="_id"
                        value={bodyData?.customerId}
                        onChange={item => {
                            onChange("customerId", item?._id)
                        }}
                    />
                    <Input
                        placeholder='Enter 4 digit Security PIN *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={4}
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
                            title="Activate"
                            titleStyle={CommonStyles.inputTitleStyle}
                            buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.primary }]}
                            containerStyle={styles.ContainerStyle}
                            onPress={() => ActiveDeviceHandler()}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default observer(ActivateDevice);
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
    loaderContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})