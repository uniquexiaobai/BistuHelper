/**
 * Tab Bar 首页
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  Image,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { mainTabColors } from '../../constants/colors';
import { screenWidth, pixelWidth } from '../../utils/screen';

class Discovery extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: '发现',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name='ios-compass' color={focused ? tintColor : mainTabColors.inactiveTintColor} size={25} />
    )
  };

  render() {
    const list = [
      { routeName: 'Library', name: '图书馆', logo: require("../../../assets/images/discovery/library.png") },
      { name: '校园新闻', logo: require("../../../assets/images/discovery/news.png") },
      { name: '教务新闻', logo: require("../../../assets/images/discovery/news.png") },
      { name: '讲座预告', logo: require("../../../assets/images/discovery/lecture.png") },
      { name: '寻物招领', logo: require("../../../assets/images/discovery/lost.png") },
      { routeName: 'PhoneBook', name: '常用电话', logo: require("../../../assets/images/discovery/phone.png") },
      { routeName: 'LifeService', name: '生活服务', logo: require("../../../assets/images/discovery/life.png") },
      { routeName: 'SchoolBus', name: '校车', logo: require("../../../assets/images/discovery/bus.png") },
      { routeName: 'OfflineMap', name: '离线地图', logo: require("../../../assets/images/discovery/map.png") },
      { name: '新生专栏', logo: require("../../../assets/images/discovery/ask.png") },
      { name: '教务通知', logo: require("../../../assets/images/discovery/notice.png") },
      { name: '空闲教室', logo: require("../../../assets/images/discovery/news.png") },
      { routeName: 'SchoolCalendar', name: '校历', logo: require("../../../assets/images/discovery/calendar.png") },
      { name: '成绩查询', logo: require("../../../assets/images/discovery/grade.png") },
      { name: '四六级查询', logo: require("../../../assets/images/discovery/grade.png") },
      { routeName: 'SchoolOverview', name: '学校概况', logo: require("../../../assets/images/discovery/about.png") },
    ];

    return (
      <View style={styles.discovery}>
        {
          list.map(item => (
            <TouchableHighlight
              key={item.name}
              style={styles.touchView}
              underlayColor='#ccc'
              onPress={this.onItemPress.bind(this, item.routeName)}
            >
              <View style={styles.item}>
                <Image source={item.logo} style={styles.img}/>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          ))
        }
      </View>
    );
  }

  onItemPress(routeName) {
    // ToastAndroid.show(routeName, ToastAndroid.SHORT);
    const { navigate } = this.props.navigation;

    navigate(routeName);
  }
}

const styles = StyleSheet.create({
  discovery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchView: {
    borderColor: '#E5E5E5',
    borderWidth: pixelWidth,
    width: screenWidth / 4,
    height: screenWidth / 4,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: '#000',
  }
});

export default Discovery;
