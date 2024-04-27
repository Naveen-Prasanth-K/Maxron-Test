import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Overlay, Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeaderCommon from '../../../Others/HeaderCommon';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import Header1 from '../../../Others/Header1';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Store from '../../../../Utilities/Store/Store';

const DealerSetting = () => {

    const [dealer, setDealer] = useState({})
    const navigation = useNavigation();
    const [logoutVisible, setLogoutVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [formData, setFormData] = useState({
        "buyerId": "",
        "noOfOrderDevice": "",
        "status": "Pending",
        "registerType": "Dealer"
    });

    const [updateData, setUpdateData] = useState({
        "_id": "",
        "pin": ""
    })
    useEffect(() => {
        const fetchData = async () => {
            let dealerData = await Store.getLocalDataUserFullDetails();
            if (dealerData._id != null) {
                setFormData(formData => ({ ...formData, buyerId: dealerData._id }))
                setUpdateData(updateData => ({ ...updateData, _id: dealerData._id }))
                setDealer(dealerData);
            }
        }
        fetchData()
    }, [])

    const onChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const toggleLogoutOverlay = () => {
        setLogoutVisible(!logoutVisible);
    };
    const toggleDeviceOverlay = () => {
        setDeviceVisible(!deviceVisible);
    };

    const logoutHandler = async () => {
        toggleOverlay();
        Store?.setMainLoader(true);
        await Store?.deleteLocalStorageData();
        navigation.navigate('LoginScreen');
        Store?.setMainLoader(false);
    };

    const RequestHandler = () => {

        //console.log("form Data  ", JSON.stringify(formData));
        Store?.postDeviceOrderData(formData?.registerType, formData)
        toggleDeviceOverlay()
    }
    // const DeviceOrderHandler = () => {
    //     navigation.navigate('DeviceOrder')
    // }
    const DeviceStockHandler = () => {
        navigation.navigate('StockHome')
    }
    const PinResetHandler = () => {
        navigation.navigate('PinReset')
    }

    return (
        <>
            <Header1 />
            <ScrollView style={CommonStyles.pageContainer}>
                <LinearGradient
                    colors={GradientColor}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <View style={CommonStyles.adminHeader}>
                        <Text style={CommonStyles.welcomeTxt}>Welcome!</Text>
                        <Text style={CommonStyles.adminTxt}>{dealer?.customerName != "" ? dealer?.customerName : ""}</Text>
                    </View>
                </LinearGradient>
                <Text style={CommonStyles.pageHeading}>Settings</Text>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/light.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Device Request</Text>
                            <Text style={styles.subText}>Request Devices from Admin</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={toggleDeviceOverlay}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/reset.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Reset PIN</Text>
                            <Text style={styles.subText}>Manage your PIN</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={PinResetHandler}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/Logout.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Log out</Text>
                            <Text style={styles.subText}>Logout from your account</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={toggleLogoutOverlay}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 25, fontSize: 12 }}>Version-1.0.0</Text>
            </ScrollView>
            <Overlay isVisible={logoutVisible} onBackdropPress={toggleLogoutOverlay} overlayStyle={CommonStyles.overlayContainer}>
                <Text style={styles.deleteTxt}>Are sure want to logout from your account?</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Cancel"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.secondary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => toggleLogoutOverlay()}
                    />
                    <Button
                        title="Logout"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.primary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => logoutHandler()}
                    />
                </View>
            </Overlay>
            <Overlay isVisible={deviceVisible} onBackdropPress={toggleDeviceOverlay} overlayStyle={CommonStyles.overlayContainer}>
                <Text style={[styles.deleteTxt, { marginBottom: 10 }]}>Device Request</Text>
                <Text style={styles.subText2}>Mention the no of devices & send a request to Admin</Text>
                <Input
                    placeholder='No of Devices*'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType="numeric"
                    value={formData?.noOfOrderDevice}
                    onChangeText={(value) => { onChange("noOfOrderDevice", value) }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Cancel"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.secondary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => toggleDeviceOverlay()}
                    />
                    <Button
                        title="Request"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.primary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => RequestHandler()}
                    />
                </View>
            </Overlay>
        </>
    )
}
export default observer(DealerSetting);

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginHorizontal: 18,
        marginVertical: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subText: {
        fontSize: wp(3.3),
        fontWeight: '300',
        color: Colors.primary100
    },
    subText2: {
        fontSize: wp(3.3),
        fontWeight: '300',
        color: Colors.primary100,
        textAlign: 'center',
        marginBottom: 20
    },
    mainText: {
        fontSize: wp(4.2),
        fontWeight: '600',
        marginBottom: 3
    },
    rightIcon: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary75
    },
    image: {
        width: wp('7'),
        height: hp('3.5'),
        tintColor: Colors.primary
    },
    imageContainer: {
        padding: 11,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.lightBlue
    },
    ContainerStyle: {
        alignSelf: 'center',
        marginVertical: 10,
        width: wp('30')
    },
    ButtonStyle: {
        borderRadius: 8,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 25
    },
    deleteTxt: {
        marginHorizontal: 15,
        textAlign: 'center',
        marginVertical: 25,
        fontSize: wp('4.5'),
        fontWeight: '400',
    }

})