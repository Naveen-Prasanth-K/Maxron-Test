import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import ListDevice2 from '../../Others/ListDevice2';

const DeviceDetails = ({ route }) => {

    const navigation = useNavigation();
    const { item } = route.params;

    const DetailPageHandler = (item) => {
        navigation.navigate('DeviceDetails', { item: item })
    }

    const AddDeviceHandler = () => {
        navigation.navigate('AddDevice')
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>{item?.deviceName} Details</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.text1}>Location</Text>
                    <Text style={styles.text2}>{item?.location}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.text1}>IMEI</Text>
                    <Text style={styles.text2}>{item?.IMEI}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.text1}>Mobile No</Text>
                    <Text style={styles.text2}>{item?.masterMobileNo}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.text1}>Fixed Date</Text>
                    <Text style={styles.text2}>{item?.fixedDate}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.text1}>Total Services</Text>
                    <Text style={styles.text2}>{item?.totalServices}</Text>
                </View>
                <View style={styles.replaceContainer}>
                    <View style={styles.rowContainer2}>
                        <Text style={styles.text1}>Replace Device</Text>
                        <Text style={styles.text2}>{item?.replaced}</Text>
                    </View>
                    <ListDevice2 item={item} />
                    <Button
                        title="Add Replace Device"
                        buttonStyle={{
                            borderColor: Colors.secondary,
                            borderRadius: 5,
                            backgroundColor: Colors.secondary
                        }}
                        containerStyle={{
                            marginHorizontal: 10,
                            marginTop: 20,
                        }}
                        onPress={() => AddDeviceHandler()}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default DeviceDetails

const styles = StyleSheet.create({
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
        fontSize: wp('4.8'),
        fontWeight: '700',
        color: Colors.primary
    },
    text2: {
        fontSize: wp('4'),
        fontWeight: '400',
        color: Colors.primary
    },

    replaceContainer: {
        backgroundColor: Colors.lightOrange,
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 15,
    },
    rowContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',

    },

})