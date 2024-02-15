import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../Utilities/Data/DummyData';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import SearchBar from '../../Others/SearchBar';
import ListDevice1 from '../../Others/ListDevice1';

const { width, height } = Dimensions.get('window');

export default function SoldDevices() {

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <Text style={CommonStyles.pageHeading}>Sold Devices</Text>
            <Text style={styles.foundCount}>180 Devices found</Text>
            <View>
                <View style={{ marginTop: 20 }}>
                    <SearchBar />
                </View>
            </View>
        </View>
    )

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <FlatList
                data={DEVICEDATA}
                keyExtractor={(item) => item?.rfId}
                ListHeaderComponent={headerItem}
                renderItem={({ item }) => (
                    <ListDevice1 item={item} />
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
    )
}

const styles = StyleSheet.create({
    foundCount: {
        fontSize: wp('3.5'),
        fontWeight: '400',
        color: Colors.primary100,
        marginTop: -15,
        marginHorizontal: 15
    },
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