import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import Header1 from '../../Others/Header1';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';

export default function BarCodeScan() {

    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        // alert(`You have Scanned a device with Serial No ${data}`);
        Alert.alert(
            'Message', `You have Scanned a device with Serial No ${data}`,
            [
                { text: "Scan Again", onPress: () => { setScanned(false) } },
                { text: 'Add Device', onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
        );
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header1 />
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {

    },
});
