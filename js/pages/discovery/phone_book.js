import React, {Component} from 'react';
import {Linking, Alert, View, Text} from 'react-native';
import {List} from 'antd-mobile';
const {Item} = List;

import {BackNavBar} from '../../components/nav-bar';
import {colors} from '../../constants/colors';

const persons = [
    {name: '治安办公室', number: '82426114'},
    {name: '门诊一部', number: '82426121'},
    {name: '门诊二部', number: '64884870'},
    {name: '心理咨询预约', number: '62843779'},
    {name: '校园卡自助服务', number: '62841188'},
    {name: '成绩与学籍管理', number: '82426824'},
    {name: '行政办公', number: '82426830'},
    {name: '本科生就业', number: '82426857'},
    {name: '网站维护及技术支持', number: '82426946'},
];

class PhoneBook extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '常用电话',
        }}/>
    });

    render() {
        return (
            <View style={{marginTop: 10}}>
                <List>
                    {
                        persons.map(person => (
                            <Item 
                                extra={this.renderItemExtra(person.number)}
                                key={person.number}
                                onClick={() => this.showDialModal(person.number)} 
                            >
                                {person.name}
                            </Item>
                        ))
                    }
                </List>
            </View>
        );
    }

    renderItemExtra = (extra) => {
        return (
            <Text style={{color: colors.color_text_base}}>{extra}</Text>
        );
    }

    showDialModal = (number) => {
        Alert.alert(
            '',
            `确定要拨打号码 ${number}`,
            [
              {text: '取消', style: 'cancel'},
              {text: '确定', onPress: () => Linking.openURL(`tel:${number}`)},
            ],
            { cancelable: false }
          )
    };
}

export default PhoneBook;
