import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Pressable, FlatList } from 'react-native';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import HeaderCommon from '../../Others/HeaderCommon';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function MotorRunHistory() {
    return (
        <View style={CommonStyles.pageContainer}>
            <HeaderCommon />
            <FlatList
                data={[1, 1, 1, 1]}
                ListHeaderComponent={<Text style={CommonStyles.pageHeading}>Motor On/Off History</Text>}
                renderItem={({ item }) => (
                    <View>
                        <View style={[styles.card, { backgroundColor: Colors.lightBlue }]}>
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
                                    <Text style={styles.mainText}>Motor On</Text>
                                    <Text style={[styles.subText, { marginTop: 4 }]}>+91 987654210</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <Icon
                                    type='entypo'
                                    name='time-slot'
                                    size={16}
                                    style={{ marginRight: 5 }}
                                    color={Colors.primary150}
                                />
                                <Text style={styles.subText} >05.25PM</Text>
                            </View>
                        </View>
                        <View style={[styles.card, { backgroundColor: Colors.lightOrange }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.iconContainer, { backgroundColor: Colors.secondary }]}>
                                    <Icon
                                        type='entypo'
                                        name='calendar'
                                        size={24}
                                        color={Colors.primary50}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.mainText}>Motor Off</Text>
                                    <Text style={[styles.subText, { marginTop: 4 }]}>+91 987654210</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <Icon
                                    type='entypo'
                                    name='time-slot'
                                    size={16}
                                    style={{ marginRight: 5 }}
                                    color={Colors.primary150}
                                />
                                <Text style={styles.subText} >05.25PM</Text>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{ marginBottom: 100 }} />}
            />
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