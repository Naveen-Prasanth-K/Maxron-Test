import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

export default function Loader1() {

    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../Images/HomeScreen/LoaderAnimation2.json")}
                style={styles.lottie}
                autoPlay
                loop
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
    },
    lottie: {
        width: 60,
        height: 60,
        alignSelf: 'center'
    }
});

