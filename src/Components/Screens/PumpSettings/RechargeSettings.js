import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import Timer from '../../Others/Timer';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import Switch from '../../../Utilities/UI/Switch';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';
import DateInput from '../../Others/DateInput';

export default function RechargeSettings() {

    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState("")

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const sendHandler = () => {
        navigation.goBack()
    }


    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Recharge Reminder</Text>
                <Text style={styles.subText}>Enter your bill details below, so we can notify you in time for upcoming bills.</Text>
                <DateInput onDateChange={handleDateChange} />
                <View style={styles.actionContainer1}>
                    <Text style={styles.headTxt}>Validity Days</Text>
                    <View>
                        <Input
                            placeholder='Days'
                            containerStyle={styles.containerStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            keyboardType='numeric'
                            maxLength={3}
                        />
                    </View>
                </View>
                <View style={styles.actionContainer}>
                    <Text style={styles.headTxt}>Will expire On</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='ionicons'
                            name='notifications'
                            size={24}
                            style={{ marginRight: 5 }}
                            color={Colors.secondary}
                        />
                        <Text style={styles.dateTxt}>12-12-2023</Text>
                    </View>
                </View>
                <Button
                    title="Send"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    subText: {
        fontSize: wp(3.7),
        fontWeight: '400',
        marginHorizontal: 15,
        color: Colors.primary200,
    },
    actionContainer: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 80
    },
    actionContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    containerStyle: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        borderRadius: 5,
        height: hp('5'),
        width: wp('40'),
        backgroundColor: Colors.primary60,
    },
    inputContainerStyle: {
        height: hp('5'),
        alignContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0
    },
    inputStyle: {
        marginHorizontal: 5,
        fontSize: hp('1.6%'),
    },
    headTxt: {
        fontSize: 18,
    },
    dateTxt: {
        fontSize: 18,
    }
});
