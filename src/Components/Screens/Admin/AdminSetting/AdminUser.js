import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
const AdminUser = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            await Store?.getFilterMemberData(0, 0, 0, "Staff")
        }
        fetchData()
    }, [])

    const InfoHandler = (item) => {
        navigation.navigate('AddAdminUser', { item: item })
    }
    const AddHandler = () => {
        navigation.navigate('AddAdminUser', { item: "" })
    }

    const headerItem = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <Text style={CommonStyles.pageHeading}>Admin Users</Text>
            <Button
                title="Add"
                buttonStyle={styles.callButtonStyle}
                type="outline"
                titleStyle={{ color: Colors.primary }}
                containerStyle={styles.btnContainer}
                icon={{
                    name: 'plus',
                    type: 'entypo',
                    size: 20,
                    color: Colors.primary,
                }}
                onPress={AddHandler}
            />
        </View>
    )

    return (
        <>
            <View style={CommonStyles.pageContainer}>
                <HeaderCommon />
                <FlatList
                    data={Store?.staffData?.length > 0 && Store?.staffData}
                    keyExtractor={(item) => item?._id}
                    ListHeaderComponent={headerItem}
                    renderItem={({ item }) => (
                        <View style={styles.cardContainer}
                        >
                            <View style={styles.locationContainer}>
                                <View>
                                    <Text style={styles.devicenameTxt}>{item?.customerName}</Text>
                                    <Text style={styles.nameTxt}>{item?.mobileNo}</Text>
                                </View>
                                <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}
                                    onPress={() => InfoHandler(item)}
                                >
                                    <Icon
                                        type='antdesign'
                                        name='edit'
                                        size={19}
                                        color={Colors.primary}
                                        reverse
                                    />
                                </Pressable>
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
                                    <Text style={styles.nameTxt}>{item?.location}</Text>
                                </View>
                                <Text style={styles.nameTxt}>{commonDateFormat(item?.joinedDate)}</Text>
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
        </>
    )
}

export default observer(AdminUser);

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

