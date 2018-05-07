import React, {Component} from 'react';
import {observable, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {fetchNewsDetail} from '../../utils/api';

import {mainTabColors, colors} from '../../constants/colors';
import {screenWidth} from '../../utils/screen';

@observer
class NewsDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '新闻详情',
    });

    @observable newsDetail = {};

    @action
    fetchNewsDetail = async (newsId) => {
        try {
            const data = await fetchNewsDetail(newsId);

            runInAction(() => {
                if (data) this.newsDetail = data;
            });
        } catch (e) {
            console.error(e);
        }
    };

    async componentDidMount() {
        const newsId = this.props.navigation.getParam('newsId');

        await this.fetchNewsDetail(newsId);
    }

    render() {
        const newsDetail = this.newsDetail;

        return (
            <ScrollView style={styles.detail}>
                <Text style={styles.detail__title}>{newsDetail.title}</Text>
                <Text style={styles.detail__date}>{newsDetail.date}</Text>
                <View style={styles.detail__content}>
                    {this.getContentLayout(newsDetail.content)}
                </View>
            </ScrollView>
        );
    }

    getContentLayout = (content) => {
        if (content && content.length) {
            const list = content;

            return list.map((section) => (
                <View key={section.text || section.img} style={styles.detail__section}>
                    {this.getSectionLayout(section)}
                </View>
            ));
        }
        else {
            return null;
        }
    }

    getSectionLayout = (section) => {
        if (section.text) {
            return (
                <Text style={styles.detail__text}>{section.text}</Text>
            );
        } else if (section.img) {
            return (
                <Image 
                    style={styles.detail__image}
                    source={{uri: section.img}}
                />
            );
        } else {
            return null;
        }
    };
}

const styles = StyleSheet.create({
    detail: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    detail__title: {
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
    },
    detail__date: {
        marginTop: 5,
        marginBottom: 15,
        textAlign: 'center',
        color: colors.gray51,
    },
    detail__content: {
        paddingBottom: 15,
    },
    detail__section: {
        marginBottom: 15,
    },
    detail__text: {
        fontSize: 16,
        lineHeight: 28,
        color: '#363636',
    },
    detail__image: {
        width: screenWidth - 15 * 2,
        height: (0.75 * (screenWidth - 15 * 2)),
    },
});

export default NewsDetail;
