import React, {Component} from 'react';
import * as QQAPI from 'react-native-qq';
import {View, Text} from 'react-native';
import {Button} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {userLogin} from '../../utils/api';
import {saveToStorage, getFromStorage} from '../../utils/storage';
import {handleError} from '../../utils/error';

const accountStorageKey = 'BistuHelper__account';

class SignIn extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '登陆',
        }}/>
    });

    async componentDidMount() {
        const user = await getFromStorage(accountStorageKey);

        console.warn(user);
    }

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
        try {
            const {openid, access_token, oauth_consumer_key} = await QQAPI.login('get_user_info') || {};

            const loggedInUser = await userLogin({
                loginType: 'qq',
                openid,
                access_token,
                oauth_consumer_key,
            });
            saveToStorage(accountStorageKey, loggedInUser);
        } catch (err) {
            handleError(err);
        }
    }
}

export default SignIn;
