import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Input } from '@rneui/base';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';
import Store from '../../Utilities/Store/Store';

export default function SearchBar({soldStatus, type}) {
    const [search, setSearch] = useState("");

      // on change
    const onChange = (value) => {
        setSearch(value);
    }
    const searchData =async () =>{
       if(type == "Device"){
        await Store?.filterGetDeviceData(0,0,0, search ,0, soldStatus)
       }else if (type == "User"){
        await Store?.getFilterMemberData(0,0,search, type);
       }else if (type == "Dealer"){
        await Store?.getFilterMemberData(0,0,search, type);
       }
    }
    return (
        <View>
            <Input
                placeholder='Search...'
                inputContainerStyle={CommonStyles.inputContainerStyle}
                inputStyle={CommonStyles.inputStyle}
                placeholderTextColor={Colors.primary100}
                // keyboardType='numeric'
                value={search.toString()}
                onChangeText={(value) => { onChange(value) }}
                rightIcon={
                    <Icon
                        type='font-awesome'
                        name='search'
                        size={22}
                        color={Colors.primary250}
                        style={{ marginHorizontal: 15 }}
                        onPress={ searchData }
                    />}

            />
        </View>
    )
}

const styles = StyleSheet.create({})