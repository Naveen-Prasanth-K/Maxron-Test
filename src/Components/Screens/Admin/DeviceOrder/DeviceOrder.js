import React, { useState } from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../../Others/HeaderCommon';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { Tab, Text, TabView } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import DeviceOrderActive from './DeviceOrderActive';
import DeviceOrderCompleted from './DeviceOrderCompleted';

const screenHeight = Dimensions.get("window").height;

export default function DeviceOrder() {

    const navigation = useNavigation();
    const [index, setIndex] = useState(0);

    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <Text style={CommonStyles.pageHeading}>Device Orders</Text>
            <View style={{ flex: 1, height: screenHeight * 0.90 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            flex: 1, borderBottomWidth: index === 0 ? 3 : 0, marginHorizontal: 25, paddingBottom: 10, borderColor: Colors.primary,
                        }}
                        onPress={() => setIndex(0)}
                    >
                        <Text style={styles.TabText}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1, borderBottomWidth: index === 1 ? 3 : 0, marginHorizontal: 25, paddingBottom: 10, borderColor: Colors.primary,
                        }}
                        onPress={() => setIndex(1)}
                    >
                        <Text style={styles.TabText}>Completed</Text>
                    </TouchableOpacity>
                </View>
                <TabView value={index} onChange={setIndex} animationType="spring">
                    <TabView.Item style={styles.tabItem} >
                        <DeviceOrderActive />
                    </TabView.Item>
                    <TabView.Item style={styles.tabItem}>
                        <DeviceOrderCompleted />
                    </TabView.Item>
                </TabView>
            </View>
        </View>
    );
}

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
