import React, {Component} from 'react';
import {AsyncStorage, View, Text} from 'react-native';
import {Toast, List} from 'antd-mobile';
const {Item} = List;

import {BackNavBar} from '../../components/nav-bar';

class Library extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '设置',
        }}/>
    });

    render() {
        const {navigation} = this.props;

        return (
            <View>
                <List>
                    <Item arrow="horizontal" onClick={this.clearCache}>清除缓存</Item>
                    <Item arrow="horizontal">退出登陆</Item>
                </List>
            </View>
        );
    }

    clearCache = async () => {
        try {
            await AsyncStorage.clear();

            Toast.info('清除成功', 1);
        } catch (err) {
            Toast.info('清除失败', 1);
        }
    }
}

export default Library;
