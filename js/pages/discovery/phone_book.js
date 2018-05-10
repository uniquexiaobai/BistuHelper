import React, {Component} from 'react';
import {View, Text} from 'react-native';

class PhoneBook extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '常用电话',
    });

    render() {
        const {navigation} = this.props;

        return (
            <View>
                <Text>hello {navigation.state.routeName}</Text>
            </View>
        );
    }
}

export default PhoneBook;
