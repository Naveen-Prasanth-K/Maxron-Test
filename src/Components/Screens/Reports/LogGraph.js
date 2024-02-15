import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart, YAxis, XAxis } from 'react-native-chart-kit';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function LogGraph() {

    const rVoltage = [
        { x: 0, y: Math.random() * 500 },
        { x: 8, y: Math.random() * 500 },
        { x: 13, y: Math.random() * 500 },
        { x: 22, y: Math.random() * 500 },
        { x: 24, y: Math.random() * 500 },
    ];

    const yVoltage = [
        { x: 0, y: Math.random() * 500 },
        { x: 8, y: Math.random() * 500 },
        { x: 13, y: Math.random() * 500 },
        { x: 22, y: Math.random() * 500 },
        { x: 24, y: Math.random() * 500 },
    ];
    const bVoltage = [
        { x: 0, y: Math.random() * 500 },
        { x: 8, y: Math.random() * 500 },
        { x: 13, y: Math.random() * 500 },
        { x: 22, y: Math.random() * 500 },
        { x: 24, y: Math.random() * 500 },
    ];

    const rAmps = [
        { x: 1, y: Math.random() },
        { x: 8, y: Math.random() },
        { x: 13, y: Math.random() },
        { x: 22, y: Math.random() },
        { x: 24, y: Math.random() },
    ];

    const yAmps = [
        { x: 1, y: Math.random() },
        { x: 8, y: Math.random() },
        { x: 13, y: Math.random() },
        { x: 22, y: Math.random() },
        { x: 24, y: Math.random() },
    ];
    const bAmps = [
        { x: 1, y: Math.random() },
        { x: 8, y: Math.random() },
        { x: 13, y: Math.random() },
        { x: 22, y: Math.random() },
        { x: 24, y: Math.random() },
    ];

    return (
        <>
            <View>
                <View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.graphHeading}>Voltage Log</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.circle, { backgroundColor: 'red' }]} />
                                <Text>R</Text>
                                <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={[styles.circle, { backgroundColor: 'yellow' }]} />
                                    <Text>Y</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.circle, { backgroundColor: 'blue' }]} />
                                    <Text>B</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <LineChart
                    data={{
                        labels: ['1', '8', '13', '22', '24'],
                        datasets: [
                            {
                                data: rVoltage.map((item) => item.y),
                                color: () => 'red'
                            },
                            {
                                data: yVoltage.map((item) => item.y),
                                color: () => 'yellow'
                            },
                            {
                                data: bVoltage.map((item) => item.y),
                                color: () => 'blue'
                            }
                        ]
                    }}
                    width={wp('100%')}
                    height={200}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    chartConfig={{
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 0,
                        color: () => `rgba(169, 113, 113, 1)`,
                        labelColor: () => `rgba(0, 0, 0, 0.5)`,
                    }}
                />
                <Text style={styles.timeTxt}>Time</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 35 }}>
                <View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.graphHeading}>Amps Log</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.circle, { backgroundColor: 'red' }]} />
                                <Text>R</Text>
                                <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={[styles.circle, { backgroundColor: 'yellow' }]} />
                                    <Text>Y</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.circle, { backgroundColor: 'blue' }]} />
                                    <Text>B</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <LineChart
                    data={{
                        labels: ['1', '8', '13', '22', '24'],
                        datasets: [
                            {
                                data: rAmps.map((item) => item.y),
                                color: () => 'red'
                            },
                            {
                                data: yAmps.map((item) => item.y),
                                color: () => 'yellow'
                            },
                            {
                                data: bAmps.map((item) => item.y),
                                color: () => 'blue'
                            }
                        ]
                    }}
                    width={wp('100%')}
                    height={200}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    chartConfig={{
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 1,
                        color: () => `rgba(169, 113, 113, 1)`,
                        labelColor: () => `rgba(0, 0, 0, 0.5)`,
                    }}
                />
                <Text style={styles.timeTxt}>Time</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20
    },
    timeTxt: {
        textAlign: 'center',
        fontSize: wp(3),
        color: 'grey'
    },
    graphHeading: {
        fontSize: wp(4.5),
        fontWeight: '600',

    },
    circle: {
        width: wp('5.2'),
        height: wp('5.2'),
        borderWidth: 1,
        borderRadius: wp('5.2') / 2,
        marginHorizontal: 3
    },
});
