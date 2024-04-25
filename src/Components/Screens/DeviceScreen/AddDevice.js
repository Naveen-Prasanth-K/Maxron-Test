import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
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
    const [isLoading, setIsLoading] = useState(false);
    const [bodyData, setBodyData] = useState({
        scanQR: "",
        controllerName: "",
        masterMobileNo: "",
        ownerId: "",
        IMEI : ""
    });

    useEffect(()=>{
        const fetchData =async () =>{
            let id = await Store.getLocalDataUserDetails("_id");
            if(id ){
                setBodyData({ ...bodyData, ownerId : id });
            }
        }

        fetchData()

    },[])

    // on change
    const onChange = (name, value) => {
        setBodyData({ ...bodyData, [name]: value });
    }
    const AddDeviceHandler = async () => {
        await Store?.postDeviceData(bodyData);
        navigation.goBack()
    }
    // Cancel Handler
    const CancelHandler = () => {
        navigation.goBack()
    }
    // Bar Code
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
                <Text style={CommonStyles.pageHeading}>Add Device</Text>
                <View>
                    <Input
                        placeholder='Enter or Scan QR *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
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
                    />
                     <Input
                        placeholder='IMEI *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        value={bodyData.IMEI.toString()}
                        onChangeText={(value) => { onChange("IMEI", value) }}
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
                            onPress={() => AddDeviceHandler()}
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