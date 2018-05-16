import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';

class LibraryOpenTime extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '开放时间',
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
                onLoad={() => Toast.hide()}
                source={{uri: 'http://workhard.top/test/library_open-time.html'}}
            />
        );
    }
}

export default LibraryOpenTime;
