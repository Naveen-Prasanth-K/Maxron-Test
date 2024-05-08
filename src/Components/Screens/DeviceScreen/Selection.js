import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ToggleButton from "react-native-toggle-element";
import { Icon } from '@rneui/themed';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import Switch from '../../../Utilities/UI/Switch';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { commonDateFormat, commonTimeFormat } from '../../../Utilities/Constant/Common';
export default function Selection({ item , autoStatusUpdate, twoPhaseStatusUpdate }) {

    const [autoMode, setAutoMode] = useState(item?.autoMode);
    const [twoPhase, setTwoPhase] = useState(item?.twoPhase);

    const AutoModeHandler = () => {
        setAutoMode(!autoMode);
        autoStatusUpdate(!autoMode);
    };

    const TwoPhaseHandler = () => {
        setTwoPhase(!twoPhase);
        twoPhaseStatusUpdate(!twoPhase)
    };
    return (
        <View>
            <View style={styles.actionContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.actionText}>Auto</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Switch value={autoMode} onToggle={AutoModeHandler} />
                </View>
                <View style={{ flexDirection: 'row', flex: 2 }}>
                    <Icon
                        reverse
                        type='font-awesome'
                        name='plug'
                        color={'#7DBDBD'}
                        size={15}
                    />
                    <View >
                        <Text style={styles.lastText1}>Last On Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={styles.lastTextTime}>{commonTimeFormat(item?.lastOnDateTime)} / </Text>
                            <Text style={styles.lastTextDate}>{commonDateFormat(item?.lastOnDateTime)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.actionText}>2 Phase</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Switch value={twoPhase} onToggle={TwoPhaseHandler} />
                </View>
                <View style={{ flexDirection: 'row', flex: 2 }}>
                    <Icon
                        reverse
                        type='material-community'
                        name='lightning-bolt'
                        color={"#ff6897"}
                        size={15}
                    />
                    <View >
                        <Text style={styles.lastText1}>Last Off Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={styles.lastTextTime}>{commonTimeFormat(item?.lastOffDateTime)} / </Text>
                            <Text style={styles.lastTextDate}>{commonDateFormat(item?.lastOffDateTime)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginRight: 10,
        paddingLeft: 10

    },
    actionText: {
        fontSize: wp(4.5),
        fontWeight: '500',
    },
    lastText1: {
        fontSize: wp(4.2),
        fontWeight: '500',
        color: Colors.primary250
    },
    lastTextTime: {
        fontSize: wp(4.2),
        fontWeight: '700',
    },
    lastTextDate: {
        fontSize: wp(3),
    }
})