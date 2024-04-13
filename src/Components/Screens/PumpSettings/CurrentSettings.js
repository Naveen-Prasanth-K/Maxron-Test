import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
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

export default function CurrentSettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();
    //console.log(`CurrentSettings Data - ${JSON.stringify(item)}`)

    const [showPicker, setShowPicker] = useState(false);
    const [pickerSetting, setPickerSetting] = useState(null);

    const [dryScan, setDryScan] = useState(item?.dryRunScan);
    const [dryScanTime, setDryScanTime] = useState(item?.dryRunScanTime);

    const [overLoadScan, setOverLoadScan] = useState(item?.overLoadScan);
    const [overLoadTime, setOverLoadTime] = useState(item?.overLoadScanTime);

    const dryScanTimeHandler = (time) => {
        setDryScanTime(time);
        setShowPicker(false);
    };

    const overLoadTimeHandler = (time) => {
        setOverLoadTime(time);
        setShowPicker(false);
    };

    const openPicker = (setting) => {
        setShowPicker(true);
        setPickerSetting(setting);
    };

    const DryRunScanHandler = () => {
        setDryScan(!dryScan);
    };

    const OverLoadScanHandler = () => {
        setOverLoadScan(!overLoadScan);
    };

    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Current Settings</Text>
                <Text style={[styles.pageHeading, { color: Colors.primary }]}>Dry Run Settings</Text>
                <View style={styles.headingContainer}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={24}
                                style={{ marginRight: 15 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.heading}>Dry run Scan Time</Text>
                        </View>
                        <Pressable
                            style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                            onPress={() => openPicker('dryScanTime')}>
                            <Text style={styles.timeText}>{dryScanTime.seconds}</Text>
                            <Text style={styles.secText}>Seconds</Text>
                            <Timer
                                onTimeSelected={dryScanTimeHandler}
                                initialDuration={dryScanTime}
                                isVisible={showPicker && pickerSetting === 'dryScanTime'}
                                hideHour={true}
                                hideMin={true}
                                modalTitle="Dry run scan time"
                            />
                        </Pressable>

                    </View>
                    <View style={{ borderLeftWidth: 3, borderColor: Colors.primary75 }}>
                        <Switch value={dryScan} onToggle={DryRunScanHandler} />
                    </View>
                </View>
                <View style={styles.inputOptionContainer}>
                    <Text>3 Phase Dry Run Amps </Text>
                    <Input
                        placeholder='amp'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={'black'} style={{ marginRight: 10 }} />
                                <Text>Amp</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.inputOptionContainer}>
                    <Text>2 Phase Dry Run Amps</Text>

                    <Input
                        placeholder='amp'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={'black'} style={{ marginRight: 10 }} />
                                <Text>Amp</Text>
                            </View>
                        }
                    />
                </View>
                <Text style={[styles.pageHeading, { color: Colors.primary }]}>Overload Settings</Text>
                <View style={[styles.headingContainer, { backgroundColor: Colors.lightOrange }]}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={24}
                                style={{ marginRight: 15 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.heading}>Overload Scan Time</Text>
                        </View>
                        <Pressable
                            style={({ pressed }) => [pressed && CommonStyles.pressed, { alignSelf: 'flex-start', alignItems: 'center', marginLeft: 35 }]}
                            onPress={() => openPicker('overLoadTime')}>
                            <Text style={styles.timeText}>{overLoadTime.seconds}</Text>
                            <Text style={styles.secText}>Seconds</Text>
                            <Timer
                                onTimeSelected={overLoadTimeHandler}
                                initialDuration={overLoadTime}
                                isVisible={showPicker && pickerSetting === 'overLoadTime'}
                                hideHour={true}
                                hideMin={true}
                                modalTitle="Over Load Time"
                            />
                        </Pressable>
                    </View>
                    <View style={{ borderLeftWidth: 3, borderColor: Colors.primary75 }}>
                        <Switch value={overLoadScan} onToggle={OverLoadScanHandler} />
                    </View>
                </View>
                <View
                    style={styles.inputOptionContainer}>
                    <Text>Overload Restart Count</Text>
                    <Input
                        placeholder='Count'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={'black'} style={{ marginRight: 10 }} />
                                <Text>Count</Text>
                            </View>
                        }
                    />
                </View>
                <View
                    style={styles.inputOptionContainer}>
                    <Text>3 Phase Over load Amps</Text>
                    <Input
                        placeholder='amp'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={'black'} style={{ marginRight: 10 }} />
                                <Text>Amp</Text>
                            </View>
                        }
                    />
                </View>
                <View
                    style={styles.inputOptionContainer}>
                    <Text>2 Phase Over load  Amps  </Text>
                    <Input
                        placeholder='amp'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={'black'} style={{ marginRight: 10 }} />
                                <Text>Amp</Text>
                            </View>
                        }
                    />
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
    pageHeading: {
        fontSize: wp('6'),
        fontWeight: '700',
        margin: 15
    },
    heading: {
        fontSize: wp('5'),
        fontWeight: '500',
    },
    headingContainer: {
        marginHorizontal: 15,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 15,
        elevation: 1,
        backgroundColor: Colors.lightBlue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timeText: {
        fontSize: wp('9.5'),
        fontWeight: '500',
    },
    secText: {
        fontSize: wp('3'),
        fontWeight: '400',
        marginTop: -5,
    },
    inputOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 25
    },
    containerStyle: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        borderRadius: 5,
        height: hp('5'),
        width: wp('35'),
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
})
