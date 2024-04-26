import { ToastAndroid } from 'react-native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export const addAndUpdateAlert = (statusCode, message) => {
    if (statusCode == 200) {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: message,
        })
    } else if (statusCode == 204) {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: message,
        })
    }
}

export const errorAlert = (statusCode, message) => {
    if (statusCode == 400) {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: message,
        })
    }
    else if (statusCode == 404) {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: message,
        })
    } else if (statusCode == 500) {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: message,
        })
    } else {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: message,
        })
    }
} 