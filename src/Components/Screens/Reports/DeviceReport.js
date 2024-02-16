import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import HorizontalCalendar from './HorizontalCalendar';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { Tab, Text, TabView } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Activities from './Activities';
import LogGraph from './LogGraph';

const screenHeight = Dimensions.get("window").height;

const DeviceReport = () => {

    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [index, setIndex] = useState(0);

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <ScrollView>
                <View>
                    <Text style={CommonStyles.pageHeading}>Reports</Text>
                    <View style={styles.container}>
                        <HorizontalCalendar
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </View>
                    <View style={{ flex: 1, height: screenHeight * 0.90 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1, borderBottomWidth: index === 0 ? 3 : 0, marginHorizontal: 25, paddingBottom: 10, borderColor: Colors.primary,
                                }}
                                onPress={() => setIndex(0)}
                            >
                                <Text style={styles.TabText}>Reports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1, borderBottomWidth: index === 1 ? 3 : 0, marginHorizontal: 25, paddingBottom: 10, borderColor: Colors.primary,
                                }}
                                onPress={() => setIndex(1)}
                            >
                                <Text style={styles.TabText}>Activities</Text>
                            </TouchableOpacity>
                        </View>
                        <TabView value={index} onChange={setIndex} animationType="spring">
                            <TabView.Item style={styles.tabItem} >
                                <LogGraph />
                            </TabView.Item>
                            <TabView.Item style={styles.tabItem}>
                                <Activities />
                            </TabView.Item>
                        </TabView>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default DeviceReport

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    TabText: {
        fontSize: wp(4.2),
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.primary
    },
    tabItem: {
        width:
            '100%',
        marginTop: 20
    }
});
