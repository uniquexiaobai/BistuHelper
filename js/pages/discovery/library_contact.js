import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {libraryContactViewUrl} from '../../constants/url';

class LibraryContact extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '联系方式',
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
                source={{uri: libraryContactViewUrl}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default LibraryContact;
