import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../Utilities/GlobalStyles/Colors';

export default function ListDevice1({ item }) {

    const navigation = useNavigation();
    const DetailPageHandler = (item) => {
        navigation.navigate('DeviceDetails', { item: item })
    }

    return (
        <View>
            <View style={styles.cardContainer}>
                <Text style={styles.devicenameTxt}>{item?.scanQR}</Text>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt} >{item?.ownerId?.customerName}</Text>
                    <Divider orientation="vertical" width={1} style={{ marginHorizontal: 10 }} />
                    <Text style={styles.nameTxt} >{item?.masterMobileNo}</Text>
                </View>
                <View style={styles.locationContainer}>
                    <Icon
                        type='entypo'
                        name='location-pin'
                        size={18}
                        style={{ marginRight: 5 }}
                        color={Colors.secondary}
                    />
                    <Text style={styles.nameTxt}>{item?.ownerId?.location}</Text>
                </View>
                <View>
                    <Button
                        title="View Details"
                        buttonStyle={{
                            borderColor: Colors.secondary,
                            borderRadius: 5
                        }}
                        type="outline"
                        titleStyle={{ color: Colors.secondary }}
                        containerStyle={{
                            marginHorizontal: 20,
                            marginTop: 20,
                        }}
                        onPress={() => DetailPageHandler(item)}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {

        marginHorizontal: 15,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
        elevation: 5
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8
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
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8,
        alignItems: 'center'
    }
})