import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Colors } from '../GlobalStyles/Colors';
import { CommonStyles } from '../GlobalStyles/CommonStyles';

const DateInput = ({ onDateChange }) => {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChangeDate = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                // setDateOfBirth(currentDate.toDateString())
                setDateOfBirth(formatDate(currentDate))
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
        <View>

            <Pressable onPress={toggleDatePicker}>
                <Input
                    label="Date of Birth"
                    placeholder='dd-mm-yyyy'
                    inputContainerStyle={CommonStyles.inputContainerStyle}
                    inputStyle={CommonStyles.inputStyle}
                    placeholderTextColor={Colors.primary75}
                    labelStyle={CommonStyles.labelStyle}
                    value={dateOfBirth}
                    editable={false}
                    onChangeText={setDateOfBirth}
                />
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate}
                />
            )}
        </View>
    )
}

export default DateInput