import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Timer from '../../Others/Timer';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';

export default function DelaySettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();
    //console.log(`DelaySettings Data - ${JSON.stringify(item)}`)

    const [showPicker, setShowPicker] = useState(false);
    const [pickerSetting, setPickerSetting] = useState(null);

    const [onRelayTime, setOnRelayTime] = useState(item?.onRelayTime);
    const [starToDeltaTime, setStarToDeltaTime] = useState(item?.starToDeltaTime);
    const [onDelayTime, setOnDelayTime] = useState(item?.onDelayTime);
    const [powerOnDelayTime, setPowerOnDelayTime] = useState(item?.powerOnDelayTime);

    const openPicker = (setting) => {
        setShowPicker(true);
        setPickerSetting(setting);
    };

    const onRelayTimeTimeHandler = (time) => {
        setOnRelayTime(time);
        setShowPicker(false);
    };

    const starToDeltaTimeHandler = (time) => {
        setStarToDeltaTime(time);
        setShowPicker(false);
    };
    const onDelayTimeHandler = (time) => {
        setOnDelayTime(time);
        setShowPicker(false);
    };
    const powerOnDelayTimeHandler = (time) => {
        setPowerOnDelayTime(time);
        setShowPicker(false);
    };

    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Delay Settings</Text>
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='material-community'
                            name='clock-time-eight-outline'
                            color='white'
                            size={wp('7')}
                            containerStyle={[styles.iconContainer, { backgroundColor: '#9B51E0' }]}
                        />
                        <Text style={styles.heading}>On Relay Time</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, { alignItems: 'center' }]}
                        onPress={() => openPicker('onRelayTime')}>
                        <Text style={styles.timeText}>{onRelayTime.seconds}</Text>
                        <Text style={styles.secText}>Seconds</Text>
                        <Timer
                            onTimeSelected={onRelayTimeTimeHandler}
                            initialDuration={onRelayTime}
                            isVisible={showPicker && pickerSetting === 'onRelayTime'}
                            hideHour={true}
                            hideMin={true}
                            modalTitle="On Relay Time"
                        />
                    </Pressable>
                </View>
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='material-community'
                            name='clock-time-eight-outline'
                            color='white'
                            size={wp('7')}
                            containerStyle={[styles.iconContainer, { backgroundColor: '#FD5B71' }]}
                        />
                        <Text style={styles.heading}>SCR Time</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => pressed && CommonStyles.pressed}
                        onPress={() => openPicker('starToDeltaTime')}>
                        <Text style={styles.timeText}>{starToDeltaTime.seconds}</Text>
                        <Text style={styles.secText}>Seconds</Text>
                        <Timer
                            onTimeSelected={starToDeltaTimeHandler}
                            initialDuration={starToDeltaTime}
                            isVisible={showPicker && pickerSetting === 'starToDeltaTime'}
                            hideHour={true}
                            hideMin={true}
                            modalTitle="Star to Delta Time"
                        />
                    </Pressable>
                </View>
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='material-community'
                            name='clock-time-eight-outline'
                            color='white'
                            size={wp('7')}
                            containerStyle={[styles.iconContainer, { backgroundColor: '#07E092' }]}
                        />
                        <Text style={styles.heading}>On Delay</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, { flexDirection: 'row' }]}
                        onPress={() => openPicker('onDelayTime')}>
                        <View>
                            <Text style={styles.timeText}>{onDelayTime.minutes}</Text>
                            <Text style={styles.secText}>Minutes</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View>
                            <Text style={styles.timeText}>{onDelayTime.seconds}</Text>
                            <Text style={styles.secText}>Seconds</Text>
                        </View>
                        <Timer
                            onTimeSelected={onDelayTimeHandler}
                            initialDuration={onDelayTime}
                            isVisible={showPicker && pickerSetting === 'onDelayTime'}
                            hideHour={true}
                            modalTitle="On Delay Time"
                        />
                    </Pressable>
                </View>
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='material-community'
                            name='clock-time-eight-outline'
                            color='white'
                            size={wp('7')}
                            containerStyle={[styles.iconContainer, { backgroundColor: '#065438' }]}
                        />
                        <Text style={styles.heading}>Power On Delay</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, { flexDirection: 'row' }]}
                        onPress={() => openPicker('powerOnDelayTime')}>
                        <View>
                            <Text style={styles.timeText}>{powerOnDelayTime.minutes}</Text>
                            <Text style={styles.secText}>Minutes</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View>
                            <Text style={styles.timeText}>{powerOnDelayTime.seconds}</Text>
                            <Text style={styles.secText}>Seconds</Text>
                        </View>
                        <Timer
                            onTimeSelected={powerOnDelayTimeHandler}
                            initialDuration={powerOnDelayTime}
                            isVisible={showPicker && pickerSetting === 'powerOnDelayTime'}
                            hideHour={true}
                            modalTitle="Power On Delay Time"
                        />
                    </Pressable>
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
    )
}

const styles = StyleSheet.create({
    headingContainer: {
        marginHorizontal: 15,
        marginBottom: 20,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        elevation: 1,
        backgroundColor: '#FFEEEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    heading: {
        fontSize: wp('4.2'),
        fontWeight: '500',
    },
    timeText: {
        fontSize: wp('9.5'),
        fontWeight: '500',
        color: Colors.primary200
    },
    colon: {
        fontSize: wp('9.5'),
        fontWeight: '500',
        color: Colors.primary200
    },
    secText: {
        fontSize: wp('3'),
        fontWeight: '400',
        marginTop: -5,
        color: Colors.primary200
    },
    iconContainer: {
        paddingHorizontal: wp('2'),
        paddingVertical: wp('2'),
        borderRadius: wp('50'),
        alignItems: 'center',
        alignContent: 'center',
        marginRight: 15
    }
})