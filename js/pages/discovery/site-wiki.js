import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

import {RightNavBar} from '../../components/nav-bar';
import {siteWikiViewUrl} from '../../constants/url';
import {openURL} from '../../utils/linking';

class SiteWiki extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <RightNavBar navigation={navigation} config={{
            title: '网址导航',
            rightIcon: 'open',
        }}/>
    });

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({onRightPress: () => openURL(siteWikiViewUrl)});
        Toast.loading('', 0);
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        return (
            <WebView
                style={{flex: 1}}
                source={{uri: siteWikiViewUrl}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default SiteWiki;
