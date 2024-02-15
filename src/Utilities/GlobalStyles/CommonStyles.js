import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../GlobalStyles/Colors';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const GradientColor = ['#8432DF', '#4743EF', '#9220d0', '#0B54FE'];

export const CommonStyles = {

    pressed: {
        opacity: 0.75,
    },
    pageHeading: {
        fontSize: wp('6'),
        fontWeight: '700',
        margin: 15
    },
    pageContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    noDeviceImgContainer: {
        flex: 1,
        alignItems: 'center',
        height: height * 0.65,
        justifyContent: 'center'
    },
    noDeviceImg: {
        width: width * 0.65,
        height: width * 0.65,
        alignSelf: 'center'
    },

    //Button for Login
    loginButtonStyle: {
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        height: hp('6%'),
    },
    loginContainerStyle: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10
    },
    inputTitleStyle: {
        fontSize: wp('4.3')
    },

    // Button for send
    sendButtonStyle: {
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        height: hp('6%'),
    },
    sendContainerStyle: {
        width: '65%',
        alignSelf: 'center',
        marginVertical: 20
    },

    //Normal Input Box Style
    inputContainerStyle: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        alignSelf: 'center',
        height: hp('6%'),
        width: '95%',
        borderRadius: 8,
        backgroundColor: Colors.primary60,
    },
    inputStyle: {
        marginHorizontal: 15,
        fontSize: hp('1.7%'),
        height: wp('6.5%'),
    },
    labelStyle: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
        marginHorizontal: 15
    },

    // ActionContainer
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10
    },

    //Overlay
    overlayContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },

    //HeaderText
    adminHeader: {
        paddingBottom: 0,
        paddingVertical: 5,
    },
    welcomeTxt: {
        fontSize: wp('3.5'),
        color: 'white',
        fontWeight: '300',
        marginHorizontal: 15
    },
    adminTxt: {
        fontSize: wp('6.5'),
        color: 'white',
        fontWeight: '700',
        marginHorizontal: 15,
        marginBottom: 15
    },
    dealerTxt: {
        fontSize: wp('3.5'),
        marginHorizontal: 15,
        fontWeight: '500',
        marginVertical: 15
    },

};
