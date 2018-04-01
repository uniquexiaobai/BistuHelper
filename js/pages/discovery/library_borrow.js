import React, {Component} from 'react';
import {View} from 'react-native';

class LibraryBorrow extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '我的借阅',
        headerStyle: {
            height: 48,
        },
        headerTitleStyle: {
            fontSize: 18,
        },
    });

    render() {
        return (
            <View>我借阅的信息</View>
        );
    }
}

export default LibraryBorrow;
