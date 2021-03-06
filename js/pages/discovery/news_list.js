import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {
    StyleSheet,
    TouchableHighlight,
    FlatList,
    View,
    Image,
    Text,
} from 'react-native';
import {Toast} from 'antd-mobile';

import {colors} from '../../constants/colors';

@inject('schoolNewsStore')
@observer
class NewsList extends Component {
    async componentDidMount() {
        try {
            this.fetchData();
        } catch (err) {
            console.warn(err);
        }
    }

    fetchData = async () => {
        const {fetchNewsList} = this.props.schoolNewsStore;
        const {type} = this.props;

        try {
            Toast.loading('', 0);
            await fetchNewsList({type});
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        Toast.hide();
    }

    render() {
        const {type} = this.props;
        const {schoolNews} = this.props.schoolNewsStore;
        const newsList = schoolNews[type];

        return (
            <FlatList
                data={newsList}
                keyExtractor={item => item.id}
                style={styles.news_list}
                renderItem={({item, index}) => {
                    return (
                        <TouchableHighlight
                            key={item.id}
                            style={[styles.news_item__wrap, index === 0 ? {marginTop: 10} : null]}
                            underlayColor={colors.fill_tap}
                            onPress={this.onNewsItemTap.bind(this, item.id)}
                        >
                            <View style={styles.news_item}>
                                <Text style={styles.news_item__title}>{item.title}</Text>
                                <Image
                                    style={styles.news_item__cover}
                                    source={{uri: item.cover || item.banner}}
                                />
                            </View>
                        </TouchableHighlight>
                    );
                }}
            />
        );
    }

    onNewsItemTap(newsId) {
        const {navigate} = this.props.navigation;

        navigate('NewsDetail', {newsId});
    }
}

const styles = StyleSheet.create({
    news_list: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.fill_body,
    },
    news_item__wrap: {
        padding: 10,
        marginBottom: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: colors.border_color_base,
        backgroundColor: colors.color_text_base_inverse,
    },
    news_item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    news_item__title: {
        flex: 1,
        color: colors.color_text_base,
        fontSize: 16,
        lineHeight: 24,
    },
    news_item__cover: {
        flexBasis: 60,
        height: 60,
        marginLeft: 20
    }
});

export default NewsList;
