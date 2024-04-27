import { useNavigation } from '@react-navigation/native';
import { Icon, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';
import Store from '../../../../Utilities/Store/Store';
import { commonDateFormat } from '../../../../Utilities/Constant/Common';
import { WinDimensions } from '../../../../Utilities/GlobalStyles/WinDimension';
import Loader1 from '../../../../Utilities/UI/Loader1';

const ActiveRequest = () => {

    const { screenWidth, screenHeight } = WinDimensions();
    const [dealer, setDealer] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setIsFetching(true);
        let dealerData = await Store.getLocalDataUserFullDetails();
        if (dealerData?.memberType?.dataName == "Admin") {
            await Store?.getFilterDeviceServiceData(0, 0, 0, 0, "Pending", 0)
        } else {
            await Store?.getFilterDeviceServiceData(0, 0, 0, 0, "Pending", dealerData._id)
        }
        setDealer(dealerData);
        setIsFetching(false);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false)
        }, 500)
    }

    return (
        <>
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={Store?.deviceServiceData.length > 0 && Store?.deviceServiceData}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}>
                        <View style={styles.subContainer}>
                            <View>
                                <Text style={styles.devicenameTxt}>{item?.deviceId?.ownerId?.customerName}</Text>
                                <Text style={styles.nameTxt}>{item?.deviceId?.ownerId?.mobileNo}</Text>
                                <Text style={styles.nameTxt}>Service Request</Text>
                                <Text style={styles.nameTxt}>{commonDateFormat(item?.requestedDate)}</Text>
                            </View>
                            <View style={styles.locationContainer}>
                                <Icon
                                    type='entypo'
                                    name='location-pin'
                                    size={24}
                                    style={{ marginRight: 5 }}
                                    color={Colors.secondary}
                                />
                                <Text style={styles.nameTxt}>{item?.deviceId?.location}</Text>
                            </View>
                        </View>
                        <View style={styles.subContainer2}>
                            <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.statusContainer]}>
                                <Icon
                                    type='ionicon'
                                    name='filter-sharp'
                                    size={24}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.nameTxt2}>Status</Text>
                            </Pressable>
                            <Button
                                title="Call"
                                buttonStyle={styles.callButtonStyle}
                                type="outline"
                                titleStyle={{ color: Colors.primary }}
                                containerStyle={styles.btnContainer}
                                icon={{
                                    name: 'call-sharp',
                                    type: 'ionicon',
                                    size: 20,
                                    color: Colors.primary,
                                }}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    isFetching ? (
                        <View style={{ flex: 1, height: screenHeight * 0.50, alignItems: 'center', }}>
                            <Loader1 />
                        </View>
                    ) : (
                        <View style={CommonStyles.noDeviceImgContainer}>
                            <Image
                                resizeMode="cover"
                                source={require('../../../../Images/HomeScreen/NoDevice.png')}
                                style={CommonStyles.noDeviceImg}
                            />
                        </View>
                    )
                }
            />
        </>
    )
}

export default observer(ActiveRequest);

const styles = StyleSheet.create({
    noDeviceImgContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },
    cardContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
        elevation: 5,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    subContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    locationContainer: {
        alignItems: 'center'
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameTxt: {
        fontSize: wp('4'),
        color: Colors.primary200,
        marginTop: 5
    },
    nameTxt2: {
        fontSize: wp('4'),
    },
    devicenameTxt: {
        fontSize: wp('5'),
        fontWeight: '700',
        color: Colors.primary
    },
    callButtonStyle: {
        borderColor: Colors.primary,
        borderRadius: 7
    },
    btnContainer: {
        width: '30%',
        borderRadius: 7
    }
})