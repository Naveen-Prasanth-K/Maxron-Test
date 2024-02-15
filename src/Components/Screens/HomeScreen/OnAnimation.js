import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
    interpolate,
} from "react-native-reanimated";
import { Colors } from "../../../Utilities/GlobalStyles/Colors";

const Ring = ({ delay }) => {
    const ring = useSharedValue(0);

    const ringStyle = useAnimatedStyle(() => {
        return {
            opacity: 0.8 - ring.value,
            borderWidth: 1.5,
            transform: [
                {
                    scale: interpolate(ring.value, [0, 0.5], [0, 2]),
                },
            ],
        };
    });
    useEffect(() => {
        ring.value = withDelay(
            delay,
            withRepeat(
                withTiming(0.8, {
                    duration: 3000,
                }),
                -1,
                false
            )
        );
    }, []);
    return <Animated.View style={[styles.ring, ringStyle]} />;
};


export default function OnAnimation() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",

            }}
        >
            <Ring delay={0} />
            <Ring delay={500} />
            <Ring delay={1000} />
            <Ring delay={1500} />
            <Ring delay={2000} />
            <Ring delay={2500} />
        </View>
    );
}

const styles = StyleSheet.create({
    ring: {
        position: "absolute",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: Colors.green,
        borderWidth: 2,
    },
});