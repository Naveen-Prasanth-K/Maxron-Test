import { useNavigation } from '@react-navigation/native';
import { Icon, Image } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../Utilities/Data/DummyData';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles, GradientColor } from '../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../Utilities/GlobalStyles/WinDimension';
import Header1 from '../../Others/Header1';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../../Others/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Store from '../../../Utilities/Store/Store';

export default function AdminHome() {
    const navigation = useNavigation();
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

                <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]}>
                    <View>
                        <Image style={styles.image}
                            source={require('../../../Images/HomeScreen/AvailableDevice.png')}
                        />
                        <Text style={styles.text1}>Available Devices</Text>
                    </View>
                    <Text style={styles.text2}>605</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]} onPress={() => navigation.navigate('SoldDevices')}>
                    <View>
                        <Image style={styles.image}
                            source={require('../../../Images/HomeScreen/sold.png')}
                        />
                        <Text style={styles.text1}>Sold Devices</Text>
                    </View>
                    <Text style={styles.text2}>6558</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]} onPress={() => navigation.navigate('UnSoldDevices')}>
                    <View>
                        <Image style={styles.image}
                            source={require('../../../Images/HomeScreen/unsold.png')}
                        />
                        <Text style={styles.text1}>Unsold Devices From Dealers</Text>
                    </View>
                    <Text style={styles.text2}>68</Text>
                </Pressable>
                {
                    Store?.screen == 'Admin' ?
                        <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]}
                            onPress={() => navigation.navigate('AdminDealerHome')}
                        >
                            <View>
                                <Image style={styles.image}
                                    source={require('../../../Images/HomeScreen/Dealers.png')}
                                />
                                <Text style={styles.text1}>Dealers</Text>
                            </View>
                            <Text style={styles.text2}>68</Text>
                        </Pressable> : ''
                }
                <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer, { marginBottom: 100 }]} onPress={() => navigation.navigate('CustomerList')}>
                    <View>
                        <Image style={styles.image}
                            source={require('../../../Images/HomeScreen/customers.png')}
                        />
                        <Text style={styles.text1}>Customers</Text>
                    </View>
                    <Text style={styles.text2}>68</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginTop: 20,
        marginBottom: 0,
        padding: 25,
        borderRadius: 20,
        backgroundColor: Colors.lightBlue,
        elevation: 5,
        alignItems: 'center'
    },
    image: {
        width: wp('12'),
        height: wp('12'),
    },
    text1: {
        fontSize: wp('3.5'),
        fontWeight: '400',
        color: Colors.primary100,
        marginTop: 10,
    },
    text2: {
        fontSize: wp('8'),
        fontWeight: '800',
    }
})