import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Button } from '@rneui/themed';
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

const DeviceOrderCompleted = () => {
    return (
        <View>
            <FlatList
                data={DEALERDATA}
                keyExtractor={(item) => item?.rfId}
                renderItem={({ item }) => (
                    <View style={styles.cardContainer}
                    >
                        <View style={styles.locationContainer}>
                            <View>
                                <Text style={styles.devicenameTxt}>{item?.customerName}</Text>
                                <Text style={styles.nameTxt}>{item?.mobileNo}</Text>
                            </View>
                            <View>
                                <Text style={styles.orderCount}>{item?.soldDevices}</Text>
                            </View>
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

export default DeviceOrderCompleted

const styles = StyleSheet.create({

    cardContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
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