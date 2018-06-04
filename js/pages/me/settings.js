import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {AsyncStorage, View, Text} from 'react-native';
import {Toast, List} from 'antd-mobile';
const {Item} = List;

import {BackNavBar} from '../../components/nav-bar';
import {clearStorage} from '../../utils/storage';
import {handleError} from '../../utils/error';

@inject('accountStore')
@observer
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
                    <Item arrow="horizontal" onClick={this.logout}>退出登陆</Item>
                </List>
            </View>
        );
    }

    logout = () => {
        const {goBack} = this.props.navigation;

        this.props.accountStore.logout();
        goBack();
    }

    clearCache = async () => {
        try {
            await clearStorage();
            Toast.info('清除成功', 1);
        } catch (err) {
            handleError(err);
            Toast.info('清除失败', 1);
        }
    }
}

export default Library;
