import React, {Component} from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {StyleSheet, View, Text} from 'react-native';
import {Accordion, Toast} from 'antd-mobile';

import {RefreshNavBar} from '../../components/nav-bar';
import {fetchLibraryBorrow} from '../../utils/api';
import {getFromStorage, saveToStorage} from '../../utils/storage';
import {colors} from '../../constants/colors';
import CustomAccordionStyle from '../../styles/accordion';

const libraryAccountStorageKey = 'BistuHelper__library__account';
const libraryBorrowInfoStorageKey = 'BistuHelper__library__borrowInfo';

@observer
class LibraryBorrow extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <RefreshNavBar navigation={navigation} config={{
            title: '借阅信息',
        }}/>
    });

    @observable borrowInfo;
    @observable userInfo;
    @action
    fetchLibraryBorrow = async (params, force) => {
        let data;

        try {
            if (force) {
                data = await fetchLibraryBorrow(params);
            } else {
                data = await getFromStorage(libraryBorrowInfoStorageKey);
            }

            if (!data) {
                data = await fetchLibraryBorrow(params);
            }
            if (!data) return;
            
            await saveToStorage(libraryBorrowInfoStorageKey, data);

            runInAction(() => {
                this.borrowInfo = data;
            });
        } catch (e) {
            console.error(e);
        }
    };

    async componentDidMount() {
        const {navigation} = this.props;

        navigation.setParams({onRefresh: () => this.fetchData(true)});
        this.fetchData();
    }

    fetchData = async (force) => {
        const {navigate} = this.props.navigation;
        let user;

        try {
            user = await getFromStorage(libraryAccountStorageKey);
            const {username, password, name, department} = user || {};

            if (!username || !password) {
                Toast.info('请先绑定图书馆账号', 1);
                setTimeout(() => navigate('LibrarySignIn'), 1000);
                return;
            }
            this.userInfo = {name, department};

            Toast.loading('', 0);
            await this.fetchLibraryBorrow({username, password}, force);
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        const books = this.borrowInfo || [];
        const user = this.userInfo || {};

        return (
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
                <View style={{marginBottom: 15, paddingLeft: 5}}>
                    <Text style={styles.libraryBorrow__top}>{`${user.name}（${user.department}），目前借书 ${books.length} 本`}</Text>
                </View>

                <Accordion styles={CustomAccordionStyle}>
                    {
                        books.map(book => (
                            <Accordion.Panel key={book.barCode} header={book.name}>
                                <Text>    条码号：</Text>
                                <Text> {book.barCode}</Text>{'\n'}
                                <Text>借阅日期：</Text>
                                <Text> {book.fromDate}</Text>{'\n'}
                                <Text>应还日期：</Text>
                                <Text> {book.toDate}</Text>{'\n'}
                                <Text>    馆藏地：</Text>
                                <Text> {book.address}</Text>
                            </Accordion.Panel>
                        ))
                    }
                </Accordion>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    libraryBorrow__top: {
        color: colors.color_text_paragraph,
    },
});

export default LibraryBorrow;
