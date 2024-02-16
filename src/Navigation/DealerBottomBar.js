import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Image } from '@rneui/base';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../Utilities/GlobalStyles/Colors';
import { WinDimensions } from '../Utilities/GlobalStyles/WinDimension';

import CustomerList from '../Components/Screens/Admin/Customer/CustomerList';

const BottomTabs = createBottomTabNavigator();

export default function DealerBottomBar() {

    const { screenWidth, screenHeight } = WinDimensions();
    const isLandscape = screenWidth > screenHeight;
    const isTablet = Dimensions.get('window').width >= 600;

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <BottomTabs.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.secondary,
                    tabBarInactiveTintColor: Colors.primary,
                    headerShown: false,
                    tabBarStyle: { height: 75, borderTopEndRadius: 35, borderWidth: 1, borderColor: Colors.primary75, borderTopLeftRadius: 35, paddingVertical: 10, }
                }}
            >
                <BottomTabs.Screen
                    name="CustomerList"
                    component={CustomerList}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 25 : 30,
                                textAlign: 'center',
                                fontSize: focused ? wp('4.1') : wp('3.7'),
                            }}>
                                Home
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 21, height: 21, transform: [{ scale: focused ? 1.1 : 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Home.png")} />
                            </Animated.View>
                        )
                    }}
                />
            </BottomTabs.Navigator>
        </View>

    )
}

const styles = StyleSheet.create({})