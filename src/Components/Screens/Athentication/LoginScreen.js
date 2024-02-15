import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/themed';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../Utilities/GlobalStyles/WinDimension';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {

    const navigation = useNavigation();
    const { screenWidth, screenHeight } = WinDimensions();
    const isLandscape = screenWidth > screenHeight;
    const isTablet = Dimensions.get('window').width >= 600;

    const LoginHandler = () => {
        navigation.navigate('AdminBottomBar')
    }

    return (
        <SafeAreaView style={CommonStyles.pageContainer}>
            <ScrollView>
                <Image
                    source={require('../../../Images/LoginScreen/loginHome.png')}
                    style={{
                        width: width * 0.95,
                        height: width * 0.95,
                        alignSelf: 'center',
                    }} />
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTxt} >Welcome back!</Text>
                    <Text style={styles.welcomeTxt}>Glad to see you, Again!</Text>
                </View>
                <View>
                    <Input
                        placeholder='Enter your Mobile Number *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                    />
                    <Input
                        placeholder='Enter your Password *'
                        inputContainerStyle={CommonStyles.inputContainerStyle}
                        inputStyle={CommonStyles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        rightIcon={
                            <Pressable style={({ pressed }) => pressed && CommonStyles.pressed}>
                                <Icon
                                    type='material-community'
                                    name='eye'
                                    size={24}
                                    color={Colors.primary200}
                                    style={{ marginRight: 15 }}
                                />
                            </Pressable>
                        }
                    />
                    <Pressable
                        style={({ pressed }) => [pressed && CommonStyles.pressed, styles.forgetContainer]}
                        onPress={() => navigation.navigate("ForgotPass")}
                    >
                        <Text style={{ color: Colors.primary, fontWeight: '600' }}>Forgot Password?</Text>
                    </Pressable>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Login"
                            titleStyle={CommonStyles.inputTitleStyle}
                            buttonStyle={CommonStyles.loginButtonStyle}
                            containerStyle={CommonStyles.loginContainerStyle}
                            onPress={LoginHandler}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                        <Text>Don’t have an account?</Text>
                        <Pressable
                            style={({ pressed }) => pressed && CommonStyles.pressed}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            <Text style={{ color: Colors.secondary, fontWeight: '600' }}>   Register Now</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    welcomeContainer: {
        margin: 20,
        alignItems: 'center'
    },
    welcomeTxt: {
        fontSize: wp('6.5%'),
        fontWeight: '600',
    },
    forgetContainer: {
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginTop: -15
    },


})