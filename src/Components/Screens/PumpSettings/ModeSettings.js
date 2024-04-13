import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Divider, Button, Icon } from '@rneui/themed';
import HeaderCommon from '../../Others/HeaderCommon';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Switch from '../../../Utilities/UI/Switch';

export default function ModeSettings({ route }) {

    const { item } = route.params;
    const navigation = useNavigation();
    //console.log(`ModeSettings Data - ${JSON.stringify(item)}`)
    const [iotOrsms, setIotOrsms] = useState(item?.iotOrsms);
    const [smsFeedback, setSmsFeedback] = useState(item?.smsFeedback);
    const [pushNotifications, setPushNotifications] = useState(item?.pushNotifications);
    const [autoOrManual, setAutoOrManual] = useState(item?.autoOrManual);
    const [float, setFloat] = useState(item?.float)

    const sendHandler = () => {
        navigation.goBack()
    }

    const iotOrsmsToggle = () => {
        const newValue = iotOrsms === 'IOT' ? 'SMS' : 'IOT';
        setIotOrsms(newValue);
    };
    const smsFeedbackHandler = () => {
        setSmsFeedback(!smsFeedback);
    };
    const pushNotificationsHandler = () => {
        setPushNotifications(!pushNotifications);
    };
    const autoOrManualHandler = () => {
        const newValue = autoOrManual === 'Manual' ? 'Auto' : 'Manual';
        setAutoOrManual(newValue);
    };
    const floatHandler = () => {
        setFloat(!float);
    };

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Mode Settings</Text>
                <Text style={styles.pageHeading}>IOT / SMS</Text>
                <View style={[styles.headingContainer, { backgroundColor: iotOrsms === 'SMS' ? '#EBF3FF' : '#ffe6df' }]}>
                    <Text style={styles.iotText}>IOT</Text>
                    <Switch value={iotOrsms === 'SMS'} dualType={true} onToggle={iotOrsmsToggle} />
                    <Text style={styles.iotText}>SMS</Text>
                </View>
                <Divider color={Colors.primary100} style={{ marginHorizontal: 15, marginVertical: 25, marginTop: 40 }} />
                <View style={CommonStyles.actionContainer}>
                    <Text style={styles.actionText}>Float</Text>
                    <Switch value={float} onToggle={floatHandler} />
                </View>
                <View style={CommonStyles.actionContainer}>
                    <Text style={styles.actionText}>SMS Feedback</Text>
                    <Switch value={smsFeedback} onToggle={smsFeedbackHandler} />
                </View>
                <View style={CommonStyles.actionContainer}>
                    <Text style={styles.actionText}>Push Notifications</Text>
                    <Switch value={pushNotifications} onToggle={pushNotificationsHandler} />
                </View>
                <Divider color={Colors.primary100} style={{ marginHorizontal: 15, marginVertical: 25 }} />
                <Text style={styles.pageHeading}>Auto/Manual</Text>
                <View style={[styles.headingContainer, { backgroundColor: autoOrManual === 'Auto' ? '#EBF3FF' : '#ffe6df', marginBottom: 30 }]}>
                    <Text style={styles.iotText}>IOT</Text>
                    <Switch value={autoOrManual === 'Auto'} dualType={true} onToggle={autoOrManualHandler} />
                    <Text style={styles.iotText}>Device</Text>
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
        fontSize: wp('5'),
        fontWeight: '500',
        margin: 15,
        color: Colors.primary
    },
    headingContainer: {
        marginHorizontal: 15,
        borderRadius: 15,
        paddingHorizontal: 25,
        paddingVertical: 25,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iotText: {
        fontSize: wp('5'),
        fontWeight: '500',
    },
    actionText: {
        fontSize: wp(4.5),
        fontWeight: '500',
    },
})