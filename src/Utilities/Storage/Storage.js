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
