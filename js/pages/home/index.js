/**
 * Tab Bar 首页
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {mainTabColors} from '../../constants/colors';
import {colors} from '../../constants/colors';

import NewsList from './news-list';

class Home extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon
                name='ios-home'
                color={focused ? tintColor : mainTabColors.inactiveTintColor}
                size={25}
            />
        )
    };

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.home}>
                <NewsList navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        paddingBottom: 10,
        backgroundColor: colors.whiteSmoke,
    },
});

export default Home;
