
import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';
import CheckBox from 'react-native-check-box'

export default function ListDevice3({ item , selectedDevice }) {

    const navigation = useNavigation();

    const ActivateHandler = (item) => {
        navigation.navigate('ActivateDevice')
    }

    const [isChecked, setIsChecked] = useState(false);
    const checkBoxStatusUpdate = (_id, status) =>{
        setIsChecked(status);
        selectedDevice(_id, status)
    }

    return (
        <Pressable
            style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]}
            onPress={() => ActivateHandler()}
        >
            <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.devicenameTxt}>{item?.scanQR}
                </Text>
                <Text style={styles.nameTxt} >{item?.IMEI}</Text>
            </View>
            <Image style={styles.image}
                source={require('../../Images/Admin/DeviceImg.png')}
            />
            <CheckBox
                style={{ alignSelf: 'center' }}
                onClick={() => checkBoxStatusUpdate(item?._id, !isChecked)}
                isChecked={isChecked}
                checkBoxColor={Colors.secondary}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    devicenameTxt: {
        fontSize: wp('5'),
        fontWeight: '700',
        color: Colors.primary
    },
    nameContainer: {
        marginTop: 8
    },
    nameTxt: {
        fontSize: wp('3.5'),
        color: Colors.primary200
    },
    cardContainer: {
        marginBottom: 15,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5
    },
    image: {
        width: wp('25'),
        height: hp('8')
    },
})