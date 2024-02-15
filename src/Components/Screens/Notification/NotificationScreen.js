import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Pressable, FlatList, Image } from 'react-native';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../Others/Header';
import { Colors } from '../../../Utilities/GlobalStyles/Colors';
import { Icon } from '@rneui/themed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function NotificationScreen() {

    const date = new Date();

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <FlatList
                data={[1, 1, 1, 1]}
                ListHeaderComponent={<Text style={CommonStyles.pageHeading}>Notification</Text>}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.image}
                                    source={require('../../../Images//Logo.png')}
                                />
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.mainText}>Service Request</Text>
                                    <Text style={styles.subText}>New Service Request Received from Naveen Prasanth</Text>
                                    <Text style={styles.subText}>{new Date().toDateString()} , {date.toLocaleTimeString()}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.image}
                                    source={require('../../../Images//Logo.png')}
                                />
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={styles.mainText}>Device Request</Text>
                                    <Text style={styles.subText}>New Service Request Received from Naveen Prasanth</Text>
                                    <Text style={styles.subText}>{new Date().toDateString()} , {date.toLocaleTimeString()}</Text>
                                </View>
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
    image: {
        marginTop: 5,
        width: wp('7.8'),
        height: hp('3.3')
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
        fontWeight: '400',
        marginTop: 4,
        color: Colors.primary200
    },
    mainText: {
        fontSize: wp(4.2),
        fontWeight: '600',
        width: '100%'
    }
})