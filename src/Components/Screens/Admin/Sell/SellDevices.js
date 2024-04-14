import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button, Overlay } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../../Utilities/Data/DummyData'
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../../Others/HeaderCommon';
import SearchBar from '../../../Others/SearchBar';
import ListDevice3 from '../../../Others/ListDevice3';
import { Dropdown } from 'react-native-element-dropdown';
import Store from '../../../../Utilities/Store/Store';

const { width, height } = Dimensions.get('window');

const SellDevices = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [saleDevice, setSaleDevice] = useState([]);
    const [buyerId, setBuyerId] = useState("")

    useEffect(()=>{
       const fetchData = async () =>{
        await Store?.filterGetDeviceData(0,0,0,0,0, false);
        await Store?.getFilterMemberData(0,0,0,"Dealer")
       }
       fetchData()
    },[])

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const sendHandler = async() => {
            if(saleDevice?.length > 0){
                const data = await saleDevice?.map((value, i)=>{
                    value.buyerId = buyerId
                    return value;
            });
            const formData = {
                data : data,
                "registerType":"Dealer"
            }
        await Store?.postSaleDeviceData(formData?.registerType ,formData );
        setVisible(!visible);
        }
    }

    const selectedDevice =async (deviceId , status) =>{
        if(status == true){
            await   setSaleDevice(saleDevice =>[...saleDevice ,{ 
                sellerId: "661a1bc046408479fc5eaba3",
                buyerId : "",
                deviceId : deviceId
            }])
        }else{
            if(saleDevice?.length > 1){
                const filterData = await saleDevice?.filter((data,i) => data?.deviceId != deviceId );
                setSaleDevice(filterData)
            }else{
                setSaleDevice([]);
            }
            // setSaleDevice(saleDevice =>[...saleDevice ,{ 
            //     sellerId: "661a1bc046408479fc5eaba3",
            //     buyerId : "",
            //     deviceId : deviceId
            // }])
        }  
    }

    const onChange =async (_id) =>{
        setBuyerId(_id);
        console.log(`dealer id -${ _id }`)
        console.log(`Sale Device  id -${ JSON.stringify(saleDevice) }`)

    }

    const headerItem = () => (
        <View style={styles.headerItemContainer}>
            <Text style={CommonStyles.pageHeading}>Ready to Sell</Text>
            <Text style={styles.foundCount}>180 Devices found</Text>
            <View>
                <View style={{ marginTop: 20 }}>
                    <SearchBar soldStatus={false} type="Device" />
                </View>
            </View>
        </View>
    )

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <FlatList
                 data={Store?.unsoldDeviceData?.length > 0 && Store?.unsoldDeviceData }
                // data={DEVICEDATA}
                keyExtractor={(item) => item?.rfId}
                ListHeaderComponent={headerItem}
                renderItem={({ item }) => (
                    <>
                        <ListDevice3 item={item} selectedDevice={selectedDevice} />
                    </>
                )}
                ListFooterComponent={
                    <>
                        <View>
                            <Button
                                title={'Select Dealer'}
                                titleStyle={CommonStyles.inputTitleStyle}
                                buttonStyle={CommonStyles.sendButtonStyle}
                                containerStyle={CommonStyles.sendContainerStyle}
                                onPress={() => toggleOverlay()}
                            />
                        </View>
                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ width: '95%', height: '60%', borderRadius: 20 }}>
                            <Text style={CommonStyles.pageHeading}>Select Dealer to Sell Devices</Text>
                            <Dropdown
                                style={CommonStyles.dropdown}
                                placeholderStyle={CommonStyles.placeholderStyle}
                                selectedTextStyle={CommonStyles.selectedTextStyle}
                                inputSearchStyle={CommonStyles.inputSearchStyle}
                                activeColor={Colors.primary50}
                                itemContainerStyle={CommonStyles.itemContainerStyle}
                                placeholder='Select Dealer'
                                search
                                searchPlaceholder="Search..."
                                data={ Store?.dealerData?.length > 0 && Store?.dealerData }
                                labelField="customerName"
                                valueField="_id"
                                //value={bodyData?.district}
                                onChange={item => {
                                    onChange(item?._id)
                                }}
                            />
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <Button
                                    title={'Sell'}
                                    titleStyle={CommonStyles.inputTitleStyle}
                                    buttonStyle={CommonStyles.sendButtonStyle}
                                    containerStyle={CommonStyles.sendContainerStyle}
                                    onPress={() => sendHandler()}
                                />
                            </View>

                        </Overlay>
                    </>
                }
                ListEmptyComponent={
                    <View style={CommonStyles.noDeviceImgContainer}>
                        <Image
                            resizeMode="cover"
                            source={require('../../../../Images/HomeScreen/NoDevice.png')}
                            style={CommonStyles.noDeviceImg}
                        />
                    </View>
                } />
        </View>
    )
}

export default observer(SellDevices);

const styles = StyleSheet.create({
    foundCount: {
        fontSize: wp('3.5'),
        fontWeight: '400',
        color: Colors.primary100,
        marginTop: -15,
        marginHorizontal: 15
    },
    cardContainer: {

        marginHorizontal: 15,
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.lightBlue,
        elevation: 5
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8
    },
    devicenameTxt: {
        fontSize: wp('5'),
        fontWeight: '700',
        color: Colors.primary
    },
    nameTxt: {
        fontSize: wp('3.5'),
        color: Colors.primary200
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8,
        alignItems: 'center'
    }
})
