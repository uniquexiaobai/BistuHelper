import React, {Component} from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';

import {StyleSheet, View, Text} from 'react-native';
import {Accordion, Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';

import AccordionStyle from 'antd-mobile/lib/accordion/style/index.native';

import {fetchLibraryBorrow} from '../../utils/api';
import {getFromStorage, saveToStorage} from '../../utils/storage';
import {colors} from '../../constants/colors';

const libraryAccountStorageKey = 'BistuHelper__library__account';
const libraryBorrowInfoStorageKey = 'BistuHelper__library__borrowInfo';

@observer
class LibraryBorrow extends Component {
    static navigationOptions = () => ({
        title: '借阅信息',
    });

    @observable borrowInfo;
    @observable userInfo;
    @action
    fetchLibraryBorrow = async (params) => {
        try {
            const data = await getFromStorage(libraryBorrowInfoStorageKey);
            if (!data || !Object.keys(data).length) {
                data = await fetchLibraryBorrow(params);
                await saveToStorage(libraryBorrowInfoStorageKey, data);
            }

            runInAction(() => {
                this.borrowInfo = data;
            });
        } catch (e) {
            console.error(e);
        }
    };

    async componentDidMount() {
        const {username, password, name, department} = await getFromStorage(libraryAccountStorageKey);

        if (!username || !password) {
            Toast.info('请先绑定图书馆账号', 1);
            return;
        }
        this.userInfo = {name, department};

        Toast.loading('', 0);
        await this.fetchLibraryBorrow({username, password});
        Toast.hide();
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        const books = this.borrowInfo || [];
        const user = this.userInfo || {};

        return (
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
                {
                    books.length ? (
                        <View style={{marginBottom: 15, paddingLeft: 5}}>
                            <Text style={styles.libraryBorrow__top}>{`${user.name}（${user.department}），目前借书 ${books.length} 本`}</Text>
                        </View>
                    ) : null
                }

                {
                    books.length ? (
                        <Accordion styles={CustomAccordionStyle}>
                            {
                                books.map(book => (
                                    <Accordion.Panel key={book.barCode} header={book.name}>
                                        <Text style={styles.bookMeta__key}>    条码号：</Text>
                                        <Text style={styles.bookMeta__value}> {book.barCode}</Text>{'\n'}
                                        <Text style={styles.bookMeta__key}>借阅日期：</Text>
                                        <Text style={styles.bookMeta__value}> {book.fromDate}</Text>{'\n'}
                                        <Text style={styles.bookMeta__key}>应还日期：</Text>
                                        <Text style={styles.bookMeta__value}> {book.toDate}</Text>{'\n'}
                                        <Text style={styles.bookMeta__key}>    馆藏地：</Text>
                                        <Text style={styles.bookMeta__value}> {book.address}</Text>
                                    </Accordion.Panel>
                                ))
                            }
                        </Accordion>
                    ) : null
                }
            </View>
        );
    }
}

const CustomAccordionStyle = {
    ...AccordionStyle,
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border_color_base,
    },
    headerWrap: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 16,
        color: colors.color_text_base,
    },
    contentText: {
        lineHeight: 25,
        fontSize: 15,
        color: colors.color_text_paragraph,
    },
};

const styles = StyleSheet.create({
    libraryBorrow__top: {
        color: colors.color_text_paragraph,
    },
    bookMeta__key: {
        // fontWeight: 'bold',
    },
    bookMeta__value: {
    }
});

export default LibraryBorrow;
