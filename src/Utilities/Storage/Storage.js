
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setOnboarding = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);

    } catch (error) {
        console.log('Error storing value: ', error);
    }

};

export const getOnboarding = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log('Error retrieving value: ', error);
    }
};

export const removeOnboarding = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('Error deleting value: ', error);
    }
}
//removeOnboarding or reset OnBoarding function

// const handleReset = async () => {
//     await removeOnboarding('OnBoarded');
//     navigation.push('OnboardingScreen');
// }


// Local Storage Store Item
export const localStorageStoreItem = (key, data) => {
    AsyncStorage.removeItem(key);
    AsyncStorage.setItem(key, data);
}

//local storage get Item - Object
export const localStorageGetItem = async (key, searchData, globalKey) => {

    const data = await AsyncStorage.getItem(key).then((response) => {

        return JSON.parse(response);

    }).catch((error) => {
        return error;
    })

    const responseData = await data?.length > 0 ? data.map((res, index) => {

        return res[searchData]?.length > 0 ? res[searchData]?.filter((datas) => {
            return datas.key == globalKey && datas.name
        }) : null;
    }) : null;

    return responseData?.length > 0 ? responseData[0][0].name : "null"
}

//Get Single item
export const localStorageGetSingleItem = async (key) => {

    const data = await AsyncStorage.getItem(key).then((response) => {
        return JSON.parse(response)
    }).catch((error) => {
        return error
    })
    return data;
}

export const localStorageDelete = async (key) => {
    let data = await AsyncStorage.removeItem(key);
    return data
}



