import React, {Component} from 'react';

import {StyleSheet, View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import NewsHot from './news_hot';

import {mainTabColors} from '../../constants/colors';

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
                <NewsHot navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        
    }
});

export default Home;
