import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../Utilities/Data/DummyData';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import SearchBar from '../../Others/SearchBar';
import ListDevice1 from '../../Others/ListDevice1';
import Store from '../../../Utilities/Store/Store';

const { width, height } = Dimensions.get('window');

const SoldDevices = () => {

    useEffect(()=>{
        Store?.filterGetDeviceData(0,0,0,0,0, true);

    },[])

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <Text style={CommonStyles.pageHeading}>Sold Devices</Text>
            <Text style={styles.foundCount}>180 Devices found</Text>
            <View>
                <View style={{ marginTop: 20 }}>
                    <SearchBar  soldStatus={true} type="Device" />
                </View>
            </View>
        </View>
    )

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <FlatList
                // data={DEVICEDATA}
                data={ Store?.soldDeviceData?.length > 0 && Store?.soldDeviceData }
                keyExtractor={(item) => item?._id}
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
export default observer(SoldDevices) ;
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