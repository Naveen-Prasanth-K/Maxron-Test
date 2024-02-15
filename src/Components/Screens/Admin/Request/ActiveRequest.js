import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';


const ActiveRequest = () => {
    return (
        <>
            {
                DEALERDATA.length > 0 ?
                    DEALERDATA?.map((item, index) => {
                        return (
                            <View key={item?.rfId} style={styles.cardContainer}>
                                <View style={styles.subContainer}>
                                    <View>
                                        <Text style={styles.devicenameTxt}>{item.customerName}</Text>
                                        <Text style={styles.nameTxt}>{item?.mobileNo}</Text>
                                        <Text style={styles.nameTxt}>Service Request</Text>
                                        <Text style={styles.nameTxt}>8-12-2023</Text>
                                    </View>
                                    <View style={styles.locationContainer}>
                                        <Icon
                                            type='entypo'
                                            name='location-pin'
                                            size={24}
                                            style={{ marginRight: 5 }}
                                            color={Colors.secondary}
                                        />
                                        <Text style={styles.nameTxt}>{item?.location}</Text>
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
                        );
                    })
                    :
                    <View style={styles.noDeviceImgContainer}>
                        <Image
                            resizeMode="cover"
                            source={require('../../../../Images/HomeScreen/NoDevice.png')}
                            style={CommonStyles.noDeviceImg}
                        />
                    </View>
            }
        </>
    )
}

export default ActiveRequest

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