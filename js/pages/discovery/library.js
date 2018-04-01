import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {StyleSheet, BackHandler, ToolbarAndroid, WebView, View, Text} from 'react-native';
import mitt from 'mitt';

import Icon from 'react-native-vector-icons/Ionicons';
import HeaderMenu from './header_menu';

const emitter = mitt();

@observer
class Library extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '图书馆',
        headerStyle: {
            height: 48,
        },
        headerTitleStyle: {
            fontSize: 18,
        },
        headerRight: <HeaderMenu options={[
            {text: '我的借阅', onSelect: () => {
                emitter.emit('navigateToLibraryBorrow');
            }}
        ]}/>
    });

    @observable backButtonEnabled = false;
    @action
    setBackButtonStatus = (status) => {
        this.backButtonEnabled = status;
    }

    componentDidMount() {
        const {navigate} = this.props.navigation;

        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
        emitter.on('navigateToLibraryBorrow', () => {
            // console.warn('hello', navigate);
            // navigate('LibraryBorrow');
        });
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
        const {navigation} = this.props;

        return (
            <WebView
                ref={(r) => this.webview_ref = r}
                source={{uri: 'http://lib-m.bistu.edu.cn:8080/sms/opac/search/showiphoneSearch.action'}}
                style={styles.library}
                onNavigationStateChange={this.navigationStateChangeHandler}
                injectedJavaScript={'(() => {document.querySelector(".search").style.background="#fff"})()'}
            />
        )
    }
}

const styles = StyleSheet.create({
    library: {
        borderWidth: 1,
        borderColor: 'red',
    },
});

export default Library;
