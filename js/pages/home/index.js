/**
 * Tab Bar 首页
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  StyleSheet, 
  View, 
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import homeActionCreators from './action';
import {mainTabColors} from '../../constants/colors';
import NewsList from './news-list';

class Home extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: '首页',
    tabBarIcon: ({focused, tintColor}) => (<Icon
      name='ios-home'
      color={focused
      ? tintColor
      : mainTabColors.inactiveTintColor}
      size={25}/>)
  };

  componentDidMount() {
    const {fetchNewsList} = this.props.homeActions;

    fetchNewsList()
      .then(() => {
      })
      .catch((err) => {
        // Alert.alert(err.toString());
      });
  }

  render() {
    const {newsList} = this.props.homeState.toJS();

    return (
      <View>
        <NewsList newsList={newsList}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    homeState: state.get('home'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: bindActionCreators(homeActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
