import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {StyleSheet, View, Text} from 'react-native';

import StartUp from './pages/start-up';
import Home from './pages/home';
import Course from './pages/course';
import Discovery from './pages/discovery';
import Me from './pages/me';
import courseRoutes from './pages/course/routes';
import discoveryRoutes from './pages/discovery/routes';
import MeRoutes from './pages/me/routes';

import {mainTabColors, colors} from './constants/colors';

const MainTabNavigator = TabNavigator({
    Home: {
        screen: Home
    },
    Course: {
        screen: Course
    },
    Discovery: {
        screen: Discovery
    },
    Me: {
        screen: Me
    }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
        showIcon: true,
        activeTintColor: mainTabColors.activeTintColor,
        inactiveTintColor: mainTabColors.inactiveTintColor,
        style: {
            backgroundColor: '#fff',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colors.lightGray
        },
        tabStyle: {
            paddingTop: 4.5,
            paddingBottom: 4.5
        },
        indicatorStyle: {
            height: 0
        },
        labelStyle: {
            fontSize: 12,
            marginBottom: 0,
            marginTop: 0
        },
        iconStyle: {}
    }
});

const MainStackNavigator = StackNavigator({
    StartUp: {
        screen: StartUp
    },
    Home: {
        screen: MainTabNavigator
    },
    ...courseRoutes,
    ...discoveryRoutes,
    ...MeRoutes,
}, {
    initialRouteName: 'Home',
    navigationOptions: {
        
    },
    cardStyle: {
        backgroundColor: '#fff'
    }
});

export default MainStackNavigator;
