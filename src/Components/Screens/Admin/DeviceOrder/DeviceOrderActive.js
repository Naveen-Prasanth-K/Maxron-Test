import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../../Utilities/GlobalStyles/WinDimension';
import HeaderCommon from '../../../Others/HeaderCommon';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../../../Others/SearchBar';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Store from '../../../../Utilities/Store/Store';
import { commonDateFormat } from '../../../../Utilities/Constant/Common';

const DeviceOrderActive = () => {

    //console.log(`Store?.deviceOrderData?.length -${ Store?.deviceOrderData?.length }`)

    return (
        <View>
            <FlatList
                data={Store?.deviceOrderData?.length > 0 && Store?.deviceOrderData}
                keyExtractor={(item) => item?._id}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}
                    >
                        <View style={styles.locationContainer}>
                            <View>
                                <Text style={styles.devicenameTxt}>{item?.buyerId?.customerName}</Text>
                                <Text style={styles.nameTxt}>{item?.buyerId?.mobileNo}</Text>
                            </View>
                            <View>
                                <Text style={styles.orderCount}>{item?.noOfOrderDevice}</Text>
                            </View>
                        </View>
                        <View style={styles.locationContainer1}>
                            <View style={styles.locationContainer}>
                                <Icon
                                    type='entypo'
                                    name='location-pin'
                                    size={18}
                                    style={{ marginRight: 5 }}
                                    color={Colors.secondary}
                                />
                                <Text style={styles.nameTxt}>{item?.buyerId?.location}</Text>
                            </View>
                            <Text style={styles.nameTxt}>{commonDateFormat(item?.buyerId?.joinedDate)}</Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={CommonStyles.noDeviceImgContainer}>
                        <Image
                            resizeMode="cover"
                            source={require('../../../../Images/HomeScreen/NoDevice.png')}
                            style={CommonStyles.noDeviceImg}
                        />
                    </View>
                } />

        </View>
    )
}

export default observer(DeviceOrderActive);

const styles = StyleSheet.create({

    cardContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightOrange,
        elevation: 5
    },
    devicenameTxt: {
        fontSize: wp('5'),
        fontWeight: '700',
        color: Colors.primary
    },
    nameTxt: {
        fontSize: wp('3.5'),
        color: Colors.primary200
    },
    orderCount: {
        fontSize: wp('8'),
        fontWeight: '700',
        color: Colors.primary
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    locationContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    },
    callButtonStyle: {
        borderColor: Colors.primary,
        borderRadius: 7
    },
    btnContainer: {
        width: '25%',
        borderRadius: 7,
        marginRight: 15
    }
})