import {AsyncStorage} from 'react-native';

import {handleError} from './error';

export const getFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        const data = JSON.parse(value);

        return data;
    } catch (err) {
        handleError(err);
    }
};

export const saveToStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        handleError(err);
    }
};

export const removeFromStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (err) {
        handleError(err);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (err) {
        handleError(err);
    }
};
