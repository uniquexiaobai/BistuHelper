import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    StyleSheet,
    TouchableHighlight,
    ListView,
    View,
    Image,
    Text,
} from 'react-native';

import {colors} from '../../constants/colors';
import {pixelWidth} from '../../utils/screen';

import homeActionCreators from './action';

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: this.ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        const {fetchNewsList} = this.props.homeActions;

        fetchNewsList()
            .then(() => {})
            .catch((err) => {});
    }

    componentWillReceiveProps(nextProps) {
        const newsList = nextProps.newsListState.toJS();

        if (newsList) {
            this.setState({
                dataSource: this.ds.cloneWithRows(newsList)
            });
        }
    }

    render() {
        const newsList = this.props.newsListState;

        return (
            <ListView
                style={styles.news_list}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
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
        padding: 10
    },
    news_item__wrap: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
        borderWidth: pixelWidth,
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

function mapStateToProps(state) {
    return {
        newsListState: state.getIn(['home', 'newsList'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        homeActions: bindActionCreators(homeActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
