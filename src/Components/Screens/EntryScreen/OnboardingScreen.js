import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { setOnboarding } from '../../../Utilities/Storage/Storage';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {

    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('LoginScreen');
        setOnboarding('OnBoarded', '1');
    }

    const Dots = ({ selected }) => {
        let backgroundColor = selected ? Colors.secondary : 'grey'
        return (
            <View style={{
                width: selected ? 25 : 13,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 5,
            }} />
        )
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>DONE</Text>
            </TouchableOpacity>
        )
    }
    const nextLabel = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>NEXT</Text>
            </TouchableOpacity>
        )

    }
    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                DotComponent={Dots}
                bottomBarColor={'white'}
                nextLabel={<Text style={{ color: 'grey', fontSize: 13 }}>NEXT</Text>}
                skipLabel={<Text style={{ color: 'grey', fontSize: 13 }}>SKIP</Text>}
                pages={[
                    {
                        backgroundColor: '#cbe0ff',
                        image: (
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={require('../../../Images/OnBoarding/onBoarding1.png')}
                                    style={styles.image} />
                            </View>
                        ),
                        title: (
                            <View style={styles.belowContainer}>
                                <Text style={styles.titleTxt}>Smart Motor Control</Text>
                                <Text style={styles.subtitleTxt}>Discover the convenience of remotely controlling your motor with our innovative app. Say goodbye to manual operation as our solution simplifies motor control.</Text>
                            </View>
                        ),
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#ffd8d4',
                        image: (
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={require('../../../Images/OnBoarding/onBoarding2.png')}
                                    style={styles.image} />
                            </View>
                        ),
                        title: (
                            <View style={styles.belowContainer}>
                                <Text style={styles.titleTxt}>User-Friendly</Text>
                                <Text style={styles.subtitleTxt}>Our app features an intuitive user interface, making motor control a breeze. Easily set up automatic on and off control, so you can focus on your tasks while our app handles motor management.</Text>
                            </View>
                        ),
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#cbe0ff',
                        image: (
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={require('../../../Images/OnBoarding/onBoarding3.png')}
                                    style={styles.image} />
                            </View>
                        ),
                        title: (
                            <View style={styles.belowContainer}>
                                <Text style={styles.titleTxt}>Stay in Control</Text>
                                <Text style={styles.subtitleTxt}>Stay connected to your motor even when you are away. Monitor & receive timely updates through our app. Empower yourself to optimize your motor control, ensuring it runs efficiently wherever you are.</Text>
                            </View>
                        ),
                        subtitle: '',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lottie: {

    },
    doneButton: {
        paddingHorizontal: 15
    },
    belowContainer: {
        width: '100%',
        height: 350,
        marginBottom: '-80%',
        paddingTop: 25,
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    titleTxt: {
        fontSize: hp('3%'),
        fontWeight: '600'
    },
    subtitleTxt: {
        fontSize: hp('2%'),
        fontWeight: '400',
        marginTop: 20,

    },
    image: {
        width: width * 0.95,
        height: width * 0.95,
        alignSelf: 'center',
    }
})