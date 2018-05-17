import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

import PopupMenu from './popup-menu';

function noop() {}

const Back = ({onPress}) => {
    return (
        <TouchableHighlight 
            underlayColor={'#f7f7f7'}
            activeOpacity={1}
            onPress={onPress || noop}
            style={[styles.button, styles.leftButton]}
        >
            <Icon 
                name='md-arrow-back'
                color='#000000' 
                size={25}
            />
        </TouchableHighlight>
    );
};

const More = ({options}) => {
    return (
        <PopupMenu options={options}/>
    );
};

const Refresh = ({onPress}) => {
    return (
        <TouchableHighlight 
            underlayColor={'#f7f7f7'}
            activeOpacity={1}
            onPress={() => onPress()}
            style={[styles.button, styles.rightButton]}
        >
            <Icon 
                name='md-refresh'
                color='#000000' 
                size={25}
            />
        </TouchableHighlight>
    );
};

export const NavBar = ({leftButton, rightButton, config}) => {
    const {title} = config;

    return (
        <NavigationBar
            style={styles.container}
            title={{
                title,
                style: styles.title,
            }}
            rightButton={rightButton}
            leftButton={leftButton}
        />
    );
};

export const BackNavBar = ({navigation, config}) => {
    const {goBack} = navigation;

    return (
        <NavBar
            leftButton={<Back onPress={() => goBack()}/>}
            config={config}
        />
    );
};

export const MoreNavBar = ({navigation, config, moreOptions}) => {
    const {goBack} = navigation;

    return (
        <NavBar
            leftButton={<Back onPress={() => goBack()}/>}
            rightButton={<More options={moreOptions}/>}
            config={config}
        />
    );
};

export const RefreshNavBar = ({navigation, config}) => {
    const {goBack, getParam} = navigation;
    const onRefresh =  getParam('onRefresh') || noop;

    return (
        <NavBar
            leftButton={<Back onPress={() => goBack()}/>}
            rightButton={<Refresh onPress={() => onRefresh()}/>}
            config={config}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontSize: 18,
    },
    button: {
        width: 44,
        borderRadius: 22,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    leftButton: {
        marginLeft: 5,
    },
    rightButton: {
        marginRight: 5,
    },
});
