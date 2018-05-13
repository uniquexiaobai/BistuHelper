import React, {Component} from 'react';
import {WebView, View, Text} from 'react-native';
import {Toast} from 'antd-mobile';

class AirQuality extends Component {
    static navigationOptions = {
        title: '空气质量',
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
                source={{uri: 'https://m.castform.cloud/'}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default AirQuality;
