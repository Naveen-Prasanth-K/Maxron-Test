import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ToggleButton from "react-native-toggle-element";
import { Icon } from '@rneui/themed';
import { Colors } from '../GlobalStyles/Colors';

export default function Switch({ value, onToggle, dualType, activeColor }) {

    return (
        <View style={{ marginLeft: 25 }}>
            <ToggleButton
                value={value}
                onPress={() => onToggle()}
                trackBar={{
                    activeBackgroundColor: activeColor === 'orange' ? Colors.secondary : Colors.blue,
                    inActiveBackgroundColor: dualType === true ? Colors.secondary : "#6f6f6f",
                    width: 48,
                    height: 28,
                }}
                thumbActiveComponent={
                    <Icon
                        type={dualType === true ? 'ant-design' : 'ionicon'}
                        name={dualType === true ? 'caretright' : 'checkmark'}
                        size={17}
                        color={Colors.blue} />
                }
                thumbInActiveComponent={
                    <Icon
                        type={dualType === true ? 'ant-design' : 'ionicon'}
                        name={dualType === true ? 'caretleft' : 'checkmark'}
                        size={17} />
                }
                thumbButton={{
                    width: 23,
                    height: 23,
                    radius: 50,
                    inActiveBackgroundColor: 'white',
                    activeBackgroundColor: 'white'
                }}

            />
        </View>
    )
}

const styles = StyleSheet.create({

})