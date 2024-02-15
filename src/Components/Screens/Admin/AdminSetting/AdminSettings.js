import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Overlay, Button } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../../Others/Header';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import Header1 from '../../../Others/Header1';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminSettings() {

    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const LogoutHandler = () => {
        toggleOverlay()
    }

    const CancelHandler = () => {
        toggleOverlay()
    }

    const AccountManageHandler = () => {
        navigation.navigate('AccountManage')
    }
    const AdminUserHandler = () => {
        navigation.navigate('AdminUser')
    }
    const DeviceOrderHandler = () => {
        navigation.navigate('DeviceOrder')
    }
    const DeviceStockHandler = () => {
        navigation.navigate('StockHome')
    }
    const PinResetHandler = () => {
        navigation.navigate('PinReset')
    }

    return (
        <SafeAreaView style={CommonStyles.pageContainer}>
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
                <Text style={CommonStyles.pageHeading}>Settings</Text>

                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/Profile.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Account Manage</Text>
                            <Text style={styles.subText}>Make changes to your account</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={AccountManageHandler}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/Heart.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Manage Admin Users</Text>
                            <Text style={styles.subText}>Manage employee's roles</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={AdminUserHandler}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/light.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Device Orders</Text>
                            <Text style={styles.subText}>Manage Device Orders</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={DeviceOrderHandler}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                {/* <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/Vector.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Device Stock</Text>
                            <Text style={styles.subText}>Manage Device Stock</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={DeviceStockHandler}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View> */}
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/reset.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Reset PIN</Text>
                            <Text style={styles.subText}>Manage your PIN</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={PinResetHandler}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../../Images/Settings/Logout.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Log out</Text>
                            <Text style={styles.subText}>Logout from your account</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={toggleOverlay}
                    >
                        <Icon
                            type='entypo'
                            name='chevron-right'
                            size={24}
                            color={Colors.primary200}
                            style={styles.rightIcon}
                        />
                    </Pressable>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 25, fontSize: 12 }}>Version-1.0.0</Text>
            </ScrollView>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={CommonStyles.overlayContainer}>
                <Text style={styles.deleteTxt}>Are sure want to logout from your account?</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Cancel"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.secondary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => CancelHandler()}
                    />
                    <Button
                        title="Logout"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.primary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => LogoutHandler()}
                    />
                </View>
            </Overlay>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginHorizontal: 18,
        marginVertical: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subText: {
        fontSize: wp(3.3),
        fontWeight: '300',
        color: Colors.primary100
    },
    mainText: {
        fontSize: wp(4.2),
        fontWeight: '600',
        marginBottom: 3
    },
    rightIcon: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary75
    },
    image: {
        width: wp('7'),
        height: hp('3.5'),
        tintColor: Colors.primary
    },
    imageContainer: {
        padding: 11,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.lightBlue
    },
    ContainerStyle: {
        alignSelf: 'center',
        marginVertical: 10,
        width: wp('30')
    },
    ButtonStyle: {
        borderRadius: 8,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 25
    },
    deleteTxt: {
        marginHorizontal: 15,
        textAlign: 'center',
        marginVertical: 25,
        fontSize: wp('4.5'),
        fontWeight: '400',
    }

})