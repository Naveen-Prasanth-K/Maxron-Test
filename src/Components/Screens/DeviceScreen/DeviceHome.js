import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../Utilities/Data/DummyData';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../Utilities/GlobalStyles/WinDimension';
import Header1 from '../../Others/Header1';
import Switch from '../../../Utilities/UI/Switch';
import Store from '../../../Utilities/Store/Store';
const { width, height } = Dimensions.get('window');
const cardGap = 10;

const DeviceHome = ({ data }) => {

    const navigation = useNavigation();
    const { screenWidth, screenHeight } = WinDimensions();
    const isLandscape = screenWidth > screenHeight;
    const cardWidth = (screenWidth - cardGap * 5) / (isLandscape ? 4 : 2);

    const [userActive, setUserActive] = useState(data?.customerStatus);

    useEffect(()=>{
        Store?.getActiveDeviceFilterData(0,0,0,0,0, data?._id, 0);
    },[])

    const userHandler = () => {
        setUserActive(!userActive);
    };

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <View style={styles.container}>
                <View  >
                    <Image
                        source={require('../../../Images/Profile/usericon.png')}
                        style={styles.uploadPic}
                    />
                </View>
                <View style={{ marginLeft: 30 }}>
                    <Text style={styles.userID}>{data?.customerName}</Text>
                    <View style={styles.locationContainer}>
                        <Icon
                            type='entypo'
                            name='location-pin'
                            size={18}
                            style={{ marginRight: 5 }}
                            color={Colors.secondary}
                        />
                        <Text style={styles.nameTxt}>{data?.district?.cityName}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text1}>Mobile</Text>
                <Text style={styles.text2}>{data?.mobileNo}</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text1}>User Status</Text>
                <Switch value={userActive} onToggle={() => userHandler} />
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text1}>Delete User</Text>
                <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                    <Icon
                        type='material'
                        name='logout'
                        size={22}
                        style={{ marginRight: 0 }}
                        color={Colors.secondary}
                    />
                </Pressable>

            </View>
        </View>
    )

    const DevicePageHandler = (item) => {
        navigation.navigate('DevicePage', { item: item })
    }

    const AddDeviceHandler = () => {
        navigation.navigate('AddDevice')
    }

    return (
        <>
            <View style={CommonStyles.pageContainer}>
                <FlatList
                    data={ Store?.activeDeviceData?.length > 0 && Store?.activeDeviceData }
                    // data={DEVICEDATA}
                    keyExtractor={(item) => item?._id}
                    ListHeaderComponent={headerItem}
                    numColumns={2}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginBottom: 5
                    }}
                    renderItem={({ item }) => (
                        <View style={[styles.cardHomeContainer, { width: cardWidth }]}>
                            <Pressable
                                style={({ pressed }) => [pressed && CommonStyles.pressed, styles.deviceContainer]}
                                onPress={() => DevicePageHandler(item?.deviceId)}>
                                <Image
                                    resizeMode="cover"
                                    source={require('../../../Images/HomeScreen/electricmotor.png')}
                                    style={{ width: cardWidth * 0.50, height: 75, alignSelf: 'center', opacity: item?.motorState === true ? 1 : 0.4 }}
                                />
                                <Text style={styles.deviceName}>{item?.deviceId?.controllerName}</Text>
                                <Text style={styles.deviceType}>{item?.deviceId?.IMEI}</Text>
                            </Pressable>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={CommonStyles.noDeviceImgContainer}>
                            <Image
                                resizeMode="cover"
                                source={require('../../../Images/HomeScreen/NoDevice.png')}
                                style={CommonStyles.noDeviceImg}
                            />
                        </View>
                    } />
            </View>
        </>
    )
}
export default observer( DeviceHome)
const styles = StyleSheet.create({
    cardHomeContainer: {
        marginTop: cardGap,
        height: 180,
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: Colors.primary,
        borderWidth: 2,
        padding: 5,
    },
    deviceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deviceName: {
        alignSelf: 'center',
        marginTop: 5,
        letterSpacing: 1,
        fontSize: wp('4'),
        fontWeight: '600'
    },
    deviceType: {
        alignSelf: 'center',
        fontSize: wp('3'),
    },
    pageHeading: {
        fontSize: wp('6.5'),
        fontWeight: '700'
    },
    uploadPic: {
        width: wp(26),
        height: wp(26),
        borderRadius: 100,
        justifyContent: 'center'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 35,
    },
    userID: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '600',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
        padding: 15,
        borderRadius: 8
    },
    text1: {
        fontSize: wp('4.5'),
        fontWeight: '700',
        color: Colors.primary
    },
    text2: {
        fontSize: wp('4'),
        fontWeight: '400',
        color: Colors.primary
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameTxt: {
        fontSize: wp('3.5'),
        color: Colors.primary200
    },
})
