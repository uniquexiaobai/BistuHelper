import React, {Component} from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';

import {View, Text} from 'react-native';
import {Toast} from 'antd-mobile';

import {fetchBorrowInfo} from '../../utils/api';

@observer
class LibraryBorrow extends Component {
    static navigationOptions = () => ({
        title: '我的借阅'
    });

    @observable borrowInfo;
    @action
    fetchBorrowInfo = async (params) => {
        try {
            const data = await fetchBorrowInfo(params);

            runInAction(() => {
                this.borrowInfo = data;
            });
        } catch (e) {
            console.error(e);
        }
    };

    async componentDidMount() {
        const {params} = this.props.navigation.state;
        const {username, password} = params;

        Toast.loading('加载中...', 0);
        await this.fetchBorrowInfo({username, password});
        Toast.hide();
    }

    render() {
        console.warn(this.borrowInfo);

        return (
            <View>
                <Text>我的借阅</Text>
            </View>
        );
    }
}

export default LibraryBorrow;
