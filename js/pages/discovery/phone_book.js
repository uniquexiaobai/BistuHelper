import React, {Component} from 'react';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Linking, Alert, View, Text} from 'react-native';
import {SearchBar, List} from 'antd-mobile';

import {BackNavBar} from '../../components/nav-bar';
import {colors} from '../../constants/colors';

import CustomSearchBarStyle from '../../styles/search-bar';

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

@observer
class PhoneBook extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <BackNavBar navigation={navigation} config={{
            title: '常用电话',
        }}/>
    });

    @observable searchValue = '';

    @action
    setSearchValue(value) {
        this.searchValue = value;
    }

    @computed
    get filteredPersons() {
        if (!this.searchValue) return persons;

        return persons.filter(person => {
            return person.name.includes(this.searchValue)
        });
    }

    render() {
        return (
            <View>
                <SearchBar
                    styles={CustomSearchBarStyle}
                    value={this.searchValue}
                    placeholder="Search"
                    blurOnSubmit
                    maxLength={8}
                    onChange={value => this.setSearchValue(value)}
                    onCancel={() => this.setSearchValue('')}
                />

                <List>
                    {
                        this.filteredPersons.map(person => (
                            <List.Item
                                extra={this.renderItemExtra(person.number)}
                                key={person.number}
                                onClick={() => this.showDialModal(person.number)} 
                            >
                                {person.name}
                            </List.Item>
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
