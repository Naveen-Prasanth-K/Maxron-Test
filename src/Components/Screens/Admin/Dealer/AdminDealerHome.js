import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Header1 from '../../../Others/Header1';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../../../Others/SearchBar';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Store from '../../../../Utilities/Store/Store';
import Loader1 from '../../../../Utilities/UI/Loader1';
import { WinDimensions } from '../../../../Utilities/GlobalStyles/WinDimension';

const AdminDealerHome = () => {

    const navigation = useNavigation();

    const { screenWidth, screenHeight } = WinDimensions();
    const [isFetching, setIsFetching] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setIsFetching(true);
        await Store?.getFilterMemberData(0, 0, 0, "Dealer")
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

    const DealerInfoHandler = async (item) => {
        await Store?.getDashboardMemberData(item?._id, "Dealer")
        navigation.navigate('AdminDealerInfo', { item: item })
    }

    const headerItem = () => (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <LinearGradient
                colors={GradientColor}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 1, y: 0.5 }}
            >
                <View style={CommonStyles.adminHeader}>
                    <Text style={CommonStyles.welcomeTxt}>Welcome!</Text>
                    <Text style={CommonStyles.adminTxt}>Naveen Prasanth</Text>
                    <SearchBar soldStatus={false} type="Dealer" />
                </View>
            </LinearGradient>
            <Text style={CommonStyles.dealerTxt}>DEALERS</Text>
        </>
    );

    //console.log(`AdminDealerHome = ${JSON.stringify(Store?.dealerData)}`)

    return (
        <>
            <View style={CommonStyles.pageContainer}>
                <>
                    <Header1 />
                    <FlatList
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        data={Store?.dealerData?.length > 0 && Store?.dealerData}
                        keyExtractor={(item) => item?._id}
                        ListHeaderComponent={headerItem}
                        renderItem={({ item }) => (
                            <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]}
                                onPress={() => DealerInfoHandler(item)}
                            >
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
                            isFetching ? (
                                <View style={{ flex: 1, height: screenHeight * 0.80, alignItems: 'center', }}>
                                    <Loader1 />
                                </View>
                            ) : (
                                <View style={CommonStyles.noDeviceImgContainer}>
                                    <Image
                                        resizeMode="cover"
                                        source={require('../../../../Images/HomeScreen/NoDevice.png')}
                                        style={CommonStyles.noDeviceImg}
                                    />
                                </View>
                            )
                        }
                    />
                </>
            </View>
        </>
    )
}

export default observer(AdminDealerHome);

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

