import { useNavigation } from '@react-navigation/native';
import { Icon, Divider, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../Utilities/Data/DummyData';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import SearchBar from '../../Others/SearchBar';
import ListDevice1 from '../../Others/ListDevice1';
import Store from '../../../Utilities/Store/Store';
import { WinDimensions } from '../../../Utilities/GlobalStyles/WinDimension';
import Loader1 from '../../../Utilities/UI/Loader1';

const SoldDevices = () => {

    const navigation = useNavigation();

    const { screenWidth, screenHeight } = WinDimensions();
    const [isFetching, setIsFetching] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setIsFetching(true);
        await Store?.filterGetDeviceData(0, 0, 0, 0, 0, true);
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

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <Text style={CommonStyles.pageHeading}>Sold Devices</Text>
            <Text style={styles.foundCount}>180 Devices found</Text>
            <View>
                <View style={{ marginTop: 20 }}>
                    <SearchBar soldStatus={true} type="Device" />
                </View>
            </View>
        </View>
    )

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                data={Store?.soldDeviceData?.length > 0 && Store?.soldDeviceData}
                keyExtractor={(item) => item?._id}
                ListHeaderComponent={headerItem}
                renderItem={({ item }) => (
                    <ListDevice1 item={item} />
                )}
                ListEmptyComponent={
                    isFetching ? (
                        <View style={{ flex: 1, height: screenHeight * 0.80, alignItems: 'center', }}>
                            <Loader1 />
                        </View>
                    ) : (
                        <View style={CommonStyles.noDeviceImgContainer}>
                            <Image
                                resizeMode="cover"
                                source={require('../../../Images/HomeScreen/NoDevice.png')}
                                style={CommonStyles.noDeviceImg}
                            />
                        </View>
                    )
                }
            />
        </View>
    )
}
export default observer(SoldDevices);
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