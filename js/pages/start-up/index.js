/**
 * app 启动引导页
 */

import React, {Component} from 'react';
import {StyleSheet, Dimensions, Animated, View, Text} from 'react-native';

import {navigationReset} from '../../utils/navigation';
import {screenWidth, screenHeight} from '../../utils/screen';

class StartUp extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    const {navigation} = this.props;

    Animated
      .timing(this.state.bounceValue, {
      toValue: 0,
      duration: 1000
    })
      .start();

    this.timer = setTimeout(() => {
      navigationReset(navigation, 'Home');
    }, 1000);
  }

  componentWillUnMount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.View
        style={{
        width: screenWidth,
        height: screenHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        opacity: this.state.bounceValue
      }}>
        <View>
          <Text style={styles.guide_font}>Bistu Helper</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  guide_font: {
    fontSize: 30,
    color: 'red'
  }
});

export default StartUp;
