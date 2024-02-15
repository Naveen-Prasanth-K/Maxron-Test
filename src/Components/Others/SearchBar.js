import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Input } from '@rneui/base';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';

export default function SearchBar() {
    return (
        <View>
            <Input
                placeholder='Search...'
                inputContainerStyle={CommonStyles.inputContainerStyle}
                inputStyle={CommonStyles.inputStyle}
                placeholderTextColor={Colors.primary100}
                keyboardType='numeric'
                rightIcon={
                    <Icon
                        type='font-awesome'
                        name='search'
                        size={22}
                        color={Colors.primary250}
                        style={{ marginHorizontal: 15 }}
                    />}

            />
        </View>
    )
}

const styles = StyleSheet.create({})