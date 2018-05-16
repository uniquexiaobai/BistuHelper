import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {BackNavBar} from '../../components/nav-bar';

class AboutMe extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '关于我们',
        }}/>
    });

    render() {
        return (
            <View>
                <Text>about me</Text>
            </View>
        );
    }
}

export default AboutMe;
