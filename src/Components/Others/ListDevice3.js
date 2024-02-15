
import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';

export default function ListDevice3({ item }) {

    const navigation = useNavigation();

    const ActivateHandler = (item) => {
        navigation.navigate('ActivateDevice')
    }

    return (
        <Pressable
            style={({ pressed }) => [pressed && CommonStyles.pressed, styles.cardContainer]}
            onPress={() => ActivateHandler()}
        >
            <View style={{ justifyContent: 'space-between' }}>
                <Text style={styles.devicenameTxt}>{item?.deviceName}
                </Text>
                <Text style={styles.nameTxt} >{item?.IMEI}</Text>
            </View>
            <Image style={styles.image}
                source={require('../../Images/Admin/DeviceImg.png')}
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