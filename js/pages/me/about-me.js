import React, {Component} from 'react';
import {View, Text} from 'react-native';

class AboutMe extends Component {
    static navigationOptions = {
        title: '关于我们',
    };

    render() {
        return (
            <View>
                <Text>about me</Text>
            </View>
        );
    }
}

export default AboutMe;
