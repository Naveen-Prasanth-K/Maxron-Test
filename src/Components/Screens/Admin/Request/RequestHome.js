import { useNavigation } from '@react-navigation/native';
import { Icon, Image, TabView } from '@rneui/themed';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { DEVICEDATA } from '../../../../Utilities/Data/DummyData';
import { Colors } from '../../../../Utilities/GlobalStyles/Colors';
import { CommonStyles, GradientColor } from '../../../../Utilities/GlobalStyles/CommonStyles';
import { WinDimensions } from '../../../../Utilities/GlobalStyles/WinDimension';
import Header1 from '../../../Others/Header1';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '../../../Others/SearchBar';
import { DEALERDATA } from '../../../../Utilities/Data/DummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ActiveRequest from './ActiveRequest';
import CompletedRequest from './CompletedRequest';
import Store from '../../../../Utilities/Store/Store';

const screenHeight = Dimensions.get("window").height;

const RequestHome = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [dealer, setDealer] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            let dealerData = await Store.getLocalDataUserFullDetails();
            setDealer(dealerData)
        }
        fetchData()
    }, [])

    return (
        <>
            <Header1 />
            <ScrollView style={CommonStyles.pageContainer}>
                <LinearGradient
                    colors={GradientColor}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 1, y: 0.5 }}
                >

                    <View style={CommonStyles.adminHeader}>
                        <Text style={CommonStyles.welcomeTxt}>Welcome!</Text>
                        <Text style={CommonStyles.adminTxt}>{dealer?.customerName != "" ? dealer?.customerName : ""}</Text>
                        <SearchBar />
                    </View>
                </LinearGradient>
                <Text style={CommonStyles.dealerTxt}>REQUEST</Text>
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
                            <ActiveRequest />
                        </TabView.Item>
                        <TabView.Item style={styles.tabItem}>
                            <CompletedRequest />
                        </TabView.Item>
                    </TabView>
                </View>
            </ScrollView>
        </>
    )
}

export default observer(RequestHome);

const styles = StyleSheet.create({
    tabItem: {
        width: '100%',
        marginTop: 20,
    },
    TabText: {
        fontSize: wp(4.2),
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.primary
    },
})