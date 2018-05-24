import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../constants/colors';

const iconMap = {
    'refresh': 'md-refresh',
    'back': 'md-arrow-back',
    'more': 'ios-more',
    'add': 'md-add',
    'home': 'ios-home',
    'grid': 'md-grid',
    'compass': 'ios-compass',
    'person': 'md-person',
    'open': 'md-open',
};

export default ({type, color=colors.color_text_base, size=25}) => (
    <Icon 
        name={iconMap[type]}
        color={color} 
        size={size}
    />
);
