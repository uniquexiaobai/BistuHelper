import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {BackHandler, WebView, StyleSheet, View, Text} from 'react-native';

@observer
class SubwayMap extends Component {
    static navigationOptions = {
        title: '地铁图',
    };

    @observable backButtonEnabled = false;
    @action
    setBackButtonStatus = (status) => {
        this.backButtonEnabled = status;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
    }

    onBackHandler = () => {
        if (this.backButtonEnabled) {
            this.webview_ref.goBack();
            return true;
        }
        return false;
    }

    navigationStateChangeHandler = (navState) => {
        this.setBackButtonStatus(navState.canGoBack);
    }

    render() {
        return (
            <WebView
                ref={(r) => this.webview_ref = r}
                onShouldStartLoadWithRequest={(state) => console.warn(state)}
                source={{uri: 'http://workhard.top/test/subway.html'}}
                onNavigationStateChange={this.navigationStateChangeHandler}
                injectedJavaScript={'(() => {document.querySelector(".search").style.background="#fff"})()'}
            />
        );
    }
}

export default SubwayMap;
