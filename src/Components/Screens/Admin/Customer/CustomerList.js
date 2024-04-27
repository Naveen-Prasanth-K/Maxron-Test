import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CUSTOMERDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import SearchBar from '../../../Others/SearchBar';
import HeaderCommon from '../../../Others/HeaderCommon';
import Store from '../../../../Utilities/Store/Store';
const { width, height } = Dimensions.get('window');

const CustomerList = () => {

    const navigation = useNavigation();

    useEffect(() => {
        Store?.getFilterMemberData(0, 0, 0, "User");
    }, [])

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <Text style={CommonStyles.pageHeading}>Customers</Text>
            <Text style={styles.foundCount}>180 found</Text>
            <View>
                <View style={{ marginTop: 20 }}>
                    <SearchBar soldStatus={false} type="User" />
                </View>
            </View>
        </View>
    )

    const DetailPageHandler = (item) => {
        navigation.navigate('CustomerDetail', { item: item })
    }
    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <FlatList
                data={Store?.customerData?.length > 0 && Store?.customerData}
                keyExtractor={(item) => item?._id}
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
                                <Text style={styles.nameTxt}>{item?.district?.cityName}</Text>
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

        </View>
    )
}

export default observer(CustomerList)

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