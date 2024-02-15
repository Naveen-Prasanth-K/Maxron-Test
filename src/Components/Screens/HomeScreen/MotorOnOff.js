import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react';
import OnAnimation from './OnAnimation';

const { width, height } = Dimensions.get('window');

export default function MotorOnOff({ motorState }) {

    return (
        <View style={styles.container}>
            {motorState === true &&
                <View style={styles.animationContainer}>
                    <OnAnimation />
                </View>
            }
            <Image
                resizeMode="cover"
                source={require('../../../Images/HomeScreen/mainmotor.png')}
                style={[styles.Img, { opacity: motorState === true ? 1 : 0.6 }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    Img: {
        width: width * 0.4,
        height: width * 0.40,
    },

    animationContainer: {
        position: 'absolute',
    },
})