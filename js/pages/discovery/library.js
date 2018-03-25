import React, {Component} from 'react';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import {StyleSheet, BackHandler, ToolbarAndroid, WebView, View, Text} from 'react-native';
import {MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';

import Icon from 'react-native-vector-icons/Ionicons';

const optionsStyles = {
    optionsContainer: {
        width: 100,
        // marginTop: 50,
        // paddingRight: 20,
        // borderWidth: 1, 
        // borderColor: 'red',
    },
    optionsWrapper: {
        // borderWidth: 1, 
        // borderColor: 'blue',
    },
    optionTouchable: {
        // underlayColor: 'gold',
        // activeOpacity: 70,
    },
    optionText: {
        // color: 'brown',
    },
}

const HeaderMenu = () => {
    return (
        <Menu>
            <MenuTrigger style={{width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                <Icon
                    name='ios-more'
                    color='#000'
                    size={25}
                />
            </MenuTrigger>

            <MenuOptions customStyles={optionsStyles}>
                <MenuOption onSelect={() => alert(`Save`)} text='我的借阅' />
                <MenuOption onSelect={() => alert(`Not called`)} text='待还书籍' />
            </MenuOptions>
        </Menu>
    );
};

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
        headerRight: <HeaderMenu/>
    });

    @observable backButtonEnabled = false;
    @action
    setBackButtonStatus = (status) => {
        this.backButtonEnabled = status;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackHandler)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackHandler)
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
