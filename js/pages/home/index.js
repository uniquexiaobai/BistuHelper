import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import NewsHot from './news_hot';
import Icon from '../../components/icon';
import {mainTabColors, colors} from '../../constants/colors';

class Home extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon type='home' color={focused ? tintColor : mainTabColors.inactiveTintColor}/>
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
        
    },
});

export default Home;
