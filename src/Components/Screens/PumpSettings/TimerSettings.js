import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Timer from '../../Others/Timer';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Divider, Button } from '@rneui/themed';
import Switch from '../../../Utilities/UI/Switch';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';

export default function TimerSettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();

    const [showPicker, setShowPicker] = useState(false);
    const [pickerSetting, setPickerSetting] = useState(null);

    const [cyclicTimer, setCyclicTimer] = useState(item?.cyclicTimer);
    const [onCyclicTimer, setOnCyclicTimer] = useState(item?.onCyclicTimer);
    const [offCyclicTimer, setOffCyclicTimer] = useState(item?.offCyclicTimer);

    const [dryRunRestart, setDryRunRestart] = useState(item?.dryRunRestart);
    const [dryRunRestartTime, setDryRunRestartTime] = useState(item?.dryRunRestartTime);

    const [overloadRestart, setOverloadRestart] = useState(item?.overloadRestart);
    const [overloadRestartTime, setOverloadRestartTime] = useState(item?.overloadRestartTime);

    const [maxRun, setMaxRun] = useState(item?.maxRun);
    const [maxRunTime, setMaxRunTime] = useState(item?.maxRunTime);

    const [roomLight, setRoomLight] = useState(item?.roomLight);
    const [onRoomLightTime, setOnRoomLightTime] = useState(item?.onRoomLightTime);
    const [offRoomLightTime, setOffRoomLightTime] = useState(item?.offRoomLightTime);

    const [rtc, setRtc] = useState(item?.rtc);
    // const [rtcOnTime, setRtcOnTime] = useState(item?.rtcOnTime);
    // const [rtcOffTime, setRtcOffTime] = useState(item?.rtcOffTime);
    const [timers, setTimers] = useState([{
        rtcOnTime: { hours: 0, minutes: 0 },
        rtcOffTime: { hours: 0, minutes: 0 }
    }]);

    const addTimer = () => {
        if (timers.length < 9) {
            setTimers([...timers, {
                rtcOnTime: { hours: 0, minutes: 0 },
                rtcOffTime: { hours: 0, minutes: 0 }
            }]);
        } else {
            Alert.alert('Message', 'You cannot add more than 9 timers.', [
                { text: 'OK' },
            ])
        }
    };

    const removeTimer = (index) => {
        const updatedTimers = [...timers];
        updatedTimers.splice(index, 1);
        setTimers(updatedTimers);
    };

    const rtcOnTimeHandler = (time, index) => {
        const updatedTimers = [...timers];
        updatedTimers[index].rtcOnTime = time;
        setTimers(updatedTimers);
        setShowPicker(false);
    };

    const rtcOFFTimeHandler = (time, index) => {
        const updatedTimers = [...timers];
        updatedTimers[index].rtcOffTime = time;
        setTimers(updatedTimers);
        setShowPicker(false);
    };

    const openPicker = (setting) => {
        setShowPicker(true);
        setPickerSetting(setting);
    };

    const sendHandler = () => {
        navigation.goBack()
    }

    const CyclicTimerHandler = () => {
        setCyclicTimer(!cyclicTimer)
    };
    const onCyclicTimerHandler = (time) => {
        setOnCyclicTimer(time);
        setShowPicker(false);
    };
    const offCyclicTimerHandler = (time) => {
        setOffCyclicTimer(time);
        setShowPicker(false);
    };

    const DryRunRestartHandler = () => {
        setDryRunRestart(!dryRunRestart)
    };
    const dryRunRestartTimerHandler = (time) => {
        setDryRunRestartTime(time);
        setShowPicker(false);
    };

    const OverloadRestartHandler = () => {
        setOverloadRestart(!overloadRestart)
    };
    const overloadRestartTimeHandler = (time) => {
        setOverloadRestartTime(time);
        setShowPicker(false);
    };

    const MaxRunHandler = () => {
        setMaxRun(!maxRun)
    };
    const maxRunTimeHandler = (time) => {
        setMaxRunTime(time);
        setShowPicker(false);
    };
    const RoomLightHandler = () => {
        setRoomLight(!roomLight)
    };
    const onRoomLightTimeHandler = (time) => {
        setOnRoomLightTime(time);
        setShowPicker(false);
    };
    const offRoomLightTimeHandler = (time) => {
        setOffRoomLightTime(time);
        setShowPicker(false);
    };
    const RTCHandler = () => {
        setRtc(!rtc)
    };

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView >
                <Text style={CommonStyles.pageHeading}>Timer Settings</Text>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Cyclic Timer</Text>
                    <Switch value={cyclicTimer} onToggle={CyclicTimerHandler} />
                </View>
                <Collapsible collapsed={!cyclicTimer} duration={500}
                    animation={cyclicTimer ? 'zoomIn' : 'zoomOut'}>
                    <Animatable.View style={styles.timerContainer}
                        duration={600}
                        easing="ease-out"
                        animation={cyclicTimer ? 'zoomIn' : 'zoomOut'}>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>On Time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('onCyclicTimer')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{onCyclicTimer.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{onCyclicTimer.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={onCyclicTimerHandler}
                                        initialDuration={onCyclicTimer}
                                        isVisible={showPicker && pickerSetting === 'onCyclicTimer'}
                                        hideSec={true}
                                        modalTitle="Cyclic Timer On"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>Off Time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('offCyclicTimer')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{offCyclicTimer.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{offCyclicTimer.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={offCyclicTimerHandler}
                                        initialDuration={offCyclicTimer}
                                        isVisible={showPicker && pickerSetting === 'offCyclicTimer'}
                                        hideSec={true}
                                        modalTitle="Cyclic Timer Off"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                    </Animatable.View>
                </Collapsible>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Dry run restart time</Text>
                    <Switch value={dryRunRestart} onToggle={DryRunRestartHandler} />
                </View>
                <Collapsible collapsed={!dryRunRestart} duration={500}
                    animation={dryRunRestart ? 'zoomIn' : 'zoomOut'}>
                    <Animatable.View style={styles.timerContainer}
                        duration={600}
                        easing="ease-out"
                        animation={dryRunRestart ? 'zoomIn' : 'zoomOut'}>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>Restart Time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('dryRunRestartTime')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{dryRunRestartTime.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{dryRunRestartTime.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={dryRunRestartTimerHandler}
                                        initialDuration={dryRunRestartTime}
                                        isVisible={showPicker && pickerSetting === 'dryRunRestartTime'}
                                        hideSec={true}
                                        modalTitle="Dry run restart time"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                    </Animatable.View>
                </Collapsible>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Overload restart time</Text>
                    <Switch value={overloadRestart} onToggle={OverloadRestartHandler} />
                </View>
                <Collapsible collapsed={!overloadRestart} duration={500}
                    animation={overloadRestart ? 'zoomIn' : 'zoomOut'}>
                    <Animatable.View style={styles.timerContainer}
                        duration={600}
                        easing="ease-out"
                        animation={overloadRestart ? 'zoomIn' : 'zoomOut'}>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>Restart Time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('overloadRestartTime')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{overloadRestartTime.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{overloadRestartTime.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={overloadRestartTimeHandler}
                                        initialDuration={overloadRestartTime}
                                        isVisible={showPicker && pickerSetting === 'overloadRestartTime'}
                                        hideSec={true}
                                        modalTitle="Overload restart time"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                    </Animatable.View>
                </Collapsible>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Maximum run time</Text>
                    <Switch value={maxRun} onToggle={MaxRunHandler} />
                </View>
                <Collapsible collapsed={!maxRun} duration={500}
                    animation={maxRun ? 'zoomIn' : 'zoomOut'}>
                    <Animatable.View style={styles.timerContainer}
                        duration={600}
                        easing="ease-out"
                        animation={maxRun ? 'zoomIn' : 'zoomOut'}>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>Max run time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('maxRunTime')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{maxRunTime.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{maxRunTime.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={maxRunTimeHandler}
                                        initialDuration={maxRunTime}
                                        isVisible={showPicker && pickerSetting === 'maxRunTime'}
                                        hideSec={true}
                                        modalTitle="Max run time"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                    </Animatable.View>
                </Collapsible>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Room light time</Text>
                    <Switch value={roomLight} onToggle={RoomLightHandler} />
                </View>
                <Collapsible collapsed={!roomLight} duration={500}
                    animation={roomLight ? 'zoomIn' : 'zoomOut'}>
                    <Animatable.View style={styles.timerContainer}
                        duration={600}
                        easing="ease-out"
                        animation={roomLight ? 'zoomIn' : 'zoomOut'}>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>On Time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('onRoomLightTime')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{onRoomLightTime.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{onRoomLightTime.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={onRoomLightTimeHandler}
                                        initialDuration={onRoomLightTime}
                                        isVisible={showPicker && pickerSetting === 'onRoomLightTime'}
                                        hideSec={true}
                                        modalTitle="Room light time On"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                        <Animatable.View
                            style={styles.timerSubContainer}>
                            <Animatable.Text style={styles.onTimeText}>Off Time</Animatable.Text>
                            <Animatable.Text style={styles.onTimeText}>:</Animatable.Text>
                            <Animatable.View>
                                <Pressable
                                    style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                    onPress={() => openPicker('offRoomLightTime')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={styles.timeText}>{offRoomLightTime.hours}</Text>
                                        <Text style={styles.secText}>HH</Text>
                                        <Text style={styles.timeText}>:</Text>
                                        <Text style={styles.timeText}>{offRoomLightTime.minutes}</Text>
                                        <Text style={styles.secText}>MM</Text>
                                    </View>
                                    <Timer
                                        onTimeSelected={offRoomLightTimeHandler}
                                        initialDuration={offRoomLightTime}
                                        isVisible={showPicker && pickerSetting === 'offRoomLightTime'}
                                        hideSec={true}
                                        modalTitle="Room light time Off"
                                    />
                                </Pressable>
                            </Animatable.View>
                        </Animatable.View>
                    </Animatable.View>
                </Collapsible>
                <Divider color={Colors.primary100} style={{ marginHorizontal: 15, marginTop: 25 }} />
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>RTC Timer</Text>
                    <Switch value={rtc} onToggle={RTCHandler} />
                </View>
                <Collapsible collapsed={!rtc} duration={500}
                    animation={rtc ? 'zoomIn' : 'zoomOut'} >
                    <Animatable.View duration={600}
                        easing="ease-out"
                        animation={rtc ? 'zoomIn' : 'zoomOut'}
                    >
                        {
                            timers.map((timer, index) => (
                                <View key={index}>
                                    <Text style={styles.timeNo}>Timer {index + 1}</Text>
                                    <View style={styles.timerMainContainer}>

                                        <View style={[styles.timerContainer, { flex: 2 }]}>
                                            <View
                                                style={styles.timerSubContainer}>
                                                <Text style={styles.onTimeText}>On Time</Text>
                                                <Text style={styles.onTimeText}>:</Text>
                                                <View>
                                                    <Pressable
                                                        style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                                        onPress={() => openPicker('rtcOnTime')}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                                            <Text style={styles.timeText}>{timer.rtcOnTime.hours}</Text>
                                                            <Text style={styles.secText}>HH</Text>
                                                            <Text style={styles.timeText}>:</Text>
                                                            <Text style={styles.timeText}>{timer.rtcOnTime.minutes}</Text>
                                                            <Text style={styles.secText}>MM</Text>
                                                        </View>
                                                        <Timer
                                                            onTimeSelected={(selectedTime) => rtcOnTimeHandler(selectedTime, index)}
                                                            initialDuration={timer.rtcOnTime}
                                                            isVisible={showPicker && pickerSetting === 'rtcOnTime'}
                                                            hideSec={true}
                                                            modalTitle="RTC on time"
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.timerSubContainer}>
                                                <Text style={styles.onTimeText}>Off Time</Text>
                                                <Text style={styles.onTimeText}>:</Text>
                                                <View>
                                                    <Pressable
                                                        style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                                                        onPress={() => openPicker('rtcOffTime')}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                                            <Text style={styles.timeText}>{timer.rtcOffTime.hours}</Text>
                                                            <Text style={styles.secText}>HH</Text>
                                                            <Text style={styles.timeText}>:</Text>
                                                            <Text style={styles.timeText}>{timer.rtcOffTime.minutes}</Text>
                                                            <Text style={styles.secText}>MM</Text>
                                                        </View>
                                                        <Timer
                                                            onTimeSelected={(selectedTime) => rtcOFFTimeHandler(selectedTime, index)}
                                                            initialDuration={timer.rtcOffTime}
                                                            isVisible={showPicker && pickerSetting === 'rtcOffTime'}
                                                            hideSec={true}
                                                            modalTitle="RTC Time off"
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
                                        <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => removeTimer(index)}>
                                            <Icon
                                                type='ant-design'
                                                name='closecircle'
                                                size={28}
                                                color={Colors.secondary}
                                                style={{ marginRight: 20 }}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            ))
                        }
                    </Animatable.View>
                    <Animatable.View style={{ marginBottom: 30 }} duration={600}
                        easing="ease-out"
                        animation={rtc ? 'zoomIn' : 'zoomOut'} >
                        <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={addTimer}>
                            <Icon
                                type='ionicon'
                                name='add-circle'
                                size={48}
                                color={Colors.primary}
                                style={{ marginLeft: 8 }}
                            />
                            <Text style={{ alignSelf: 'center', fontSize: 18 }}>Add Timer</Text>
                        </Pressable>
                    </Animatable.View>
                </Collapsible>
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
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20
    },
    actionText: {
        fontSize: wp(5),
        fontWeight: '500',
    },
    timeText: {
        fontSize: wp('5.5'),
        fontWeight: '500',
    },
    secText: {
        fontSize: wp('3'),
        fontWeight: '400',
    },
    timerSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timerContainer: {
        marginHorizontal: 30,
        padding: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: '#EBF3FF',
    },
    timerMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25
    },
    onTimeText: {
        fontSize: wp('4'),
        fontWeight: '400',
    },
    timeNo: {
        fontSize: wp('4'),
        fontWeight: '400',
        marginHorizontal: 30
    }
})