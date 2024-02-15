import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../../Others/Header';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button, Overlay } from '@rneui/themed';
import Switch from '../../../../Utilities/UI/Switch';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';
import { WinDimensions } from '../../../../Utilities/GlobalStyles/WinDimension';


const { width, height } = Dimensions.get('window');

const DealerInfo = ({ route }) => {

    const { item } = route.params;
    const navigation = useNavigation();
    const { screenWidth, screenHeight } = WinDimensions();

    const [userActive, setUserActive] = useState(item?.customerStatus)
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const userHandler = () => {
        setUserActive(!userActive);
    };

    const CreateDealerHandler = (item) => {
        navigation.navigate('CreateDealer', { item: item })
    }

    const DeleteDealer = () => {
        toggleOverlay()
    }

    const CancelHandler = () => {
        toggleOverlay()
    }

    return (
        <>
            <View style={CommonStyles.pageContainer}>
                <Header />
                <ScrollView>
                    <Text style={CommonStyles.pageHeading}>Dealer Info</Text>
                    <View style={styles.headerItemContainer}>
                        <View style={styles.container}>
                            <View  >
                                <Image
                                    source={require('../../../../Images/Profile/usericon.png')}
                                    style={styles.uploadPic}
                                />
                            </View>
                            <View style={{ marginLeft: 30 }}>
                                <Text style={styles.userID}>{item?.customerName}</Text>
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
                                <View style={styles.locationContainer}>
                                    <Icon
                                        type='entypo'
                                        name='mobile'
                                        size={15}
                                        style={{ marginRight: 5 }}
                                        color={Colors.secondary}
                                    />
                                    <Text style={styles.nameTxt}>{item?.mobileNo}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.text1}>Edit Dealer Info</Text>
                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}
                                onPress={() => CreateDealerHandler(item)}
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
                        <View style={styles.rowContainer}>
                            <Text style={styles.text1}>Dealer Status</Text>
                            <Switch value={userActive} onToggle={() => userHandler} />
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.text1}>Delete Dealer</Text>
                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}
                                onPress={toggleOverlay}
                            >
                                <Icon
                                    type='material'
                                    name='logout'
                                    size={22}
                                    style={{ marginRight: 0 }}
                                    color={Colors.secondary}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.bottomSubCon}>
                                <Text style={styles.bigTxt}>{item?.totalPurchased}</Text>
                                <Text style={styles.smallTxt}>Total Purchased</Text>
                            </View>
                            <View style={styles.bottomSubCon}>
                                <Text style={styles.bigTxt}>{item?.soldDevices}</Text>
                                <Text style={styles.smallTxt}>Sold Devices</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 40 }}>
                            <View style={styles.bottomSubCon}>
                                <Text style={styles.bigTxt}>{item?.replacedDevices}</Text>
                                <Text style={styles.smallTxt}>Replaced Devices</Text>
                            </View>
                            <View style={styles.bottomSubCon}>
                                <Text style={styles.bigTxt}>{item?.unsoldDevices}</Text>
                                <Text style={styles.smallTxt}>Unsold Devices</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={CommonStyles.overlayContainer}>
                <Text style={styles.deleteTxt}>Are sure want to delete your
                    Dealers account?
                    Its not able to recover again</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="No"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.secondary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => CancelHandler()}
                    />
                    <Button
                        title="Yes"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={[styles.ButtonStyle, { backgroundColor: Colors.primary }]}
                        containerStyle={styles.ContainerStyle}
                        onPress={() => DeleteDealer()}
                    />
                </View>
            </Overlay>
        </>
    )
}

export default DealerInfo

const styles = StyleSheet.create({
    uploadPic: {
        width: wp(26),
        height: wp(26),
        borderRadius: 100,
        justifyContent: 'center'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 35,
    },
    userID: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '600',
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
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    nameTxt: {
        fontSize: wp('3.5'),
        color: Colors.primary200
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

    ContainerStyle: {
        alignSelf: 'center',
        marginVertical: 10,
        width: wp('30')
    },
    ButtonStyle: {
        borderRadius: 8,
        height: hp('5%'),
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