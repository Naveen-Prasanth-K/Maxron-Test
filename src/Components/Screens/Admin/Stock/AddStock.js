import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input, CheckBox } from '@rneui/themed';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../../Others/Header';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { Dropdown } from 'react-native-element-dropdown';

const AddStock = () => {

    const [value, setValue] = useState(null);
    const navigation = useNavigation();

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const sendHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <Text style={CommonStyles.pageHeading}>Add Device Stock</Text>
                <Text style={[styles.labelStyle, { marginHorizontal: 20 }]}>Device Type</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    activeColor={Colors.primary}
                    itemContainerStyle={styles.itemContainerStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select item'}
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }}
                />
                <Input
                    label='Device Count'
                    labelStyle={styles.labelStyle}
                    placeholder='Enter Device Count*'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary100}
                    keyboardType='numeric'
                />
                <Button
                    title={'Add'}
                    titleStyle={CommonStyles.inputTitleStyle}
                    buttonStyle={CommonStyles.sendButtonStyle}
                    containerStyle={CommonStyles.sendContainerStyle}
                    onPress={() => sendHandler()}
                />
            </ScrollView>
        </View>
    )
}

export default AddStock

const styles = StyleSheet.create({
    dropdown: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        alignSelf: 'center',
        height: hp('6%'),
        width: '91%',
        borderRadius: 8,
        backgroundColor: Colors.primary60,
        paddingHorizontal: 15,
        marginBottom: 30
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    labelStyle: {
        fontSize: wp(4.5),
        fontWeight: '800',
        color: Colors.primary,
        marginHorizontal: 10
    },
    itemContainerStyle: {
        backgroundColor: Colors.primary60,
    }
});