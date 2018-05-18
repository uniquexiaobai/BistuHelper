import React, {Component} from 'react';
import {WebView} from 'react-native';
import {Toast} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {schoolMapViewUrl} from '../../constants/url';

class SchoolMap extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '学校地图',
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
                source={{uri: schoolMapViewUrl}}
                onLoad={() => Toast.hide()}
            />
        );
    }
}

export default SchoolMap;
