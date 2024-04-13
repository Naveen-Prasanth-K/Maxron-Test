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

const { width, height } = Dimensions.get('window');

const DealerProfile = () => {

    const navigation = useNavigation()
    const CreateDealerHandler = () => {
        navigation.navigate('CreateDealer')
    }

    return (
        <SafeAreaView style={CommonStyles.pageContainer}>
            <ScrollView>


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
                <View style={styles.container}>
                    <View  >
                        <Image
                            source={require('../../../../Images/Profile/usericon.png')}
                            style={styles.uploadPic}
                        />
                    </View>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={styles.userID}>Naveen Prasanth</Text>
                        <View style={styles.locationContainer}>
                            <Icon
                                type='entypo'
                                name='location-pin'
                                size={18}
                                style={{ marginRight: 5 }}
                                color={Colors.secondary}
                            />
                            <Text style={styles.nameTxt}>Erode</Text>
                        </View>
                        <View style={styles.locationContainer}>
                            <Icon
                                type='entypo'
                                name='mobile'
                                size={15}
                                style={{ marginRight: 5 }}
                                color={Colors.secondary}
                            />
                            <Text style={styles.nameTxt}>8940352877</Text>
                        </View>

                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.text1}>Edit Info</Text>
                    <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={() => CreateDealerHandler()}
                    >
                        <Icon
                            type='font-awesome'
                            name='edit'
                            size={22}
                            style={{ marginRight: 0 }}
                            color={Colors.secondary}
                        />
                    </Pressable>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.bottomSubCon}>
                            <Text style={styles.bigTxt}>35</Text>
                            <Text style={styles.smallTxt}>Total Purchased</Text>
                        </View>
                        <View style={styles.bottomSubCon}>
                            <Text style={styles.bigTxt}>25</Text>
                            <Text style={styles.smallTxt}>Sold Devices</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 40 }}>
                        <View style={styles.bottomSubCon}>
                            <Text style={styles.bigTxt}>15</Text>
                            <Text style={styles.smallTxt}>Replaced Devices</Text>
                        </View>
                        <View style={styles.bottomSubCon}>
                            <Text style={styles.bigTxt}>28</Text>
                            <Text style={styles.smallTxt}>Unsold Devices</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DealerProfile

const styles = StyleSheet.create({
    uploadPic: {
        width: wp(26),
        height: wp(26),
        borderRadius: 100,
        justifyContent: 'center'
    },
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 35,
    },
    userID: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '600',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
        padding: 15,
        borderRadius: 8
    },
    text1: {
        fontSize: wp('4.5'),
        fontWeight: '700',
        color: Colors.primary
    },
    text2: {
        fontSize: wp('4'),
        fontWeight: '400',
        color: Colors.primary
    },
    bottomContainer: {
        backgroundColor: Colors.blue,
        height: height / 2.3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomSubCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallTxt: {
        fontSize: wp('3.5'),
        color: 'white',
        fontWeight: '300'
    },
    bigTxt: {
        fontSize: wp('18'),
        color: 'white',
        fontWeight: '700'
    },
})