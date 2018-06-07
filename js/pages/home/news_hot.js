import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';

import {colors} from '../../constants/colors'

@inject('newsHotStore')
@observer
class NewsHot extends Component {
    componentDidMount() {
        const {fetchNewsHot} = this.props.newsHotStore;

        fetchNewsHot();
    }

    render() {
        const {newsHot = []} = this.props.newsHotStore;

        return (
            <View style={styles.newsHot}>
                <View style={styles.newsHot__title}>
                    <View style={styles.newsHot__title_icon}></View>
                    <Text style={styles.newsHot__title_text}>校园头条</Text>
                </View>
                {
                    newsHot.map(({id, title}) => (
                        <TouchableHighlight 
                            activeOpacity={1}
                            underlayColor={colors.fill_tap}
                            onPress={() => this.routeToDetail(id)}
                            key={id}
                            style={styles.newsHot__item}
                        >
                            <Text style={styles.newsHot__text}>{title}</Text>
                        </TouchableHighlight>
                    ))
                }
            </View>
        );
    }

    routeToDetail = (newsId) => {
        const {navigate} = this.props.navigation;

        navigate('NewsDetail', {newsId});
    };
}

const styles = StyleSheet.create({
    newsHot: {
        marginTop: 15, 
        backgroundColor: colors.color_text_base_inverse,
    },
    newsHot__title: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    newsHot__title_icon: {
        width: 4,
        height: 12,
        marginRight: 8,
        backgroundColor: colors.brand_primary,
    },
    newsHot__title_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.color_text_base,
    },
    newsHot__item: {
        padding: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border_color_light,
    },
    newsHot__text: {
        lineHeight: 25,
        fontSize: 17,
        color: colors.color_text_base,
    },
})

export default NewsHot;
