import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, Share, Text, View} from 'react-native';
import {List, Card, Button} from 'antd-mobile';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import SignInModal from './sign-in_modal';
import Icon from '../../components/icon';
import StatusBar from '../../components/status-bar';
import {colors} from '../../constants/colors';
import {feedbackUrl, aboutMeUrl} from '../../constants/url';
import {openURL} from '../../utils/linking';
import {handleError} from '../../utils/error';

import {CustomSmallButtonStyle} from '../../styles/button';
import ListStyle from 'antd-mobile/lib/list/style/index.native';

@inject('accountStore')
@observer
class Me extends Component {
    static navigationOptions = {
        header: <StatusBar/>,
        tabBarLabel: '我',
        tabBarIcon: ({focused, tintColor}) => (
            <View style={{width: 25, height: 25, alignItems: 'center'}}>
                <Icon type='person' color={focused ? tintColor : colors.fill_gray}/>
            </View>
        )
    };

    itemThumbView = ({type}) => (
        <View style={{width: 22, height: 22, marginRight: 15}}>
            <MDIcon name={type} size={22} color={colors.brand_primary}/>
        </View>
    );

    render() {
        const {currentAccount} = this.props.accountStore;
        // console.warn(currentAccount);

        return (
            <View style={styles.me}>
                <SignInModal/>

                {
                    currentAccount ? (
                        <View style={{marginTop: 20}}>
                            <Card full style={{borderWidth: 0}}>
                                <Card.Header
                                    title={currentAccount.nickname}
                                    thumb={currentAccount.figureurl}
                                    thumbStyle={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
                                />
                            </Card>
                        </View>
                    ) : (
                        <View style={{padding: 20, marginTop: 20, backgroundColor: colors.fill_base}}>
                            <View style={{marginBottom: 10}}>
                                <Text style={{fontSize: 20, color: colors.color_text_base}}>欢迎来到掌上北信科</Text>    
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <Button type="primary" size="small" styles={CustomSmallButtonStyle} style={{marginRight: 15}} onClick={() => this.signIn()}>登陆</Button>
                                <Button type="ghost" size="small" styles={CustomSmallButtonStyle} onClick={() => this.signIn()}>注册</Button>
                            </View>
                        </View>
                    )
                }

                <View style={{marginTop: 20}}>
                    <List styles={CustomListStyle}>
                        <List.Item 
                            arrow="horizontal"
                            thumb={<this.itemThumbView type='school' />}
                            onClick={() => this.routeTo('EducationSignIn')}
                        >
                            教务处绑定
                        </List.Item>

                        <List.Item 
                            arrow="horizontal"
                            thumb={<this.itemThumbView type='library' />}
                            onClick={() => this.routeTo('LibrarySignIn')}
                        >
                            图书馆绑定
                        </List.Item>
                    
                        <List.Item 
                            arrow="horizontal"
                            thumb={<this.itemThumbView type='share-variant' />}
                            onClick={() => this.shareApp()}
                        >
                            分享应用
                        </List.Item>

                        <List.Item 
                            arrow="horizontal"
                            thumb={<this.itemThumbView type='send' />}
                            onClick={() => openURL(feedbackUrl)}
                        >
                            意见反馈
                        </List.Item>

                        <List.Item 
                            arrow="horizontal"
                            thumb={<this.itemThumbView type='information' />}
                            onClick={() => openURL(aboutMeUrl)}
                        >
                            关于我们
                        </List.Item>

                        <List.Item
                            arrow="horizontal"
                            thumb={<this.itemThumbView type='settings' />}
                            onClick={() => this.routeTo('Settings')}
                        >
                            设置
                        </List.Item>
                    </List>
                </View>
            </View>
        );
    }

    routeTo = (routeName) => {
        const {navigate} = this.props.navigation;

        navigate(routeName);
    };

    signIn = () => {
        const {setSignInModalVisible} = this.props.accountStore;

        setSignInModalVisible(true);
    }

    shareApp = () => {
        Share.share({
            title: 'bistuhelper',
            message: 'welcome to bistuhelper',
            url: 'https://bistuhelper.cn', // ios only
        });
    };
}

const CustomListStyle = {
    ...ListStyle,
    Body: {
        ...ListStyle.Body,
        borderTopWidth: 0,
    },
    BodyBottomLine: {
        ...ListStyle.BodyBottomLine,
        borderBottomWidth: 0,
    }
}

const styles = StyleSheet.create({
    me: {
        flex: 1,
        backgroundColor: colors.fill_body,
    },
});

export default Me;
