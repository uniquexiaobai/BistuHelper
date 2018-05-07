import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Carousel} from 'antd-mobile';

@inject('newsHotStore')
@observer
class NewsHot extends Component {
    async componentDidMount() {
        try {
            const {fetchNewsHot} = this.props.newsHotStore;

            await fetchNewsHot();
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        const {newsHot = []} = this.props.newsHotStore;

        return (
            <View style={{padding: 10}}>
                <Carousel autoplayInterval={5000} autoplay infinite>
                    {
                        newsHot.map(item => (
                            <TouchableOpacity style={styles.newsHot__item} activeOpacity={1} key={item.id} onPress={() => this.routeToDetail(item.id)}>
                                <Image
                                    style={styles.newsHot__image}
                                    source={{uri: item.image}}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </Carousel>
            </View>
        );
    }

    routeToDetail = (newsId) => {
        const {navigate} = this.props.navigation;

        navigate('NewsDetail', {newsId});
    }
}

const styles = StyleSheet.create({
    newsHot__item: {
        height: 180,
        flexGrow: 1,
        flexDirection: "row",
        alignItems: "stretch"
    },
    newsHot__image: {
        flex: 1,
    },
});

export default NewsHot;
