import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {createForm} from 'rc-form';
import {Toast, InputItem, Button} from 'antd-mobile';

import {user_signUp} from '../../utils/leancloud';
import {getFromStorage, saveToStorage} from '../../utils/storage';
import {fetchEducationBase} from '../../utils/api';

const educationAccountStorageKey = 'BistuHelper__education__account';

class LibrarySignIn extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '教务处账号绑定',
    });

    async componentDidMount() {
        const {username, password} = await getFromStorage(educationAccountStorageKey);
        const {setFieldsValue} = this.props.form;

        if (!username || !password) return;

        setFieldsValue({
            username: `${username}`,
            password: `${password}`,
        });
    }

    componentWillUnmount() {
        Toast.hide();
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

    fetchAndSaveBase = async (body) => {
        try {
            const data = await fetchEducationBase(body);
            const account = Object.assign({}, data, body);
            await saveToStorage(educationAccountStorageKey, account);
        } catch (err) {
            throw err;
        }
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

                Toast.loading('绑定账号中...', 0);
                this.fetchAndSaveBase({username, password})
                    .then(() => {
                        Toast.hide();
                        Toast.success('绑定成功', 1);
                        setTimeout(() => goBack(), 1000);
                    })
                    .catch(err => {
                        Toast.hide();
                        Toast.fail(`${err.message || '绑定失败'}, 请重试`, 1);
                    });
            }
        });
    };
}

export default createForm()(LibrarySignIn);
