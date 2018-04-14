import React, {Component} from 'react';
import {View, Text} from 'react-native';

class LibraryBorrow extends Component {
    static navigationOptions = () => ({
        title: '我的借阅'
    });

    render() {
        return (
            <View>
                <Text>我的借阅</Text>
            </View>
        );
    }
}

export default LibraryBorrow;
