import { ToastAndroid } from 'react-native';
export const addAndUpdateAlert = (statusCode , message) =>{
    if(statusCode == 200){
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
        )
    }else if(statusCode == 204){
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
        )
    }
} 
export const errorAlert = (statusCode , message) =>{
    if(statusCode == 404){
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
        )
    }else if(statusCode == 500){
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
        )
    }else{
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            50,
        )
    }
} 