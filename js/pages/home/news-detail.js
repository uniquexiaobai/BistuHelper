import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {mainTabColors} from '../../constants/colors';
import {colors} from '../../constants/colors';
import {screenWidth} from '../../utils/screen';

import homeActionCreators from './action';

class NewsDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '新闻详情',
    });

    componentDidMount() {
        const {fetchNewsDetail} = this.props.homeActions;
        const {getParam} = this.props.navigation;
        const newsId = getParam('newsId');

        fetchNewsDetail(newsId)
            .then(() => {})
            .catch((err) => {});
    }

    render() {
        const {newsDetailState} = this.props;
        const newsDetail = newsDetailState && newsDetailState.toJS() || {};

        return (
            <View style={styles.detail}>
                <ScrollView style={styles.detail__content}>
                    {this.getContentLayout(newsDetail.content)}
                </ScrollView>
            </View>
        )
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
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    datail__content: {
        
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

function mapStateToProps(state) {
    return {
        newsDetailState: state.getIn(['home', 'newsDetail'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        homeActions: bindActionCreators(homeActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
