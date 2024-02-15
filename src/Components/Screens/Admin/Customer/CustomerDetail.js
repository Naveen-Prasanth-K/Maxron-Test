import { useNavigation } from '@react-navigation/native';
import { Icon, Image, Divider, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonStyles } from '../../../../Utilities/GlobalStyles/CommonStyles';
import Header from '../../../Others/Header';
import DeviceHome from '../../DeviceScreen/DeviceHome';

const CustomerDetail = ({ route }) => {

    const { item } = route.params;

    return (
        <View style={CommonStyles.pageContainer}>
            <Header />
            <DeviceHome data={item} />
        </View>
    )
}

export default CustomerDetail

const styles = StyleSheet.create({})