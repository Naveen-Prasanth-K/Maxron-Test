import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Divider, Button } from '@rneui/themed';
import HeaderCommon from '../../Others/HeaderCommon';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function VoltageSettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();
    //console.log(`Voltage Settings Data - ${JSON.stringify(item)}`)

    const sendHandler = () => {
        navigation.goBack()
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