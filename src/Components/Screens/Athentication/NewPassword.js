import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@rneui/themed';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';

export default function NewPassword() {

    const navigation = useNavigation()

    const ResetHandler = () => {
        navigation.navigate('PassSuccess', { pageContent: 'ForgotSuccess' })
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 70 }}>
                    <Text style={styles.ForgotTxt}>Create new password</Text>
                    <Text style={styles.dummyTxt}>Your new password must be unique from those previously used.</Text>
                </View>
                <Input
                    placeholder='New Password *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}

                />
                <Input
                    placeholder='Confirm Password *'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}

                />
                <Button
                    title="Reset Password"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.loginButtonStyle}
                    containerStyle={CommonStyles.loginContainerStyle}
                    onPress={ResetHandler}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ForgotTxt: {
        fontSize: wp('7'),
        fontWeight: '700',
        marginBottom: 10
    },
    dummyTxt: {
        fontSize: wp('4'),
        fontWeight: '300',
        marginBottom: 30,
        color: Colors.primary100,
    }
})