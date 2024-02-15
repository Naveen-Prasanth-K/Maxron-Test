import React, { useMemo } from 'react';
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    Text,
    Pressable,
} from 'react-native';
import { Colors } from '../../../Utilities/GlobalStyles/Colors'

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.12;
const ITEM_HEIGHT = 70;
const ITEM_OFFSET = ITEM_WIDTH + 18;

function dateSubtractDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

function getDayString(date) {
    return date.toString().split(' ')[0];
}

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate();
}

function isToday(date) {
    return new Date().getDate() == date.getDate();
}

function generateHorizontalCalendarDates(days) {
    const today = new Date();
    let result = [];
    for (let i = 0; i < days; i++) {
        result[i] = dateSubtractDays(today, i);
    }
    return result.reverse();
}

export default function HorizontalCalendar({
    selectedDate,
    setSelectedDate,
}) {
    const dates = useMemo(() => {
        return generateHorizontalCalendarDates(8);
    }, []);

    const onDatePress = (date) => {
        setSelectedDate(date);
    };

    const renderItem = ({ item, index }) => {
        const dayNumber = item.getDate();
        const dayString = getDayString(item);
        const isActive = isSameDay(selectedDate, item);
        return (
            <Pressable
                onPress={() => onDatePress(item)}
                style={[styles.item, isActive && { backgroundColor: Colors.secondary }]}>
                <Text style={[styles.dateOutput, isActive && styles.activeText]}>
                    {dayNumber}
                </Text>
                <Text style={[styles.dayStyle, isActive && styles.activeText]}>
                    {isToday(item) ? 'Today' : dayString}
                </Text>
            </Pressable>
        );
    };

    return (
        <FlatList
            data={dates}
            renderItem={renderItem}
            keyExtractor={(item) => item.toDateString()}
            horizontal={true}
            contentContainerStyle={[
                { paddingBottom: 16, paddingLeft: 4, paddingRight: 16 },
            ]}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={dates.length - 7}
            getItemLayout={(_, index) => ({
                length: ITEM_WIDTH,
                offset: ITEM_OFFSET * index,
                index,
            })}
        />
    );
}

const styles = StyleSheet.create({
    dateOutput: {
        color: 'black',
        fontSize: 18,
        fontWeight: '900',
    },
    dayStyle: {
        color: Colors.primary100,
        //textTransform: 'lowercase',
    },
    activeText: {
        color: 'white',
    },
    item: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
});
