import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

class LibraryContact extends Component {
    static navigationOptions = {
        title: '联系方式',
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
                onLoad={() => Toast.hide()}
                source={{uri: 'http://workhard.top/test/library_contact.html'}}
            />
        );
    }
}

export default LibraryContact;
