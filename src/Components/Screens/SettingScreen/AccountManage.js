import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function AccountManage() {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Account Manage</Text>
                <View style={styles.container}>
                    <View>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.uploadPic} />
                        ) : (
                            <Image
                                source={require('../../../Images/Profile/usericon.png')}
                                style={styles.uploadPic}
                            />
                        )}
                        <Pressable onPress={pickImage} style={{ position: 'absolute', top: 80, left: 63 }}>
                            <Icon
                                type='entypo'
                                name='edit'
                                size={15}
                                raised
                                color={Colors.primary}
                            />
                        </Pressable>
                    </View>
                    <Text style={styles.userID}>User ID</Text>
                </View>
                <View>
                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Name'
                            labelStyle={styles.labelStyle}
                            placeholder='Name'
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            value='Naveen Prasanth'
                        />
                        <Input
                            label='Address'
                            labelStyle={styles.labelStyle}
                            placeholder='Adress'
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            value='1234 NW Bobcat Lane, St. Robert, MO 65584-5678'
                            multiline
                        />
                        <Input
                            label='Mobile No'
                            labelStyle={styles.labelStyle}
                            placeholder='Mobile No'
                            inputContainerStyle={styles.inputContainerStyle}
                            inputStyle={styles.inputStyle}
                            placeholderTextColor={Colors.primary100}
                            value='8940352877'
                            disabled
                            maxLength={10}
                            keyboardType='number-pad'
                            leftIcon={
                                <Text style={styles.inputStyle}>+91</Text>
                            }
                        />
                        <Text style={styles.subText}>Your Mobile cannot be changed</Text>
                    </View>
                </View>
                <View style={{ marginTop: 25 }}>
                    <Button
                        title="Update"
                        titleStyle={CommonStyles.inputTitleStyle}
                        buttonStyle={CommonStyles.sendButtonStyle}
                        containerStyle={CommonStyles.sendContainerStyle}
                        onPress={() => sendHandler()}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    uploadPic: {
        width: wp(26),
        height: wp(26),
        borderRadius: 100,
        marginTop: 20,
    },
    container: {
        height: wp(60),
        alignSelf: 'center',
        justifyContent: 'center',
    },
    userID: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10
    },
    inputContainerStyle: {
        borderColor: Colors.primary75,
        borderBottomWidth: 1,
        alignSelf: 'center',
        height: hp('6.5%'),
        width: '95%',
        borderRadius: 8,
    },
    inputStyle: {
        marginHorizontal: 10,
        fontSize: hp('1.7%'),
        height: wp('6.5%'),
    },
    labelStyle: {
        fontSize: wp(4.5),
        fontWeight: '800',
        color: 'black',
        marginHorizontal: 20
    },
    subText: {
        fontSize: wp(3.3),
        fontWeight: '300',
        color: Colors.primary100,
        marginHorizontal: 25,
        marginTop: -25
    },

})