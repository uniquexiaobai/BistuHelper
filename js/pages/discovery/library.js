import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Library extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.routeName
    });

    render() {
        const {navigation} = this.props;

        return (
            <View>
                <Text>hello {navigation.state.routeName}</Text>
            </View>
        )
    }
}

export default Library;
