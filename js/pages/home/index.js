import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import NewsSlide from './news_slide';
import NewsHot from './news_hot';
import Icon from '../../components/icon';
import {colors} from '../../constants/colors';
import StatusBar from '../../components/status-bar';

class Home extends Component {
    static navigationOptions = {
        header: <StatusBar/>,
        tabBarLabel: '首页',
        tabBarIcon: ({focused, tintColor}) => (
            <View style={{width: 25, height: 25, alignItems: 'center'}}>
                <Icon type='home' color={focused ? tintColor : colors.fill_gray}/>
            </View>
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
