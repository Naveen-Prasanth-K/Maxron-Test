import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Image } from '@rneui/base';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../Utilities/GlobalStyles/Colors';
import { WinDimensions } from '../Utilities/GlobalStyles/WinDimension';

import DealerProfile from '../Components/Screens/Admin/Dealer/DealerProfile';
import DealerCustomerList from '../Components/Screens/Admin/Customer/DealerCustomerList';
import DealerSetting from '../Components/Screens/Admin/Dealer/DealerSetting';
import RequestHome from '../Components/Screens/Admin/Request/RequestHome';

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
                    tabBarStyle: { height: 75, borderWidth: 1, borderColor: Colors.primary75, paddingVertical: 20, }
                }}
            >
                <BottomTabs.Screen
                    name="DealerCustomerList"
                    component={DealerCustomerList}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 20 : 10,
                                textAlign: 'center',
                                fontSize: wp('3'),
                            }}>
                                Home
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 22, height: 22, transform: [{ scale: 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Home.png")} />
                            </Animated.View>
                        )
                    }}
                />
                <BottomTabs.Screen
                    name="RequestHome"
                    component={RequestHome}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 20 : 10,
                                textAlign: 'center',
                                fontSize: wp('3'),
                            }}>
                                Request
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 22, height: 22, transform: [{ scale: 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Message.png")} />
                            </Animated.View>
                        )
                    }}
                />
                <BottomTabs.Screen
                    name="DealerProfile"
                    component={DealerProfile}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 20 : 10,
                                textAlign: 'center',
                                fontSize: wp('3'),
                            }}>
                                Profile
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 22, height: 22, transform: [{ scale: 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Dealer.png")} />
                            </Animated.View>
                        )
                    }}
                />

                <BottomTabs.Screen
                    name="DealerSetting"
                    component={DealerSetting}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 20 : 10,
                                textAlign: 'center',
                                fontSize: wp('3'),
                            }}>
                                Settings
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 22, height: 22, transform: [{ scale: 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Setting.png")} />
                            </Animated.View>
                        )
                    }}
                />
            </BottomTabs.Navigator>
        </View>

    )
}

const styles = StyleSheet.create({})