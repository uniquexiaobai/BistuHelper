import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import * as QQAPI from 'react-native-qq';
import {View, Text} from 'react-native';
import {Button} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {userLogin} from '../../utils/api';
import {handleError} from '../../utils/error';


@inject('accountStore')
@observer
class SignIn extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '登陆',
        }}/>
    });

    render() {
        const {navigation} = this.props;

        return (
            <View>
                <Text>登陆</Text>
                <Button type="primary" onClick={() => this.login()}>QQ登录</Button>
            </View>
        );
    }

    login = async () => {
        const {goBack} = this.props.navigation;

        try {
            const {openid, access_token, oauth_consumer_key} = await QQAPI.login('get_user_info') || {};
            const loggedInUser = await userLogin({
                loginType: 'qq',
                openid,
                access_token,
                oauth_consumer_key,
            });

            this.props.accountStore.login(loggedInUser);
            goBack();
        } catch (err) {
            handleError(err);
        }
    }
}

export default SignIn;
