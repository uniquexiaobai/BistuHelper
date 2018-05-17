import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View, Image, Text} from 'react-native';
import {Toast} from 'antd-mobile';

import Icon from '../../components/icon';
import {mainTabColors, colors} from '../../constants/colors';
import {screenWidth} from '../../utils/screen';

class Discovery extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '发现',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon type='compass' color={focused ? tintColor : mainTabColors.inactiveTintColor}/>
        )
    };

    render() {
        const list = [
            {
                routeName: 'SchoolNews',
                name: '校园新闻',
                logo: require("../../../assets/images/discovery/school-news.png"),
            }, 
            {
                routeName: 'Library',
                name: '图书馆',
                logo: require("../../../assets/images/discovery/library.png"),
            },
            {
                routeName: 'ScoreQuery',
                name: '成绩查询',
                logo: require("../../../assets/images/discovery/score-query.png"),
            }, 
            {
                routeName: 'CetQuery',
                name: '四六级查询',
                logo: require("../../../assets/images/discovery/cet-query.png"),
            },
            {
                name: '寻物招领',
                logo: require("../../../assets/images/discovery/lost.png"),
            },
            {
                name: '校车',
                logo: require("../../../assets/images/discovery/school-bus.png"),
            }, 
            {
                name: '离线地图',
                logo: require("../../../assets/images/discovery/map.png"),
            }, 
            {
                name: '新生专栏',
                logo: require("../../../assets/images/discovery/ask.png"),
            }, 
            {
                name: '教务通知',
                logo: require("../../../assets/images/discovery/notice.png"),
            }, 
            {
                name: '空闲教室',
                logo: require("../../../assets/images/discovery/school-news.png"),
            }, 
            {
                routeName: 'SubwayMap',
                name: '地铁图',
                logo: require("../../../assets/images/discovery/subway-map.png"),
            }, 
            {
                routeName: 'AirQuality',
                name: '空气质量',
                logo: require("../../../assets/images/discovery/air-quality.png"),
            },
            {
                routeName: 'PhoneBook',
                name: '常用电话',
                logo: require("../../../assets/images/discovery/phone-book.png"),
            },
            {
                routeName: 'SchoolCalendar',                
                name: '校历',
                logo: require("../../../assets/images/discovery/school-calendar.png"),
            },
            {
                routeName: 'TimeTable',
                name: '作息时间',
                logo: require("../../../assets/images/discovery/time-table.png"),
            }, 
            {
                routeName: 'SchoolOverview',
                name: '学校概况',
                logo: require("../../../assets/images/discovery/school-overview.png"),
            },
        ];

        return (
            <View style={styles.discovery}>
                {list.map(item => (
                    <TouchableHighlight
                        key={item.name}
                        style={styles.touchView}
                        underlayColor={colors.lightGray}
                        activeOpacity={1}
                        onPress={() => this.onItemPress(item)}
                    >
                        <View style={styles.item}>
                            <Image source={item.logo} style={styles.img}/>
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                ))}
            </View>
        );
    }

    onItemPress(item) {
        const {navigate} = this.props.navigation;

        if (!item.routeName) {
            return Toast.info(`${item.name} 开发中`, 1);
        }
        navigate(item.routeName);
    }
}

const styles = StyleSheet.create({
    discovery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    touchView: {
        borderColor: colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        width: screenWidth / 4,
        height: screenWidth / 4
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 40,
        height: 40,
        marginBottom: 10
    },
    text: {
        fontSize: 12,
        color: colors.color_text_base,
    }
});

export default Discovery;
