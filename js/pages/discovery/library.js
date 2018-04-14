import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {StyleSheet, BackHandler, ToolbarAndroid, WebView, View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import HeaderMenu from './header_menu';

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
            {text: '我的借阅', onSelect: navigation.getParam('routeToLibraryBorrow')}
        ]}/>
    });

    @observable backButtonEnabled = false;
    @action
    setBackButtonStatus = (status) => {
        this.backButtonEnabled = status;
    }

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({routeToLibraryBorrow: this.routeToLibraryBorrow});

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

    routeToLibraryBorrow = () => {
        const {navigate} = this.props.navigation;

        navigate('LibraryBorrow');
    };

    navigationStateChangeHandler = (navState) => {
        this.setBackButtonStatus(navState.canGoBack);
    }

    render() {
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
