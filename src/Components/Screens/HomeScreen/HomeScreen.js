import { useNavigation } from '@react-navigation/native';
import { Icon, Image } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../Utilities/Data/DummyData';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../Utilities/GlobalStyles/WinDimension';
import Header1 from '../../Others/Header1';

const { width, height } = Dimensions.get('window');
const cardGap = 10;

export default function HomeScreen() {

    const navigation = useNavigation();
    const { screenWidth, screenHeight } = WinDimensions();
    const isLandscape = screenWidth > screenHeight;
    const cardWidth = (screenWidth - cardGap * 5) / (isLandscape ? 4 : 2);

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <Text style={CommonStyles.pageHeading}>Devices</Text>
            <Pressable
                style={({ pressed }) => pressed && CommonStyles.pressed}
                onPress={AddDeviceHandler}>
                <Icon
                    type='ionicon'
                    name='add-circle'
                    size={43}
                    color={Colors.primary}
                />
            </Pressable>
        </View>
    )

    const DevicePageHandler = (item) => {
        //console.log(item)
        navigation.navigate('DevicePage', { item: item })
    }

    const AddDeviceHandler = () => {
        navigation.navigate('AddDevice')
    }


    return (
        <>
            <Header1 />
            <View style={CommonStyles.pageContainer}>
                <FlatList
                    data={DEVICEDATA}
                    keyExtractor={(item) => item?.rfId}
                    ListHeaderComponent={headerItem}
                    numColumns={2}
                    columnWrapperStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginBottom: 5
                    }}
                    renderItem={({ item }) => (
                        <View style={[styles.cardHomeContainer, { width: cardWidth }]}>
                            <Pressable
                                style={({ pressed }) => [pressed && CommonStyles.pressed, styles.deviceContainer]}
                                onPress={() => DevicePageHandler(item)}>
                                <Image
                                    resizeMode="cover"
                                    source={require('../../../Images/HomeScreen/electricmotor.png')}
                                    style={{ width: cardWidth * 0.50, height: 75, alignSelf: 'center', opacity: item?.motorState === true ? 1 : 0.4 }}
                                />
                                <Text style={styles.deviceName}>{item?.deviceName}</Text>
                                <Text style={styles.deviceType}>{item?.deviceType}</Text>
                            </Pressable>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={{ flex: 1, alignItems: 'center', height: height * 0.65, justifyContent: 'center' }}>
                            <Image
                                resizeMode="cover"
                                source={require('../../../Images/HomeScreen/NoDevice.png')}
                                style={styles.noDeviceImg}
                            />
                        </View>
                    } />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardHomeContainer: {
        marginTop: cardGap,
        height: 180,
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: Colors.primary,
        borderWidth: 2,
        padding: 5,
    },
    deviceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deviceName: {
        alignSelf: 'center',
        marginTop: 5,
        letterSpacing: 1,
        fontSize: wp('4'),
        fontWeight: '600'
    },
    deviceType: {
        alignSelf: 'center',
        fontSize: wp('3'),
    },
    pageHeading: {
        fontSize: wp('6.5'),
        fontWeight: '700'
    },
    headerItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center',
        marginVertical: 10
    },
    noDeviceImg: {
        width: width * 0.65,
        height: width * 0.65,
        alignSelf: 'center'
    }
})
