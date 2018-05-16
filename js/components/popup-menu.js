import React from 'react';
import {MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../constants/colors';

const optionsStyles = {
    optionsContainer: {
        width: 100,
    },
    optionsWrapper: {},
    optionWrapper: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border_color_base,
    },
    optionText: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 13,
        fontSize: 16,
        color: colors.color_text_base,
    },
};

const PopupMenu = ({options = []}) => {
    return (
        <Menu style={{width: 44, height: 44, marginRight: 5, justifyContent: 'center', alignItems: 'center'}}>
            <MenuTrigger style={{width: 44, height: 44, justifyContent: 'center', alignItems: 'center'}}>
                <Icon 
                    name='ios-more' 
                    color='#000000'
                    size={25}
                />
            </MenuTrigger>

            <MenuOptions customStyles={optionsStyles}>
                {
                    options.map(option => (
                        <MenuOption key={option.text} onSelect={option.onSelect} text={option.text} />
                    ))
                }
            </MenuOptions>
        </Menu>
    );
};

export default PopupMenu;
