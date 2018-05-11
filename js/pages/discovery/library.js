import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import {StyleSheet, BackHandler, WebView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PopupMenu from './popup-menu';

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
        headerRight: <PopupMenu options={[
            {text: '我的借阅', onSelect: navigation.getParam('routeToLibraryBorrow')},
            {text: '开放时间', onSelect: navigation.getParam('routeToLibraryOpenTime')},
            {text: '联系方式', onSelect: navigation.getParam('routeToLibraryContact')},
        ]}/>
    });

    @observable backButtonEnabled = false;
    @action
    setBackButtonStatus = (status) => {
        this.backButtonEnabled = status;
    }

    componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({routeToLibraryBorrow: this.routeTo('LibraryBorrow')});
        navigation.setParams({routeToLibraryOpenTime: this.routeTo('LibraryOpenTime')});
        navigation.setParams({routeToLibraryContact: this.routeTo('LibraryContact')});

        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler);
    }

    routeTo = (routeName) => () => {
        const {navigate} = this.props.navigation;

        navigate(routeName);
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
