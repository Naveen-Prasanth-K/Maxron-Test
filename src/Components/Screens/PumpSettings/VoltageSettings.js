import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Divider, Button } from '@rneui/themed';
import HeaderCommon from '../../Others/HeaderCommon';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Store from '../../../Utilities/Store/Store';

export default function VoltageSettings({ route }) {

    const { formData, onChange } = route.params;
    const [bodyData, setBodyData] = useState(formData)
    const navigation = useNavigation();
    // console.log(`Voltage Settings Data - ${JSON.stringify(formData)}`);
    const sendHandler =async () => {
        const bodyDatas = {
            _id : formData?._id,
            threeLowVolt : bodyData?.threeLowVolt  ,
            threeHighVolt : bodyData?.threeHighVolt,
            threeImbalanceVolt : bodyData?.threeImbalanceVolt,
            twoLowVolt: bodyData?.twoLowVolt,
            twoHighVolt: bodyData?.twoHighVolt,
            twoImbalanceVolt: bodyData?.twoImbalanceVolt
        }
        await Store?.updateDeviceData(bodyDatas, "Voltage Settings")
        navigation.goBack()
    }

    const onChangeHandler = (name, value) =>{
        setBodyData({ ...bodyData, [name]: value });
        onChange(name, value);
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Voltage Settings</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.text1}>3 Phase Low Voltage </Text>
                    <Input
                        placeholder='Voltage'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        value={bodyData.threeLowVolt.toString()}
                        onChangeText={(value) => { onChangeHandler("threeLowVolt", value) }}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={Colors.primary75} style={{ marginRight: 10 }} />
                                <Text>Volt</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text1}>3 Phase High Voltage </Text>
                    <Input
                        placeholder='Voltage'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        value={bodyData.threeHighVolt.toString()}
                        onChangeText={(value) => { onChangeHandler("threeHighVolt", value) }}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={Colors.primary75} style={{ marginRight: 10 }} />
                                <Text>Volt</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text1}>3 Phase Imbalance Voltage </Text>
                    <Input
                        placeholder='Voltage'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        value={bodyData.threeImbalanceVolt.toString()}
                        onChangeText={(value) => { onChangeHandler("threeImbalanceVolt", value) }}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={Colors.primary75} style={{ marginRight: 10 }} />
                                <Text>Volt</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text1}>2 Phase Low Voltage </Text>
                    <Input
                        placeholder='Voltage'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        value={bodyData.twoLowVolt.toString()}
                        onChangeText={(value) => { onChangeHandler("twoLowVolt", value) }}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={Colors.primary75} style={{ marginRight: 10 }} />
                                <Text>Volt</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text1}>2 Phase High Voltage </Text>
                    <Input
                        placeholder='Voltage'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        value={bodyData.twoHighVolt.toString()}
                        onChangeText={(value) => { onChangeHandler("twoHighVolt", value) }}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={Colors.primary75} style={{ marginRight: 10 }} />
                                <Text>Volt</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text1}>2 Phase Imbalance Voltage </Text>
                    <Input
                        placeholder='Voltage'
                        containerStyle={styles.containerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        maxLength={3}
                        value={bodyData.twoImbalanceVolt.toString()}
                        onChangeText={(value) => { onChangeHandler("twoImbalanceVolt", value) }}
                        rightIcon={
                            <View style={{ flexDirection: 'row' }}>
                                <Divider orientation="vertical" color={Colors.primary75} style={{ marginRight: 10 }} />
                                <Text>Volt</Text>
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
    text1: {
        fontWeight: '400',
        fontSize: hp('1.9%'),
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 15
    }

})