import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import * as QQAPI from 'react-native-qq';
import * as WeiboAPI from 'react-native-weibo';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {Modal} from 'antd-mobile';

import {userLogin} from '../../utils/api';
import {colors} from '../../constants/colors';

@inject('accountStore')
@observer
class SignInModal extends Component {
    render() {
        const {setSignInModalVisible, signInModalVisible} = this.props.accountStore;

        return (
            <Modal
                visible={signInModalVisible}
                maskClosable
                transparent
                animationType="slide"
                onClose={() => setSignInModalVisible(false)}
                footer={[{ text: '取消', onPress: () => setSignInModalVisible(false)}]}
            >
                <View style={styles.signIn}>
                    <Text style={styles.signIn__title}>登录</Text>

                    <View style={styles.signIn__body}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.signIn()}
                        >
                            <View style={styles.signIn__block}>
                                <Image style={styles.signIn__icon} source={require('../../../assets/images/me/qq.png')}/>
                                <Text style={styles.signIn__desc}>QQ登录</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{marginLeft: 40}}
                            activeOpacity={1}
                            onPress={() => this.signIn0()}
                        >
                            <View>
                                <Image style={styles.signIn__icon} source={require('../../../assets/images/me/wechat.png')}/>
                                <Text style={styles.signIn__desc}>微博登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    signIn0 = async () => {
        const {setSignInModalVisible, login} = this.props.accountStore;

        try {
            const {userID, accessToken} = await WeiboAPI.login();
            const loggedInUser = await userLogin({
                loginType: 'weibo',
                openid: userID,
                access_token: accessToken,
            });
            
            await login(loggedInUser);
            setSignInModalVisible(false);
        } catch (err) {
            setSignInModalVisible(false);
            handleError(err);
        }
    };

    signIn = async () => {
        const {setSignInModalVisible, login} = this.props.accountStore;
        
        try {
            const {openid, access_token, oauth_consumer_key} = await QQAPI.login('get_user_info') || {};
            const loggedInUser = await userLogin({
                loginType: 'qq',
                openid,
                access_token,
                oauth_consumer_key,
            });

            await login(loggedInUser);
            setSignInModalVisible(false);
        } catch (err) {
            setSignInModalVisible(false);
            handleError(err);
        }
    };
}

const styles = StyleSheet.create({
    signIn: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signIn__title: {
        marginBottom: 25,
        color: colors.color_text_base,
        fontSize: 22,
    },
    signIn__body: {
        flexDirection: 'row',
    },
    signIn__block: {
        alignItems: 'center',
    },
    signIn__icon: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    signIn__desc: {
        marginTop: 10,
        color: colors.color_text_base,
    },
});

export default SignInModal;
