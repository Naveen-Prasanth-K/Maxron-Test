import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Image } from '@rneui/base';
import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../Utilities/GlobalStyles/Colors';
import { WinDimensions } from '../Utilities/GlobalStyles/WinDimension';
import AdminHome from '../Components/Screens/Admin/AdminHome';
import DealerHome from '../Components/Screens/Admin/Dealer/DealerHome';
import RequestHome from '../Components/Screens/Admin/Request/RequestHome';
import AdminSettings from '../Components/Screens/Admin/AdminSetting/AdminSettings';
import AddHome from '../Components/Screens/Admin/Add/AddHome';

const BottomTabs = createBottomTabNavigator();

export default function AdminBottomBar() {

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
                    name="AdminHome"
                    component={AdminHome}
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
                    name="DealerHome"
                    component={DealerHome}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 20 : 10,
                                textAlign: 'center',
                                fontSize: wp('3'),
                            }}>
                                Dealer
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 25, height: 25, transform: [{ scale: 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Dealer.png")} />
                            </Animated.View>
                        )
                    }}
                />
                <BottomTabs.Screen
                    name="AddHome"
                    component={AddHome}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{
                                color: focused ? Colors.secondary : Colors.primary,
                                marginBottom: isLandscape ? 0 : 13,
                                marginHorizontal: isLandscape ? 20 : 10,
                                textAlign: 'center',
                                fontSize: wp('3'),
                            }}>
                                Create
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Animated.View style={{
                            }}>
                                <Image
                                    style={{ tintColor: color, width: 22, height: 22, transform: [{ scale: 1, }], marginHorizontal: 8 }}
                                    source={require("../Images/HomeScreen/Create.png")} />
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
                    name="AdminSettings"
                    component={AdminSettings}
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