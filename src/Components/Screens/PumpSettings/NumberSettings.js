import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Timer from '../../Others/Timer';
import { CommonStyles, GradientColor } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import Switch from '../../../Utilities/UI/Switch';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NumberSettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();
    const [permission, setPermission] = useState(item?.permission);

    const sendHandler = () => {
        navigation.goBack()
    }
    const permissionHandler = () => {
        setPermission(!permission);
    };

    //console.log(`NumberSettings = ${JSON.stringify(item)}`)

    return (
        <View View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView >
                <Text style={CommonStyles.pageHeading}>Number Registration</Text>
                <View >
                    <Input
                        label="Device Mobile Number"
                        labelStyle={styles.labelStyle}
                        placeholder='Device Mobile Number *'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                    />
                    <Input
                        label="Master Mobile Number"
                        labelStyle={styles.labelStyle}
                        placeholder='Master Mobile Number *'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                    />
                </View>
                <Text style={[CommonStyles.pageHeading, { marginTop: 0 }]}>Add Numbers</Text>
                <Input
                    label="Name"
                    labelStyle={styles.labelStyle}
                    placeholder='User Name *'
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType='default'
                />
                <Input
                    label="Mobile"
                    labelStyle={styles.labelStyle}
                    placeholder='Mobile No *'
                    inputContainerStyle={styles.inputContainerStyle}
                    inputStyle={styles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType='numeric'
                />
                <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, { flexDirection: 'row', justifyContent: 'center' }]}>
                    <Icon
                        type='ionicon'
                        name='add-circle'
                        size={48}
                        color={Colors.primary}
                        style={{ marginRight: 10 }}
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 18 }}>Add Mobile</Text>
                </Pressable>
                <Divider color={Colors.primary100} style={{ marginHorizontal: 15, marginVertical: 20 }} />
                <Text style={[CommonStyles.pageHeading, { marginTop: 0 }]}>Numbers</Text>
                {
                    item?.numbers.map((item, index) => {
                        return (
                            <LinearGradient
                                colors={GradientColor}
                                start={{ x: 0.5, y: 0.5 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.numberContainer}
                                key={index}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <View style={styles.useNameContainer}>
                                        <Text style={styles.userName}>User Name</Text>
                                        <Text style={styles.mobileNo}>+91 {item?.mobileNo}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                        <View style={{ marginRight: 15, marginTop: 20 }}>
                                            <Switch value={item?.permission} onToggle={permissionHandler} activeColor={'orange'} />
                                        </View>
                                        <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.removeContainer]}>
                                            <Text style={styles.removeText}>Remove</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </LinearGradient>
                        )
                    })
                }
                <Button
                    title="Save"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    numberContainer: {
        marginHorizontal: 15,
        height: hp(14),
        borderRadius: 25,
        marginBottom: 25
    },
    inputContainerStyle: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        alignSelf: 'center',
        height: hp('5.5%'),
        width: '95%',
        borderRadius: 5,
        backgroundColor: Colors.primary60,
        marginBottom: -10
    },
    inputStyle: {
        marginHorizontal: 15,
        fontSize: hp('1.6'),
        height: wp('5.5%'),
    },
    labelStyle: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
        marginHorizontal: 15
    },
    removeContainer: {
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: Colors.primary100,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 10
    },
    removeText: {
        color: 'white'
    },
    useNameContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    mobileNo: {
        fontSize: hp(2.7),
        color: 'white',
        fontWeight: '600'
    },
    userName: {
        fontSize: hp(1.5),
        color: 'white',
        fontWeight: '300'
    }
})