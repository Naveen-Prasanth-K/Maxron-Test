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
import Store from "../../../Utilities/Store/Store";
export default function CalibrationSettings({ route }) {
    const { formData, onChange } = route.params;
    const navigation = useNavigation();
    const [bodyData, setBodyData] = useState(formData)
    const [calVoltage, setCalVoltage] = useState(formData?.calVoltage);
    const [calAmps, setCalAmps] = useState(formData?.calAmps);
    // Send Handler
    const sendHandler =async () => {
        const bodyDatas = {
            _id : formData?._id,
            RYVolt : bodyData?.RYVolt  ,
            YBVolt : bodyData?.YBVolt,
            BRVolt : bodyData?.BRVolt,
            ampR: bodyData?.ampR,
            ampY :bodyData?.ampY ,
            ampB: bodyData?.ampB,
            calVoltage: bodyData?.calVoltage,
            calAmps: bodyData?.calAmps
        }
        await Store?.updateDeviceData(bodyDatas, "Calibration Settings")
        navigation.goBack()
    }

    const CalVoltageHandler = () => {
        setCalVoltage(!calVoltage);
        setBodyData({ ...bodyData, calVoltage: !calVoltage });
        onChange("calVoltage", !calVoltage);
    };

    const CalAmpsHandler = () => {
        setCalAmps(!calAmps);
        setBodyData({ ...bodyData, calAmps: !calAmps });
        onChange("calAmps", !calAmps);
    };
    // On Change Handler
    const onChangeHandler = (name, value) =>{
        setBodyData({ ...bodyData, [name]: value });
        onChange(name, value);
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Calibration Settings</Text>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Voltage</Text>
                    <Switch value={calVoltage} onToggle={CalVoltageHandler} />
                </View>
                <Collapsible collapsed={!calVoltage} duration={500}>
                    <Animatable.View
                        duration={600}
                        animation={calVoltage ? 'zoomIn' : 'zoomOut'}
                    >
                        <View style={styles.actionContainer1}>
                            <Text>RY</Text>
                            <View>
                                <Input
                                    placeholder='Voltage'
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle}
                                    placeholderTextColor={Colors.primary100}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={bodyData.RYVolt.toString()}
                                    onChangeText={(value) => { onChangeHandler("RYVolt", value) }}
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("RYVolt", bodyData?.RYVolt-1)}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("RYVolt", bodyData?.RYVolt+1) }>
                                                <Text style={styles.rightText}>+</Text>
                                            </Pressable>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.actionContainer1}>
                            <Text>YB</Text>
                            <View>
                                <Input
                                    placeholder='Voltage'
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle}
                                    placeholderTextColor={Colors.primary100}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={bodyData.YBVolt.toString()}
                                    onChangeText={(value) => { onChangeHandler("YBVolt", value) }}
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("YBVolt", bodyData?.YBVolt-1) }>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("YBVolt", bodyData?.YBVolt+1) }>
                                                <Text style={styles.rightText}>+</Text>
                                            </Pressable>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.actionContainer1}>
                            <Text>BR</Text>
                            <View>
                                <Input
                                    placeholder='Voltage'
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle}
                                    placeholderTextColor={Colors.primary100}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={bodyData.BRVolt.toString()}
                                    onChangeText={(value) => { onChangeHandler("BRVolt", value) }}
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("BRVolt", bodyData?.BRVolt-1) }>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("BRVolt", bodyData?.BRVolt+1) }>
                                                <Text style={styles.rightText}>+</Text>
                                            </Pressable>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </Animatable.View>
                </Collapsible>
                <View style={styles.actionContainer}>
                    <Text style={styles.actionText}>Amps</Text>
                    <Switch value={calAmps} onToggle={CalAmpsHandler} />
                </View>
                <Collapsible collapsed={!calAmps} duration={500}>
                    <Animatable.View
                        duration={600}
                        animation={calAmps ? 'zoomIn' : 'zoomOut'}
                    >
                        <View style={styles.actionContainer1}>
                            <Text>R</Text>
                            <View>
                                <Input
                                    placeholder='Amps'
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle}
                                    placeholderTextColor={Colors.primary100}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={bodyData.ampR.toString()}
                                    onChangeText={(value) => { onChangeHandler("ampR", value) }}
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("ampR", bodyData?.ampR-1) }>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} style={{}} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} style={{}} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("ampR", bodyData?.ampR+1) }>
                                                <Text style={styles.rightText}>+</Text>
                                            </Pressable>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.actionContainer1}>
                            <Text>Y</Text>
                            <View>
                                <Input
                                    placeholder='Amps'
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle}
                                    placeholderTextColor={Colors.primary100}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={bodyData.ampY.toString()}
                                    onChangeText={(value) => { onChangeHandler("ampY", value) }}
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("ampY", bodyData?.ampY-1) }>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("ampY", bodyData?.ampY+1) }>
                                                <Text style={styles.rightText}>+</Text>
                                            </Pressable>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                        <View style={styles.actionContainer1}>
                            <Text>B</Text>
                            <View>
                                <Input
                                    placeholder='Amps'
                                    containerStyle={styles.containerStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    inputStyle={styles.inputStyle}
                                    placeholderTextColor={Colors.primary100}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    value={bodyData.ampB.toString()}
                                    onChangeText={(value) => { onChangeHandler("ampB", value) }}
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("ampB", bodyData?.ampB-1) }>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed} onPress={() => onChangeHandler("ampB", bodyData?.ampB+1) }>
                                                <Text style={styles.rightText}>+</Text>
                                            </Pressable>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
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
        fontSize: wp(4.5),
        fontWeight: '500',
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
    actionContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    leftText: {
        fontSize: 18,
        marginRight: 12,
        marginLeft: 5
    },
    rightText: {
        fontSize: 18,
        marginLeft: 10
    }

})