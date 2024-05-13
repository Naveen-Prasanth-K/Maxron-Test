import { StyleSheet,Alert, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react';
import Timer from '../../Others/Timer';
import { CommonStyles, GradientColor } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon, Image, Divider, Input, Button } from '@rneui/themed';
import Switch from '../../../Utilities/UI/Switch';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Store from '../../../Utilities/Store/Store';

const NumberSettings = ({ route }) => {

    const { formData, onChange } = route.params;
    const [bodyData, setBodyData] = useState(formData);
    const navigation = useNavigation();
    const [permission, setPermission] = useState(formData?.permission);
    const [numbers, setNumbers] = useState([]);

    useEffect(()=>{
        if(Store?.activeDeviceNumberData?.length > 0 ){
            setNumbers(Store?.activeDeviceNumberData)
        }

    },[Store?.activeDeviceNumberData?.length])

    const sendHandler =async () => {

        console.log("number data ", JSON.stringify(numbers))
        // const bodyDatas = {
        //     _id : formData?._id,
        //     numbers : numbers
        // }
        // setBodyData({ ...bodyData, numbers: numbers });
        // onChange("numbers", numbers);
        // await Store?.updateDeviceData(bodyDatas, "Number Settings")
           await numbers?.length > 0 && numbers.forEach(async form =>{
                    await Store?.postActiveDeviceNumberData(form)
           })  

        navigation.goBack()
    }
    const permissionHandler =async (formData) => {
       //  setPermission(!permission);
       const bodyData = {
                                        _id : formData?._id,
                                        name: formData?.name,
                                        mobileNo: formData?.mobileNo,  
                                        deviceViewStatus : !formData?.deviceViewStatus,
                                        deviceViewType : formData?.deviceViewType ,
                                        customerId : formData?.ownerId,
                                        deviceId : formData?._id
       }

       await Store?.putActiveDeviceNumberData(bodyData);
       
    };

    const handleAddClick = () => {
        if (numbers.length < 5) {
            setNumbers([...numbers, { name: '', mobileNo: '',  
                                        deviceViewStatus : false,
                                        deviceViewType : "User" ,
                                        customerId : formData?.ownerId,
                                        deviceId : formData?._id
                        }]);
        } else {
            Alert.alert('Limit Reached', 'You can only add up to 5 alternative Name & Mobile No\'s.');
        }
    };
    const handleInputChange = (value, index, name) => {
        const list = [...numbers];
        list[index][name] = value;
        setNumbers(list);
       
    };
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    return (
        <View View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <ScrollView >
                <Text style={CommonStyles.pageHeading}>Number Registration</Text>
                <View >
                    {/* <Input
                        label="Device Mobile Number"
                        labelStyle={styles.labelStyle}
                        placeholder='Device Mobile Number *'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        value={formData.masterMobileNo.toString()}
                        onChangeText={(value) => { onChange("masterMobileNo", value) }}
                    /> */}
                    <Input
                        label="Master Mobile Number"
                        labelStyle={styles.labelStyle}
                        placeholder='Master Mobile Number *'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        value={formData.masterMobileNo.toString()}
                        onChangeText={(value) => { onChange("masterMobileNo", value) }}
                    />
                </View>
                <Text style={[CommonStyles.pageHeading, { marginTop: 0 }]}>Add Numbers</Text>
                {
                    numbers?.length > 0 && 
                    numbers.map((data,index)=>{
                       return(<><Input
                        label="Name"
                        labelStyle={styles.labelStyle}
                        placeholder='User Name *'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='default'
                        value={data.name}
                        onChangeText={(value) => handleInputChange(value, index, 'name')}
                    />
                    <Input
                        label="Mobile"
                        labelStyle={styles.labelStyle}
                        placeholder='Mobile No *'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary100}
                        keyboardType='numeric'
                        value={data?.mobileNo?.toString()}
                        onChangeText={(value) => handleInputChange(value, index, 'mobileNo')}
                    /></>)
                    })
                }
                <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, { flexDirection: 'row', justifyContent: 'center' }]} onPress={handleAddClick}>
                    <Icon
                        type='ionicon'
                        name='add-circle'
                        size={48}
                        color={Colors.primary}
                        style={{ marginRight: 10 }}
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 18 }}>Add Mobile</Text>
                </Pressable>
                <Divider color={Colors.primary100} style={{ marginHorizontal: 15, marginVertical: 20 }} />
                <Text style={[CommonStyles.pageHeading, { marginTop: 0 }]}>Numbers</Text>
                {
                    numbers.map((formData, index) => {
                        return (
                            <LinearGradient
                                colors={GradientColor}
                                start={{ x: 0.5, y: 0.5 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.numberContainer}
                                key={index}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <View style={styles.useNameContainer}>
                                        <Text style={styles.userName}>User Name</Text>
                                        <Text style={styles.mobileNo}>+91 {formData?.mobileNo}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', }}>
                                        <View style={{ marginRight: 15, marginTop: 20 }}>
                                            <Switch value={formData?.deviceViewStatus} onToggle={()=>permissionHandler(formData)} activeColor={'orange'} />
                                        </View>
                                        <Pressable style={({ pressed }) => [pressed && CommonStyles.pressed, styles.removeContainer]}>
                                            <Text style={styles.removeText}>Remove</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </LinearGradient>
                        )
                    })
                }
                <Button
                    title="Save"
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    )
}
export default observer(NumberSettings);
const styles = StyleSheet.create({
    numberContainer: {
        marginHorizontal: 15,
        height: hp(14),
        borderRadius: 25,
        marginBottom: 25
    },
    inputContainerStyle: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        alignSelf: 'center',
        height: hp('5.5%'),
        width: '95%',
        borderRadius: 5,
        backgroundColor: Colors.primary60,
        marginBottom: -10
    },
    inputStyle: {
        marginHorizontal: 15,
        fontSize: hp('1.6'),
        height: wp('5.5%'),
    },
    labelStyle: {
        fontSize: 15,
        fontWeight: '400',
        color: 'black',
        marginHorizontal: 15
    },
    removeContainer: {
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: Colors.primary100,
        borderBottomRightRadius: 25,
        borderTopLeftRadius: 10
    },
    removeText: {
        color: 'white'
    },
    useNameContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    mobileNo: {
        fontSize: hp(2.7),
        color: 'white',
        fontWeight: '600'
    },
    userName: {
        fontSize: hp(1.5),
        color: 'white',
        fontWeight: '300'
    }
})