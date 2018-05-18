import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../constants/colors';

const iconMap = {
    'refresh': 'md-refresh',
    'back': 'md-arrow-back',
    'more': 'ios-more',
    'add': 'md-add',
    'grid': 'md-grid',
    'compass': 'ios-compass',
    'home': 'ios-home',
    'person': 'md-person',
    'right': 'ios-return-right',
    'bus': 'ios-bus',
};

export default ({type, color=colors.color_text_base}) => (
    <Icon 
        name={iconMap[type]}
        color={color} 
        size={25}
    />
);
