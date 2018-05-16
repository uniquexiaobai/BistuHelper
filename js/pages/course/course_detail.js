import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {BackNavBar} from '../../components/nav-bar';
import {colors} from '../../constants/colors';

const weekMap = {
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六',
    7: '周日',
};

const CourseDetail = ({navigation}) => {
    const {name, type, teacher, address, meta} = navigation.getParam('course');
    const {week, range, parts} = meta;

    return (
        <View style={{padding: 20}}>
            <Text style={styles.detail__name}>{name}</Text>
            <Text style={styles.detail__text}>性质： {type}</Text>
            <Text style={styles.detail__text}>教室： {address}</Text>
            <Text style={styles.detail__text}>周数： {range.join('-')}周</Text>
            <Text style={styles.detail__text}>节数： {weekMap[week]} {parts.join('-')}节</Text>
            <Text style={styles.detail__text}>老师： {teacher}</Text>
        </View>
    );
};

CourseDetail.navigationOptions = ({navigation}) => ({
    header: <BackNavBar navigation={navigation} config={{
        title: '课程详情',
    }}/>
});

const styles = StyleSheet.create({
    detail__name: {
        marginBottom: 10,
        fontSize: 20,
        color: colors.color_text_base,
    },
    detail__text: {
        marginBottom: 5,
        color: colors.color_text_paragraph,
    },
});

export default CourseDetail;
