import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';

const Back = ({onPress}) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.6}
            onPress={onPress}
            style={styles.button}
        >
            <Icon 
                name='md-arrow-back'
                color='#000000' 
                size={25}
            />
        </TouchableOpacity>
    );
}

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
}

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
});
