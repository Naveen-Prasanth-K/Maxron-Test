import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Image, Input } from '@rneui/themed';
import LottieView from "lottie-react-native";
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';

const { width, height } = Dimensions.get('window');

export default function PassSuccess({ route }) {

    const navigation = useNavigation();
    const { pageContent } = route.params;

    const LoginHandler = () => {
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.image}
                    resizeMode="cover"
                    source={require('../../../Images/LoginScreen/Successmark.png')}
                    transition="false"
                    transitionDuration={0}
                />
                <View style={{ margin: 20 }}>
                    <Text style={styles.ForgotTxt}>{pageContent === 'ForgotSuccess' ? 'Password Changed!' : 'Registration Successful!'}</Text>
                    <Text style={styles.dummyTxt}> {pageContent === 'ForgotSuccess' ? 'Your password has been changed successfully.' : 'You have successfully registered with us.'} </Text>
                </View>
                <Button
                    title="Back to Login"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.loginButtonStyle}
                    containerStyle={CommonStyles.loginContainerStyle}
                    onPress={LoginHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
    ForgotTxt: {
        fontSize: wp('7'),
        fontWeight: '700',
        marginBottom: 10,
        alignSelf: 'center'
    },
    dummyTxt: {
        fontSize: wp('4'),
        fontWeight: '300',
        marginBottom: 30,
        color: Colors.primary100,
        alignSelf: 'center'
    }
})