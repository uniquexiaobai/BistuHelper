import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {Tabs} from 'antd-mobile';

import NewsList from './news_list';

class SchoolNews extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '校园新闻',
    });

    renderContent = (tab, index) => (
        <View>
            <NewsList type={tab.type} navigation={this.props.navigation}/>
        </View>
    );

    render() {
        const {navigation} = this.props;

        const tabs = [
            { title: '综合新闻', type: 'zhxw' },
            { title: '图片新闻', type: 'tpxw' },
            { title: '人才培养', type: 'rcpy' },
            { title: '教学科研', type: 'jxky' },
            { title: '文化活动', type: 'whhd' },
            { title: '校园人物', type: 'xyrw' },
            { title: '交流合作', type: 'jlhz' },
            { title: '社会服务', type: 'shfw' },
            { title: '媒体关注', type: 'mtgz' },
        ];

        return (
            <View style={{flex: 1}}>
                <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
                    {this.renderContent}
                </Tabs>
            </View>
        );
    }
}

export default SchoolNews;
