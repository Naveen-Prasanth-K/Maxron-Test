import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '../../Utilities/GlobalStyles/Colors';

export default function Timer({ isVisible, onTimeSelected, hideHour, hideMin, hideSec, initialDuration, modalTitle }) {

    const handleTouchOutside = () => {
        onTimeSelected(initialDuration);
    };

    return (
        <>
            <TimerPickerModal
                visible={isVisible}
                setIsVisible={onTimeSelected}
                hideHours={hideHour}
                hideMinutes={hideMin}
                hideSeconds={hideSec}
                hourLabel="HH"
                minuteLabel="MM"
                secondLabel="SEC"
                modalTitle={<Text style={{ fontSize: 20, fontWeight: '700', color: Colors.primary }}>{modalTitle}</Text>}
                initialHours={initialDuration.hours}
                initialMinutes={initialDuration.minutes}
                initialSeconds={initialDuration.seconds}
                padWithNItems={1}
                onConfirm={(pickedDuration) => {
                    //onTimeSelected(pickedDuration);
                    onTimeSelected({
                        hours: pickedDuration.hours.toString().padStart(2, '0'),
                        minutes: pickedDuration.minutes.toString().padStart(2, '0'),
                        seconds: pickedDuration.seconds.toString().padStart(2, '0'),
                    });
                }}
                onCancel={() => onTimeSelected(initialDuration)}
                LinearGradient={LinearGradient}
                confirmButtonText={<Text style={{ color: Colors.primary }}>Select</Text>}
                cancelButtonText={<Text style={{ color: Colors.secondary }}>Cancel</Text>}
                styles={styles.timerStyle}
                modalProps={{
                    overlayOpacity: 0.3,
                    onOverlayPress: handleTouchOutside,

                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    timerStyle: {
        theme: 'light',
        pickerItem: {
            fontSize: 25,
        },
        buttonContainer: {
            marginTop: 15,
            justifyContent: 'space-between',
            width: 210,
        },
        button: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderRadius: 5,
            fontSize: 16,
            justifyContent: 'flex-end',
        },
        confirmButton: {
            alignItems: 'center',

        },
        cancelButton: {
            alignItems: 'center',
        },
        pickerLabel: {
            fontSize: 12,
            right: -22,
        },
        pickerLabelContainer: {
            width: 50,
        },
        pickerItemContainer: {
            width: 100,
        },

    }
})