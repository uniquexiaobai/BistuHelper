import React, {Component} from 'react';
import {View, Text} from 'react-native';

class SignIn extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.routeName
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
