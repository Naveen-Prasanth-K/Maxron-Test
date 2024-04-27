import { useNavigation } from '@react-navigation/native';
import { Icon, Image } from '@rneui/base';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';

export default function Header1() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={styles.Container}>
                <Image style={styles.image}
                    source={require('../../Images/Logo.png')}
                />
                <Pressable
                    style={({ pressed }) => pressed && CommonStyles.pressed}
                    onPress={() => navigation.navigate('NotificationScreen')}
                >
                    <Icon
                        type='octicon'
                        name='bell-fill'
                        size={19}
                        color={Colors.primary60}
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: wp('6'),
        height: hp('2.5')
    },
    Container: {
        backgroundColor: 'transparent',
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})