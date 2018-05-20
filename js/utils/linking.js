import {Linking} from 'react-native';

export const openURL = (url) => {
    if (!url) return;
    Linking.openURL(url);
};
