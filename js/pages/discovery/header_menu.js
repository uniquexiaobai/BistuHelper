import React from 'react';
import {MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

import Icon from 'react-native-vector-icons/Ionicons';

const optionsStyles = {
    optionsContainer: {
        width: 180,
    },
    optionText: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        fontSize: 16,
        color: '#000',
    },
}

const HeaderMenu = ({options = []}) => {
    return (
        <Menu style={{marginRight: 5}}>
            <MenuTrigger style={{width: 40, height: 40, marginRight: 5, justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name='ios-more'
                    color='#000'
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

export default HeaderMenu;
