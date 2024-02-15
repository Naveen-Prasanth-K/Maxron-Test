import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Divider } from '@rneui/themed';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';

export default function ThreePhase({ item }) {

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.subContainer, { borderColor: 'red' }]}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText1}>RY</Text>
                    <Text style={styles.headerText2}>{item?.RYVolt}</Text>
                </View>
                <Divider style={{ borderColor: 'red', opacity: 0.5 }} />
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText1}>AMP R</Text>
                    <Text style={styles.footerText1}>{item?.ampR}</Text>
                </View>
            </View>
            <View style={[styles.subContainer, { borderColor: 'yellow' }]}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText1}>YB</Text>
                    <Text style={styles.headerText2}>{item?.YBVolt}</Text>
                </View>
                <Divider style={{ borderColor: 'yellow' }} />
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText1}>AMP Y</Text>
                    <Text style={styles.footerText1}>{item?.ampY}</Text>
                </View>
            </View>
            <View style={[styles.subContainer, { borderColor: Colors.blue }]}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText1}>BR</Text>
                    <Text style={styles.headerText2}>{item?.BRVolt}</Text>
                </View>
                <Divider style={{ borderColor: Colors.blue, opacity: 0.5 }} />
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText1}>AMP B</Text>
                    <Text style={styles.footerText1}>{item?.ampB}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginHorizontal: 10
    },
    subContainer: {
        width: wp('90') / 3,
        height: wp('90') / 3,
        borderWidth: 2,
        padding: 15,
        borderRadius: 20,
        justifyContent: 'space-around',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText1: {
        fontSize: wp(6),
        fontWeight: '800'
    },
    headerText2: {
        fontSize: wp(6),
        fontWeight: '400'
    },
    footerText1: {
        fontSize: wp(3.5),
        fontWeight: '400'
    },
    footerText2: {
        fontSize: wp(3.5),
        fontWeight: '400'
    }
})