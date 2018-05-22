import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import NewsSlide from './news_slide';
import NewsHot from './news_hot';
import Icon from '../../components/icon';
import {colors} from '../../constants/colors';

class Home extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon type='home' color={focused ? tintColor : colors.fill_gray}/>
        )
    };

    render() {
        const {navigation} = this.props;

        return (
            <ScrollView style={styles.home}>
                <NewsSlide navigation={navigation}/>
                <NewsHot navigation={navigation}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: colors.fill_body,
    },
});

export default Home;
