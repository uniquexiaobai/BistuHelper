import React, {Component} from 'react';
import {WebView, View, Text} from 'react-native';
import {Toast} from 'antd-mobile';

class SubwayMap extends Component {
    static navigationOptions = {
        title: '地铁图',
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
                // contentInset ios only
                onLoad={() => Toast.hide()}
                source={{uri: 'http://workhard.top/test/subway-map.html'}}
            />
        );
    }
}

export default SubwayMap;
