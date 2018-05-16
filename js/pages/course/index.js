import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, Button} from 'react-native';
import {Toast} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';

import {getFromStorage} from '../../utils/storage';
import {mainTabColors} from '../../constants/colors';
import {screenWidth} from '../../utils/screen';
import {range} from '../../utils/array';
import {getCurTerm, getCurWeekDates} from '../../utils/date';
import {colors} from '../../constants/colors';

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
        try {
            this.fetchDate();
        } catch (err) {
            console.warn(err);
        }
    }

    fetchDate = async () => {
        const {navigate} = this.props.navigation;
        const {fetchCourseList} = this.props.courseStore;

        try {
            const {username, password, name, major, level} = await getFromStorage(educationAccountStorageKey) || {};

            if (!username || !password) {
                Toast.info('请先绑定教务处账号', 1);
                return;
            }

            this.userInfo = {
                name, 
                major,
                level: getCurTerm(level),
            };

            Toast.loading('', 0);
            await fetchCourseList({username, password});
            Toast.hide();
        } catch (err) {
            console.warn(err);
        }
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
        const dates = getCurWeekDates();

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

    courseBodyValues = (courses) => {
        if (!courses.length) return [];
        const sideValues = range(1, 13).map(value => ({value}));

        const values = [];
        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
        
            if (!course || !course.length) {
                values.push([]);
            } else {
                let result = [];
                result.length = 14;
                let prev = 0;
        
                course.forEach(c => {
                    const a = +c.meta.parts[0];
                    const b = +c.meta.parts[1];
                    const total = b - a + 1;
                    const obj = {
                        flex: total,
                        value: `${c.name}\n@${c.address}`,
                        data: c,
                    };
                    result.splice(a - prev, total, obj);
                    prev = prev + total - 1;
                });
                for (let j = 0; j < result.length; j++) {
                    result[j] = result[j] || {};
                }
                values.push(result.slice(1));
            }
        }
        
        return [sideValues, ...values];
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

    courseBodyView = (data) => {
        return (
            <ScrollView>
                <View style={styles.course__body}>
                    {
                        data.map((line, index) => (
                            <View key={index} style={[styles.course__column, index === 0 ? styles.course__column0 : null]}>
                                {
                                    (line.length ? line : range(1, 13)).map(({flex = 1, value = '', data}) => (
                                        <TouchableOpacity 
                                            key={value} 
                                            activeOpacity={1} 
                                            style={[styles.course__row, {flex}, data ? styles['course__row-active'] : null]}
                                            onPress={() => {this.routeToDetail(data)}}
                                        >
                                            <Text style={[styles.course__row_text, data ? styles['course__row_text-active'] : null]}>{value}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        );
    };

    render() {
        const {curWeekCourses} = this.props.courseStore;
        const headerValues = this.courseHeaderValues();
        const bodyValues = this.courseBodyValues(curWeekCourses);

        return (
            <View style={styles.course}>
                <Button title="刷新" onPress={this.fetchDate} />

                <View style={styles.course__table}>
                    {this.courseHeaderView(headerValues)}

                    {this.courseBodyView(bodyValues)}
                </View>
            </View>
        );
    }

    routeToDetail = (course) => {
        if (!course) return;
        const {navigate} = this.props.navigation;

        navigate('CourseDetail', {course})
    };
}

const styles = StyleSheet.create({
    course: {
        flex: 1,
    },
    course__table: {
        flex: 1,
    },
    course__header: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: colors.fill_grey,
    },
    course__th: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    course__th0: {
        flex: 2,
    },
    course__th_text: {
        fontSize: 12,
        color: colors.color_text_paragraph,
    },
    text_bold: {
        fontWeight: 'bold',
    },

    course__body: {
        flexDirection: 'row',
        height: 715,
    },
    course__column: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    course__column0: {
        flex: 2,
        backgroundColor: colors.fill_grey,
    },
    course__row: {
        paddingLeft: 3,
        paddingRight: 3,
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border_color_light,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: colors.border_color_light,
    },
    'course__row-active': {
        backgroundColor: 'green',
    },
    course__row_text: {
        fontSize: 12,
    },
    'course__row_text-active': {
        color: colors.color_text_base_inverse,
    },
});

export default Courses;
