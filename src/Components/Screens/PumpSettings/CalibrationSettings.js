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

export default function CalibrationSettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();

    const [calVoltage, setCalVoltage] = useState(true);
    const [calAmps, setCalAmps] = useState(true);

    const sendHandler = () => {
        navigation.goBack()
    }

    const CalVoltageHandler = () => {
        setCalVoltage(!calVoltage);
    };

    const CalAmpsHandler = () => {
        setCalAmps(!calAmps);
    };

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
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
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
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
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
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
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
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} style={{}} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} style={{}} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
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
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
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
                                    leftIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                                <Text style={styles.leftText}>-</Text>
                                            </Pressable>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                        </View>
                                    }
                                    rightIcon={
                                        <View style={{ flexDirection: 'row' }}>
                                            <Divider orientation="vertical" color={'lightgrey'} />
                                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
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