import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Header1 from '../../Others/Header1';
import { CommonStyles } from '../../../Utilities/GlobalStyles/CommonStyles';

export default function BarCodeScan() {

    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        Alert.alert(
            'Message', `You have Scanned a device with Serial No ${data}`,
            [
                { text: "Scan Again", onPress: () => { setScanned(false) } },
                { text: 'Add Device', onPress: () => navigation.goBack() }
            ],
            { cancelable: false }
        );
    };

    // if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }

    return (
        <View style={CommonStyles.pageContainer}>
            <Header1 />
            <Camera
                style={styles.camera}
                type={type}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    camera: {
        flex: 1,
    },
});
