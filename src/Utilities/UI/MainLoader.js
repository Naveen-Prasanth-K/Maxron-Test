import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet, BackHandler, Text, useWindowDimensions,
    View
} from 'react-native';
import { Colors } from '../GlobalStyles/Colors';
import LottieView from "lottie-react-native";

export default function MainLoader({ visible = false }) {

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        const handleBackPress = () => true;
        if (visible) {
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [visible]);

    return (
        visible && (
            <View style={styles.container}>
                <LottieView
                    source={require("../../Images/HomeScreen/LoaderAnimation2.json")}
                    style={styles.lottie}
                    autoPlay
                    loop
                />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        height: '100%'
    },
    lottie: {
        width: 60,
        height: 60,
        alignSelf: 'center'
    }
});

