import React, {Component} from 'react';
import {WebView, View, Text} from 'react-native';
import {Toast} from 'antd-mobile';

class TimeTable extends Component {
    static navigationOptions = {
        title: '作息时间',
    };

    componentDidMount() {
        Toast.loading('', 0);
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        return (
            <WebView
                source={{uri: 'http://workhard.top/test/time-table.html'}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default TimeTable;
