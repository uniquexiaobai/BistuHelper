import React from 'react';
import {StatusBar, Platform, View} from 'react-native';

import {colors} from '../constants/colors';

export default () => (
    <View style={Platform.OS === 'ios' ? {height: 20, backgroundColor: colors.brand_primary} : null}>
        <StatusBar animated barStyle='light-content' backgroundColor={colors.brand_primary}/>
    </View>
);