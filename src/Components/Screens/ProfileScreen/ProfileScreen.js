import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';

export default function ProfileScreen() {

    return (
        <View style={CommonStyles.pageContainer}>
            <ScrollView>
                <Text style={[CommonStyles.pageHeading, { marginTop: 50 }]}>Profile</Text>
                <View style={styles.container}>
                    <View  >
                        <Image
                            source={require('../../../Images/Profile/usericon.png')}
                            style={styles.uploadPic}
                        />
                    </View>
                    <Text style={styles.userID}>User ID</Text>
                </View>
                <View>
                    <View style={{ marginTop: 40 }}>
                        <Input
                            label='Name'
                            labelStyle={styles.labelStyle}
                            placeholder='Name'
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            value='Naveen Prasanth'
                            disabled
                        />
                        <Input
                            label='Address'
                            labelStyle={styles.labelStyle}
                            placeholder='Adress'
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            value='1234 NW Bobcat Lane, St. Robert, MO 65584-5678'
                            disabled
                            multiline
                        />
                        <Input
                            label='Mobile No'
                            labelStyle={styles.labelStyle}
                            placeholder='Mobile No'
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            value='8940352877'
                            disabled
                            maxLength={10}
                            keyboardType='number-pad'
                            leftIcon={
                                <Text style={styles.inputStyle}>+91</Text>
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    uploadPic: {
        width: wp(26),
        height: wp(26),
        borderRadius: 100,
        marginTop: 20,
    },
    container: {
        height: wp(60),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    userID: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10
    },
    inputContainerStyle: {
        borderColor: Colors.primary75,
        borderBottomWidth: 1,
        alignSelf: 'center',
        height: hp('6.5%'),
        width: '95%',
        borderRadius: 8,
    },
    inputStyle: {
        marginHorizontal: 10,
        fontSize: hp('1.7%'),
        height: wp('6.5%'),
    },
    labelStyle: {
        fontSize: wp(4.5),
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 20
    },
})