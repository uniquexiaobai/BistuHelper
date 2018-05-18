import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {timeTableViewUrl} from '../../constants/url';

class TimeTable extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '作息时间',
        }}/>
    });

    componentDidMount() {
        Toast.loading('', 0);
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        return (
            <WebView
                source={{uri: timeTableViewUrl}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default TimeTable;
