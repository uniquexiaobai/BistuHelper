import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {BackNavBar} from '../../components/nav-bar';

class SignIn extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '登陆',
        }}/>
    });

    render() {
        const {navigation} = this.props;

        return (
            <View>
                <Text>登陆</Text>
            </View>
        );
    }
}

export default SignIn;
