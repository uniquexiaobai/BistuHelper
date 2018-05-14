import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, ScrollView, View, Text, Button} from 'react-native';
import {Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import {getFromStorage} from '../../utils/storage';
import {mainTabColors} from '../../constants/colors';
import {screenWidth} from '../../utils/screen';

const educationAccountStorageKey = 'BistuHelper__education__account';

@inject('courseStore')
@observer
class Courses extends Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: '课程表',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon
                name='md-grid'
                color={focused ? tintColor : mainTabColors.inactiveTintColor}
                size={25}
            />
        )
    };

    async componentDidMount() {
        const {navigate} = this.props.navigation;
        const {fetchCourseList} = this.props.courseStore;

        try {
            const {username, password, name, major} = await getFromStorage(educationAccountStorageKey) || {};

            if (!username || !password) {
                Toast.info('请先绑定教务处账号', 1);
                setTimeout(() => navigate('EducationSignIn'), 1000);
                return;
            }

            this.userInfo = {name, major};

            Toast.loading('', 0);
            await fetchCourseList({username, password});
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    update = async () => {
        const {navigate} = this.props.navigation;
        const {fetchCourseList} = this.props.courseStore;

        try {
            const {username, password, name, major} = await getFromStorage(educationAccountStorageKey) || {};

            if (!username || !password) {
                Toast.info('请先绑定教务处账号', 1);
                setTimeout(() => navigate('EducationSignIn'), 1000);
                return;
            }

            this.userInfo = {name, major};

            Toast.loading('', 0);
            await fetchCourseList({username, password});
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
    }

    curWeekDates = () => {
        const date = dayjs();
        const curWeek = date.day();
        const arr = [1, 2, 3, 4, 5, 6, 7];

        return arr.map(w => {
            if (w === curWeek) {
                return date;
            } else if (w > curWeek) {
                return date.add(w - curWeek, 'day');
            } else {
                return date.subtract(curWeek - w, 'day');
            }
        });
    }

    courseHeaderValues = () => {
        const weekMap = {
            0: '周日',
            1: '周一',
            2: '周二',
            3: '周三',
            4: '周四',
            5: '周五',
            6: '周六',
        };
        const dates = this.curWeekDates();

        const values = dates.map(date => {
            const wValue = weekMap[date.day()];
            const dValue = date.date() === 1 ? `${date.month + 1}月` : `${date.date()}日`;

            return [wValue, dValue];
        });
        values.unshift([
            dates[0].month() + 1,
            '月'
        ]);
        return values;
    }

    courseHeaderView = (values) => (
        <View style={styles.course__header}>
            {values.map((value, index) => (
                <View key={index} style={[styles.course__th, index === 0 ? styles.course__th0 : null]}>
                    <Text style={[styles.course__th_text, styles.text_bold]}>{value[0]}</Text>
                    <Text style={[styles.course__th_text]}>{value[1]}</Text>
                </View>
            ))}
        </View>
    );

    courseBodyView = () => (
        <View style={styles.course__body}>
            <View style={[styles.course__column, styles.course__column0]}>
            </View>

            <View style={[styles.course__column]}>
            </View>
            <View style={[styles.course__column]}>
            </View>
            <View style={[styles.course__column]}>
            </View>
            <View style={[styles.course__column]}>
            </View>
            <View style={[styles.course__column]}>
            </View>
            <View style={[styles.course__column]}>
            </View>
            <View style={[styles.course__column]}>
            </View>
        </View>
    )

    render() {
        const headerValues = this.courseHeaderValues();

        console.warn(headerValues);

        return (
            <View style={styles.course}>
                <Button title="刷新" onPress={this.update} />

                <View style={styles.course__table}>
                    {this.courseHeaderView(headerValues)}

                    {this.courseBodyView()}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    course__table: {

    },
    course__header: {
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
    },
    course__th: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
    },
    course__th0: {
        flex: 2,
    },
    course__th_text: {
        fontSize: 12,
        color: '#333333',
    },
    text_bold: {
        fontWeight: 'bold',
    },

    course__body: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'red',
        height: 320,
    },
    course__column: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'blue',
        height: 320,
    },
    course__column0: {
        flex: 2,
    },
});

export default Courses;
