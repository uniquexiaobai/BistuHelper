import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {libraryOpenTimeViewUrl} from '../../constants/url';

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
                source={{uri: libraryOpenTimeViewUrl}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default LibraryOpenTime;
