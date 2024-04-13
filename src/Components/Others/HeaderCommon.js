import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';

export default function HeaderCommon() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <Pressable
                style={({ pressed }) => pressed && CommonStyles.pressed}
                onPress={() => navigation.goBack()}>
                <Icon
                    type='entypo'
                    name='chevron-left'
                    size={24}
                    color={Colors.primary200}
                    style={{ marginHorizontal: 20, marginTop: 5, alignSelf: 'flex-start', borderWidth: 1, borderRadius: 5, borderColor: Colors.primary75 }}
                />
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})