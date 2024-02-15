import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function LogGraph() {

    const rVoltage = [
        { x: 1, y: 230 },
        { x: 8, y: 200 },
        { x: 13, y: 345 },
        { x: 22, y: 250 }
    ]

    const yVoltage = [
        { x: 1, y: 430 },
        { x: 5, y: 200 },
        { x: 8, y: 345 },
        { x: 22, y: 450 }
    ]
    const bVoltage = [
        { x: 1, y: 650 },
        { x: 5, y: 300 },
        { x: 8, y: 455 },
        { x: 22, y: 750 }
    ]

    const rAmps = [
        { x: 1, y: 0.3 },
        { x: 8, y: 0.8 },
        { x: 13, y: 0.1 },
        { x: 22, y: 0.2 }
    ]

    const yAmps = [
        { x: 1, y: 0.1 },
        { x: 5, y: 0.5 },
        { x: 8, y: 0.3 },
        { x: 22, y: 0.8 }
    ]
    const bAmps = [
        { x: 1, y: 0.5 },
        { x: 5, y: 0.8 },
        { x: 8, y: 0.2 },
        { x: 22, y: 0.8 }
    ]


    return (
        <>
            <View style={{ marginHorizontal: 10 }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text style={styles.graphHeading}>Voltage Log</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.circle, { backgroundColor: Colors.red }]} />
                                    <Text>R</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={[styles.circle, { backgroundColor: Colors.yellow }]} />
                                    <Text>Y</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.circle, { backgroundColor: Colors.blue }]} />
                                    <Text>B</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Chart
                    style={{ height: 250, width: '100%', backgroundColor: 'white' }}
                    xDomain={{ min: 0, max: 24 }}
                    yDomain={{ min: 100, max: 1000 }}
                    padding={{ left: 30, top: 10, bottom: 20, right: 10 }}
                >
                    <HorizontalAxis tickCount={8} includeOriginTick={false} theme={HorizontalTheme} />
                    <VerticalAxis tickValues={[100, 300, 500, 700, 900]} theme={VerticalTheme} />
                    <Line data={rVoltage} smoothing="none" theme={{ stroke: { color: Colors.red, width: 2 } }} />
                    <Line data={yVoltage} smoothing="none" theme={{ stroke: { color: Colors.blue, width: 2 } }} />
                    <Line data={bVoltage} smoothing="none" theme={{ stroke: { color: Colors.yellow, width: 3 } }} />
                </Chart>
                <Text style={styles.timeTxt}>Time</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 35 }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text style={styles.graphHeading}>Amps Log</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.circle, { backgroundColor: Colors.red }]} />
                                    <Text>R</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                    <View style={[styles.circle, { backgroundColor: Colors.yellow }]} />
                                    <Text>Y</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={[styles.circle, { backgroundColor: Colors.blue }]} />
                                    <Text>B</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Chart
                    style={{ height: 250, width: '100%', backgroundColor: 'white' }}
                    xDomain={{ min: 0, max: 24 }}
                    yDomain={{ min: 0, max: 1 }}
                    padding={{ left: 30, top: 10, bottom: 20, right: 10 }}
                >
                    <HorizontalAxis tickCount={8} includeOriginTick={false} theme={HorizontalTheme} />
                    <VerticalAxis tickValues={[0, 0.2, 0.4, 0.6, 0.8]} theme={VerticalTheme} />
                    <Line data={rAmps} smoothing="none" theme={{ stroke: { color: Colors.red, width: 2 } }} />
                    <Line data={yAmps} smoothing="none" theme={{ stroke: { color: Colors.blue, width: 2 } }} />
                    <Line data={bAmps} smoothing="none" theme={{ stroke: { color: Colors.yellow, width: 3 } }} />
                </Chart>
                <Text style={styles.timeTxt}>Time</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    timeTxt: {
        textAlign: 'center',
        fontSize: wp(3),
        color: Colors.primary250
    },
    graphHeading: {
        fontSize: wp(4.5),
        fontWeight: '600',
        marginHorizontal: 10
    },
    circle: {
        width: wp('5.2'),
        height: wp('5.2'),
        borderWidth: 1,
        borderRadius: wp('5.2') / 2,
        marginHorizontal: 3
    },
})

const VerticalTheme = {
    axis: {
        visible: true,
        stroke: {
            color: '#bbb',
            width: 2,
            opacity: 1,
            dashArray: [],
        },
        dx: 0,
    },
    grid: {
        visible: true,
        stroke: {
            color: '#ccc',
            width: 1,
            opacity: 1,
            dashArray: [],
        },
    },
    ticks: {
        visible: false,
        stroke: {
            color: '#000',
            width: 1,
            opacity: 1,
        },
        dx: 0,
        length: 6,
    },
    labels: {
        visible: true,
        label: {
            color: '#000',
            fontSize: 10,
            fontWeight: 300,
            textAnchor: 'end',
            opacity: 1,
            dx: -4,
            dy: 4,
            rotation: 0,
            fontFamily: 'your font here'
        },
    }
}

const HorizontalTheme = {
    axis: {
        visible: true,
        stroke: {
            color: '#bbb',
            width: 2,
            opacity: 1,
            dashArray: []
        },
        dy: 0,
    },
    grid: {
        visible: true,
        stroke: {
            color: '#ccc',
            width: 1,
            opacity: 1,
            dashArray: []
        },
    },
    ticks: {
        visible: false,
        stroke: {
            color: '#000',
            width: 1,
            opacity: 1,
        },
        dy: 0,
        length: 6,
        includeOriginTick: false,
    },
    labels: {
        visible: true,
        label: {
            color: '#000',
            fontSize: 10,
            fontWeight: 300,
            textAnchor: 'middle',
            opacity: 1,
            dx: 0,
            dy: -12,
            rotation: 0,
        },
    },
}