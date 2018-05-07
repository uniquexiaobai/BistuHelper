import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {createForm} from 'rc-form';
import {Toast, InputItem, Button} from 'antd-mobile';

import {user_signUp} from '../../utils/leancloud';
import {getFromStorage, saveToStorage} from '../../utils/storage';

const libraryAccountStorageKey = 'BistuHelper__library__account';

class LibrarySignIn extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '图书馆账号绑定',
    });

    async componentDidMount() {
        const {username, password} = await getFromStorage(libraryAccountStorageKey);
        const {setFieldsValue} = this.props.form;

        if (!username || !password) return;

        setFieldsValue({
            username: `${username}`,
            password: `${password}`,
        });
    }

    usernameValidator = (rule, value = '', callback) => {
        value = value.trim();
        if (value == '') {
            return callback('用户名不能为空');
        }
        if (!/^\w+$/.test(value)) {
            return callback('用户名只能包含数字');
        }
        return callback();
    };

    passwordValidator = (rule, value = '', callback) => {
        value = value.trim();
        if (value == '') {
            return callback('密码不能为空');
        }
        return callback();
    };

    render() {
        const {navigation} = this.props;
        const {getFieldProps} = this.props.form;

        return (
            <View style={{marginTop: 10, paddingLeft: 10, paddingRight: 10}}>
                <InputItem
                    {...getFieldProps('username', {
                        trigger: 'onChange',
                        rules: [
                            {validator: this.usernameValidator}
                        ]
                    })}
                    placeholder="请输入学号"
                    moneyKeyboardAlign="left"
                    onBlur={this.blur}
                    style={{marginLeft: 0}}
                >
                    用户名
                </InputItem>

                <InputItem
                    {...getFieldProps('password', {
                        trigger: 'onChange',
                        rules: [
                            {validator: this.passwordValidator}
                        ]
                    })}
                    placeholder="请输入密码"
                    type="password"
                    moneyKeyboardAlign="left"
                    style={{marginLeft: 0}}
                >
                    密码
                </InputItem>

                <Button type="primary" style={{marginTop: 15}} onClick={this.submit}>绑定</Button>
            </View>
        );
    }

    submit = () => {
        const {goBack} = this.props.navigation;

        this.props.form.validateFields((error, value) => {
            if (error) {
                error = error || {};
                const k = Object.keys(error)[0];
                Toast.info(error[k].errors[0].message, 1);
            } else {
                const {username, password} = value;

                saveToStorage(libraryAccountStorageKey, {username, password})
                    .then(() => {
                        Toast.success('绑定成功', 1);
                        setTimeout(() => goBack(), 1000);
                    });
            }
        });
    };
}

export default createForm()(LibrarySignIn);
