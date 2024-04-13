import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Pressable } from 'react-native';
import HorizontalCalendar from './HorizontalCalendar';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Activities() {

    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Motor On/Off</Text>
                        <Text style={[styles.subText, { marginTop: 4 }]}>+91 987654210</Text>
                    </View>
                </View>
                <Pressable
                    style={({ pressed }) => pressed && CommonStyles.pressed}
                    onPress={() => navigation.navigate("MotorRunHistory")}
                >
                    <Icon
                        type='entypo'
                        name='chevron-right'
                        size={24}
                        color={Colors.primary200}
                        style={styles.rightIcon}
                    />
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Total Power Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={16}
                                style={{ marginRight: 5 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.subText} >4 Hrs</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        type='material-community'
                        name='lightning-bolt-circle'
                        size={18}
                    />
                    <Text style={styles.subText}>2 Phase</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Total Power Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={16}
                                style={{ marginRight: 5 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.subText} >4 Hrs</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        type='material-community'
                        name='lightning-bolt-circle'
                        size={18}
                    />
                    <Text style={styles.subText}>3 Phase</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Motor Run Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={16}
                                style={{ marginRight: 5 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.subText} >4 Hrs</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        type='material-community'
                        name='lightning-bolt-circle'
                        size={18}
                    />
                    <Text style={styles.subText}>2 Phase</Text>
                </View>

            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Motor Run Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={16}
                                style={{ marginRight: 5 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.subText} >4 Hrs</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        type='material-community'
                        name='lightning-bolt-circle'
                        size={18}
                    />
                    <Text style={styles.subText}>3 Phase</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Dry run Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={16}
                                style={{ marginRight: 5 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.subText} >4 Hrs</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Icon
                            type='entypo'
                            name='calendar'
                            size={24}
                            color={Colors.primary50}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.mainText}>Low voltage</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <Icon
                                type='entypo'
                                name='time-slot'
                                size={16}
                                style={{ marginRight: 5 }}
                                color={Colors.primary150}
                            />
                            <Text style={styles.subText} >4 Hrs</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: Colors.lightBlue,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 18,
        elevation: 2,
        marginHorizontal: 18,
        marginVertical: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 8
    },
    rightIcon: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.primary75
    },
    subText: {
        fontSize: wp(3.3),
        fontWeight: '400'
    },
    mainText: {
        fontSize: wp(4.2),
        fontWeight: '600'
    }
})