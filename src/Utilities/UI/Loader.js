import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet, BackHandler, Text, useWindowDimensions,
    View
} from 'react-native';
import { Colors } from '../GlobalStyles/Colors';
import AnimatedLoader from "react-native-animated-loader";

export default function Loader({ visible = false }) {

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
        <AnimatedLoader
            visible={visible}
            overlayColor="rgba(0,0,0,0.5)"
            animationStyle={style.lottie}
            speed={0.8}>
        </AnimatedLoader>
    );
};

const style = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 60,
        height: 60
    }
});

