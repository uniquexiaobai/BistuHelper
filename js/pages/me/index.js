import React, {Component} from 'react';
import {StyleSheet, Share, Text, View} from 'react-native';
import {List, Card, Button} from 'antd-mobile';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from '../../components/icon';
import {colors} from '../../constants/colors';
import {feedbackUrl, aboutMeUrl} from '../../constants/url';
import {openURL} from '../../utils/linking';

import ButtonStyle from 'antd-mobile/lib/button/style/index.native';

class Me extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '我',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon type='person' color={focused ? tintColor : colors.fill_gray}/>
        )
    };

    itemThumbView = ({type}) => (
        <View style={{width: 22, height: 22, marginRight: 15}}>
            <MDIcon name={type} size={22} color={colors.brand_primary}/>
        </View>
    );

    render() {
        return (
            <View>
                <View style={{paddingLeft: 20, marginTop: 20}}>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 20, color: colors.color_text_base}}>欢迎来到掌上北信科</Text>    
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Button type="primary" size="small" styles={CustomButtonStyle} style={{marginRight: 15}} onClick={() => this.routeTo('SignIn')}>登陆</Button>
                        <Button type="ghost" size="small" styles={CustomButtonStyle} onClick={() => this.routeTo('SignUp')}>注册</Button>
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <Card full style={{paddingBottom: 0, paddingLeft: 5}}>
                        <Card.Header
                            title="公子小白"
                            thumb="http://7xp8de.com1.z0.glb.clouddn.com/logo.png"
                            thumbStyle={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}
                        />
                    </Card>
                </View>

                <View style={{marginTop: 20}}>
                    <List style={{marginBottom: 20}}>
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

    shareApp = () => {
        Share.share({
            title: '',
            message: 'BistuHelper',
        });
    };
}

const CustomButtonStyle = {
    ...ButtonStyle, 
    smallRaw: {
        height: 30,
        paddingLeft: 25,
        paddingRight: 25,
    },
    smallRawText: {
        fontSize: 14,
    },
};

export default Me;
