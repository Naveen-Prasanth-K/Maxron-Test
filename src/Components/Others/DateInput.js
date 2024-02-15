import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Input, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../Utilities/GlobalStyles/Colors';
import { CommonStyles } from '../../Utilities/GlobalStyles/CommonStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DateInput = ({ onDateChange }) => {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickedDate, setPickedDate] = useState("");

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChangeDate = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                // setPickedDate(currentDate.toDateString())
                setPickedDate(formatDate(currentDate))
                onDateChange(formatDate(currentDate));
            }
        } else {
            toggleDatePicker()
        }
    }
    const formatDate = (rawDate) => {
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${day}-${month}-${year}`;
    }

    return (
        <>
            <View style={styles.actionContainer1}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headTxt}>Recharged Date</Text>
                </View>
                <View style={{ flex: 1, marginTop: 25 }}>
                    <Input
                        placeholder='dd-mm-yyyy'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={styles.inputStyle}
                        placeholderTextColor={Colors.primary75}
                        value={pickedDate}
                        editable={false}
                        onChangeText={setPickedDate}
                        rightIcon={
                            <Pressable onPress={toggleDatePicker}>
                                <Icon
                                    type='ant-design'
                                    name='calendar'
                                    size={20}
                                    style={{ marginRight: 10 }}
                                    color={Colors.primary}
                                />
                            </Pressable>
                        }
                    />
                </View>
            </View>
            {showPicker && (
                <RNDateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate}
                    positiveButton={{ label: 'OK', textColor: Colors.primary }}
                    negativeButton={{ label: 'Cancel', textColor: Colors.secondary }}
                />
            )}
        </>
    )
}

export default DateInput

const styles = StyleSheet.create({
    actionContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 20,
        marginRight: 10,
    },
    inputContainerStyle: {
        borderColor: Colors.primary75,
        borderWidth: 1,
        height: hp('5'),
        width: wp('40'),
        alignSelf: 'flex-end',
        borderRadius: 5,
        backgroundColor: Colors.primary60,
    },
    inputStyle: {
        marginHorizontal: 15,
        fontSize: hp('1.7%'),
        height: wp('6.5%'),
    },
    headTxt: {
        fontSize: 18,
    }
})