import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {View} from 'react-native';
import {Toast, List} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {clearStorage} from '../../utils/storage';
import {handleError} from '../../utils/error';
import {CodePush__sync} from '../../utils/code-push';

@inject('accountStore')
@observer
class Library extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '设置',
        }}/>
    });

    render() {
        return (
            <View>
                <List>
                    <List.Item arrow="horizontal" onClick={this.clearCache}>清除缓存</List.Item>
                    <List.Item arrow="horizontal" onClick={this.checkForUpdate}>检查更新</List.Item>
                    <List.Item arrow="horizontal" onClick={this.logout}>退出登陆</List.Item>
                </List>
            </View>
        );
    }

    checkForUpdate = () => {
        CodePush__sync();
    };

    logout = () => {
        const {goBack} = this.props.navigation;

        this.props.accountStore.logout();
        goBack();
    };

    clearCache = async () => {
        try {
            await clearStorage();
            Toast.info('清除成功', 1);
        } catch (err) {
            handleError(err);
            Toast.info('清除失败', 1);
        }
    };
}

export default Library;
