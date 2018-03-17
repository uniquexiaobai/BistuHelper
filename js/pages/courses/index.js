/**
 * Tab Bar 课程表
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {mainTabColors} from '../../constants/colors';

class Courses extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '课程表',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon
                name='md-grid'
                color={focused ? tintColor : mainTabColors.inactiveTintColor}
                size={25}
            />
        )
    };

    render() {
        return (
            <View>
                <Text>课程表aaa</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default Courses;
