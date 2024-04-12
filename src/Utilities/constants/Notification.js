import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';


const Notification = ({ setFirebaseToken }) => {

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            //  console.log('Authorization status:', authStatus);
        }
    }
    useEffect(() => {
        if (requestUserPermission()) {
            messaging().getToken().then(token => {
                //console.log(`Firebase Push Notification Token = ${token}`);
                setFirebaseToken(token)
            })
        } else {
            //  console.log('Failed token status', authStatus)
        }

        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );

                }
            });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });

        // Register background handler
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            //  console.log('Message handled in the background!', remoteMessage);
        });


        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;

    }, [])

}


export default Notification;




