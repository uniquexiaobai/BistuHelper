import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createForm} from 'rc-form';
import {Toast, InputItem, Button} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {user_signUp} from '../../utils/leancloud';

class SignUp extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '注册',
        }}/>
    });

    usernameValidator = (rule, value = '', callback) => {
        value = value.trim();
        if (value == '') {
            return callback('用户名不能为空');
        }
        if (!/^\w+$/.test(value)) {
            return callback('用户名只能包含大小写字母/数字/下划线');
        }
        return callback();
    };

    passwordValidator = (rule, value = '', callback) => {
        value = value.trim();
        if (value == '') {
            return callback('密码不能为空');
        }
        if (!/^\w+$/.test(value)) {
            return callback('密码只能包含大小写字母/数字/下划线');
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
                    placeholder="请输入用户名"
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

                <Button type="primary" style={{marginTop: 15}} onClick={this.submit}>注册</Button>
            </View>
        );
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
            if (error) {
                error = error || {};
                const k = Object.keys(error)[0];
                Toast.info(error[k].errors[0].message, 1);
            } else {
                const {username, password} = value;

                user_signUp({username, password}, (user) => {
                    console.warn(user);
                }, (error) => {
                    console.warn(error);
                });
            }
        });
    }
}

export default createForm()(SignUp);
