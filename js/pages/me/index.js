/**
 * Tab Bar 我
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {mainTabColors} from '../../constants/colors';

import {Button} from 'antd-mobile';

class Me extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '我',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon
                name='md-person'
                color={focused ? tintColor : mainTabColors.inactiveTintColor}
                size={25}
            />
        )
    };

    render() {
        return (
            /*<Container>
            <Content>
            <List>
                <ListItem itemDivider>
                <Text>账户管理</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>更改密码</Text>
                </ListItem>
            </List>

            <List>
                <ListItem itemDivider>
                <Text>模块设置</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>提醒设置</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>清除缓存</Text>
                </ListItem>
            </List>

            <List>
                <ListItem itemDivider>
                <Text>关于</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>意见反馈</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>关于此软件</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>推荐给同学</Text>
                </ListItem>
                <ListItem button onPress={() => {}}>
                <Thumbnail source={require('../public/img/alarm@2x.png')} style={{width: 20, height: 20}}/>
                <Text>检查更新</Text>
                </ListItem>
            </List>
            </Content>
        </Container>*/ 
            <View>
                <Button>me</Button>
            </View>
        );
    }
}

export default Me;
