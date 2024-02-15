import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native'
import React from 'react';
import { Image } from '@rneui/themed';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

export default function PumpSettingHome({ route }) {

    const navigation = useNavigation();
    const { item } = route.params;

    const VoltageSettingsHandler = (item) => {
        navigation.navigate('VoltageSettings', { item: item })
    }
    const CurrentSettingsHandler = (item) => {
        navigation.navigate('CurrentSettings', { item: item })
    }
    const TimerSettingsHandler = (item) => {
        navigation.navigate('TimerSettings', { item: item })
    }
    const DelaySettingsHandler = (item) => {
        navigation.navigate('DelaySettings', { item: item })
    }
    const ModeSettingsHandler = (item) => {
        navigation.navigate('ModeSettings', { item: item })
    }
    const NumberRegHandler = (item) => {
        navigation.navigate('NumberSettings', { item: item })
    }
    const CalibrationSettings = (item) => {
        navigation.navigate('CalibrationSettings', { item: item })
    }
    const RechargeSettings = (item) => {
        navigation.navigate('RechargeSettings', { item: item })
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Pump Settings</Text>
                <View style={styles.listFlex}>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => VoltageSettingsHandler(item)}
                    >
                        <Image source={require('../../../Images/Settings/Voltage.png')} style={styles.image} />
                        <Text style={styles.topicText}>Voltage Settings</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => CurrentSettingsHandler(item)}
                    >
                        <Image source={require('../../../Images/Settings/Current.png')} style={styles.image} />
                        <Text style={styles.topicText}>Current Settings</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => TimerSettingsHandler(item)}
                    >
                        <Image source={require('../../../Images/Settings/Timer.png')} style={styles.image} />
                        <Text style={styles.topicText}>Timer Settings</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => DelaySettingsHandler(item)}
                    >
                        <Image source={require('../../../Images/Settings/Delay.png')} style={styles.image} />
                        <Text style={styles.topicText}>Delay Settings</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => ModeSettingsHandler(item)}
                    >
                        <Image source={require('../../../Images/Settings/Mode.png')} style={styles.image} />
                        <Text style={styles.topicText}>Mode Settings</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => NumberRegHandler(item)}
                    >
                        <Image source={require('../../../Images/Settings/Number.png')} style={styles.image} />
                        <Text style={styles.topicText}>Number Registration</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => CalibrationSettings(item)}
                    >
                        <Image source={require('../../../Images/Settings/Calibration.png')} style={styles.image} />
                        <Text style={styles.topicText}>Calibration Settings</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.listContainer]}
                        onPress={() => RechargeSettings(item)}
                    >
                        <Image source={require('../../../Images/Settings/payment.png')} style={styles.image} />
                        <Text style={styles.topicText}>Recharge Reminder</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pageHeading: {
        fontSize: wp('6.5'),
        fontWeight: '700',
        margin: 15
    },
    listFlex: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    listContainer: {
        width: screenWidth / 2 * 0.80,
        height: screenWidth / 2 * 0.80,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 8,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
        tintColor: Colors.secondary
    },
    topicText: {
        fontSize: wp('3.5'),
        fontWeight: '400',
        color: Colors.primary
    }
})