import { useNavigation } from '@react-navigation/native';
import { Icon, Image } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Header1 from '../../../Others/Header1';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../../../Others/SearchBar';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WinDimensions } from '../../../../Utilities/GlobalStyles/WinDimension';

const cardGap = 10;

const AddHome = () => {

    const { screenWidth, screenHeight } = WinDimensions();
    const navigation = useNavigation();


    const isLandscape = screenWidth > screenHeight;
    const cardWidth = (screenWidth - cardGap * 5) / (isLandscape ? 4 : 2);

    const CreateDealerHandler = () => {
        navigation.navigate('CreateDealer', { item: "" })
    }
    const CreateDeviceHandler = () => {
        navigation.navigate('AddDevice')
    }
    const CreateCustomerHandler = () => {
        navigation.navigate('CreateCustomer', { item: "" })
    }
    const SellDeviceHandler = () => {
        navigation.navigate('SellDevices')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={CommonStyles.pageContainer}>
                <LinearGradient
                    colors={GradientColor}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 1, y: 0.5 }}
                >
                    <Header1 />
                    <View style={CommonStyles.adminHeader}>
                        <Text style={CommonStyles.welcomeTxt}>Welcome!</Text>
                        <Text style={CommonStyles.adminTxt}>Naveen Prasanth</Text>
                    </View>
                </LinearGradient>
                <View style={styles.wrapper}>
                    <View style={[styles.cardHomeContainer, { width: cardWidth }]}>
                        <Pressable
                            style={({ pressed }) => [pressed && CommonStyles.pressed, styles.deviceContainer]}
                            onPress={() => CreateDealerHandler()}
                        >
                            <Icon
                                type='material'
                                name='people-alt'
                                size={50}
                                color={Colors.secondary}
                            />
                            <Text style={styles.deviceName}>Add Dealer</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.cardHomeContainer, { width: cardWidth }]}>
                        <Pressable
                            style={({ pressed }) => [pressed && CommonStyles.pressed, styles.deviceContainer]}
                            onPress={() => CreateCustomerHandler()}
                        >
                            <Icon
                                type='material-community'
                                name='account'
                                size={50}
                                color={Colors.secondary}
                            />
                            <Text style={styles.deviceName}>Add Customer</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.cardHomeContainer, { width: cardWidth }]}>
                        <Pressable
                            style={({ pressed }) => [pressed && CommonStyles.pressed, styles.deviceContainer]}
                            onPress={() => CreateDeviceHandler()}
                        >
                            <Icon
                                type='material'
                                name='on-device-training'
                                size={50}
                                color={Colors.secondary}
                            />
                            <Text style={styles.deviceName}>Add Device</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.cardHomeContainer, { width: cardWidth }]}>
                        <Pressable
                            style={({ pressed }) => [pressed && CommonStyles.pressed, styles.deviceContainer]}
                            onPress={() => SellDeviceHandler()}
                        >
                            <Icon
                                type='material'
                                name='on-device-training'
                                size={50}
                                color={Colors.secondary}
                            />
                            <Text style={styles.deviceName}>Sell Devices</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddHome

const styles = StyleSheet.create({
    cardHomeContainer: {
        marginTop: cardGap,
        height: 165,
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: Colors.primary,
        borderWidth: 2,
        padding: 5,
    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10
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
})