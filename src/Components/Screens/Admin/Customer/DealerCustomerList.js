import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CUSTOMERDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import SearchBar from '../../../Others/SearchBar';
import HeaderCommon from '../../../Others/HeaderCommon';
import { LinearGradient } from 'expo-linear-gradient';
import Header1 from '../../../Others/Header1';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const DealerCustomerList = () => {

    const navigation = useNavigation();

    const headerItem = () => (
        <>
            <LinearGradient
                colors={GradientColor}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 1, y: 0.5 }}
            >
                <Header1 />
                <View style={CommonStyles.adminHeader}>
                    <Text style={CommonStyles.welcomeTxt}>Welcome!</Text>
                    <Text style={CommonStyles.adminTxt}>Naveen Prasanth</Text>
                    <SearchBar />
                </View>
            </LinearGradient>
            <Text style={CommonStyles.dealerTxt}>CUSTOMER</Text>
        </>
    )

    const DetailPageHandler = (item) => {
        navigation.navigate('CustomerDetail', { item: item })
    }

    return (
        <SafeAreaView style={CommonStyles.pageContainer}>
            <FlatList
                data={CUSTOMERDATA}
                keyExtractor={(item) => item?.rfId}
                ListHeaderComponent={headerItem}
                renderItem={({ item }) => (
                    <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]} onPress={() => DetailPageHandler(item)}>
                        <Text style={styles.devicenameTxt}>{item?.customerName}</Text>
                        <Text style={styles.nameTxt}>{item?.mobileNo}</Text>
                        <View style={styles.locationContainer1}>
                            <View style={styles.locationContainer}>
                                <Icon
                                    type='entypo'
                                    name='location-pin'
                                    size={18}
                                    style={{ marginRight: 5 }}
                                    color={Colors.secondary}
                                />
                                <Text style={styles.nameTxt}>{item?.location}</Text>
                            </View>
                            <Text style={styles.nameTxt}>{item?.joinedDate}</Text>
                        </View>
                    </Pressable>
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
        </SafeAreaView>
    )
}

export default DealerCustomerList

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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    locationContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    }
})