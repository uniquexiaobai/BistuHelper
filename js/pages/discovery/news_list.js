import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {
    StyleSheet,
    TouchableHighlight,
    ListView,
    View,
    Image,
    Text,
} from 'react-native';

import {colors} from '../../constants/colors';

@inject('schoolNewsStore')
@observer
class NewsList extends Component {
    ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    async componentDidMount() {
        const {fetchNewsList} = this.props.schoolNewsStore;
        const {type} = this.props;

        await fetchNewsList({type});
    }

    render() {
        const {type} = this.props;
        const schoolNews = this.props.schoolNewsStore.schoolNews;
        const newsList = [...schoolNews[type]];

        return (
            <ListView
                style={styles.news_list}
                enableEmptySections={true}
                dataSource={this.ds.cloneWithRows(newsList)}
                renderRow={(news) => (
                    <TouchableHighlight
                        key={news.id}
                        style={styles.news_item__wrap}
                        underlayColor={colors.lightGray}
                        onPress={this.onNewsItemTap.bind(this, news.id)}
                    >
                        <View style={styles.news_item}>
                            <Text style={styles.news_item__title}>{news.title}</Text>
                            <Image
                                style={styles.news_item__cover}
                                source={{uri: news.cover || news.banner}}
                            />
                        </View>
                    </TouchableHighlight>
                )}
            />
        )
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
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: colors.whiteSmoke,
    },
    news_item__wrap: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: colors.lightGray,
        backgroundColor: '#fff'
    },
    news_item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    news_item__title: {
        flex: 1,
        color: '#000',
        fontSize: 18,
        lineHeight: 25
    },
    news_item__cover: {
        flexBasis: 80,
        height: 80,
        marginLeft: 20
    }
});

export default NewsList;
