import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';
import Switch from '../../../Utilities/UI/Switch';

export default function SettingsScreen() {

    const navigation = useNavigation();
    const [notification, setNotification] = useState(true);

    const NotificationHandler = () => {
        setNotification(!notification);
    };
    const AccountManageHandler = () => {
        navigation.navigate('AccountManage')
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <ScrollView>
                <Text style={[CommonStyles.pageHeading, { marginTop: 50 }]}>Settings</Text>
                <View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                    source={require('../../../Images/Settings/Profile.png')}
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
                                    source={require('../../../Images/Settings/Lock.png')}
                                />
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={styles.mainText}>Notification</Text>
                                <Text style={styles.subText}>Manage your device notifications</Text>
                            </View>
                        </View>
                        <Switch value={notification} onToggle={NotificationHandler} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../Images/Settings/Logout.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Log out</Text>
                            <Text style={styles.subText}>Logout from your account</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
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
                <Text style={CommonStyles.pageHeading}>More</Text>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image}
                                source={require('../../../Images/Settings/Frame.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>Help & Support</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
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
                                source={require('../../../Images/Settings/Heart.png')}
                            />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.mainText}>About App</Text>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
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
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        paddingHorizontal: 5,
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
    },
    imageContainer: {
        padding: 11,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.lightBlue
    }

})