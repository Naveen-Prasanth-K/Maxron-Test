import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Image } from '@rneui/themed';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Store from '../../../Utilities/Store/Store';

const screenWidth = Dimensions.get("window").width;

export default function PumpSettingHome({ route }) {

    const navigation = useNavigation();
    const { item } = route.params;
    const [formData, setFormData] = useState(item);

    const onChange = (name, value) =>{
        setFormData({ ...formData, [name]: value });
    }

    useEffect(()=>{
            Store?.getActiveDeviceNumberFilterData(0,0,0,0,0,0,item?._id, 0)
    },[])

    
    const VoltageSettingsHandler = (item) => {
        navigation.navigate('VoltageSettings', { formData: formData , onChange: onChange })
    }
    const CurrentSettingsHandler = (item) => {
        navigation.navigate('CurrentSettings', { formData: formData , onChange: onChange })
    }
    const TimerSettingsHandler = (item) => {
        navigation.navigate('TimerSettings', { formData: formData , onChange: onChange })
    }
    const DelaySettingsHandler = (item) => {
        navigation.navigate('DelaySettings', { formData: formData , onChange: onChange })
    }
    const ModeSettingsHandler = (item) => {
        navigation.navigate('ModeSettings', { formData: formData , onChange: onChange })
    }
    const NumberRegHandler = (item) => {
        navigation.navigate('NumberSettings', { formData: formData , onChange: onChange })
    }
    const CalibrationSettings = (item) => {
        navigation.navigate('CalibrationSettings', { formData: formData , onChange: onChange })
    }
    const RechargeSettings = (item) => {
        navigation.navigate('RechargeSettings', { formData: formData , onChange: onChange })
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
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