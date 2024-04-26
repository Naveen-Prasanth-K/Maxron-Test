import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';
import Store from '../../../../Utilities/Store/Store';
import { commonDateFormat } from '../../../../Utilities/Constant/Common';


const CompletedRequest = () => {
    const [dealer, setDealer] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let dealerData = await Store.getLocalDataUserFullDetails();
            if(dealerData?.memberType?.dataName == "Admin"){
                await Store?.getFilterDeviceServiceData(0,0,0,0,"Completed",0 )
            }else{
                await Store?.getFilterDeviceServiceData(0,0,0,0,"Completed",dealerData._id )
            }         
            setDealer(dealerData)           
        }
        fetchData()
    }, [])


    return (
        <>
            {
                  Store?.deviceServiceCompleteData?.length > 0 ?
                  Store?.deviceServiceCompleteData?.map((item, index) => {
                        return (
                            <View key={item?.rfId} style={styles.cardContainer}>
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
                                        <Text style={styles.nameTxt}>{item?.location}</Text>
                                    </View>
                                </View>
                                <View style={styles.subContainer2}>
                                    <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.statusContainer]}>
                                        <Icon
                                            type='material'
                                            name='verified'
                                            size={24}
                                            style={{ marginRight: 10 }}
                                            color={Colors.secondary}
                                        />
                                        <Text style={styles.nameTxt2}>Completed</Text>
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

export default observer(CompletedRequest)

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
        color: Colors.secondary
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