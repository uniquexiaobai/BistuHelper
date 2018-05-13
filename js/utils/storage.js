import {AsyncStorage} from 'react-native';

export const getFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        const data = JSON.parse(value);

        return data;
    } catch(err) {
        console.error(err);
    }
};

export const saveToStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch(err) {
        console.error(err);
    }
};
