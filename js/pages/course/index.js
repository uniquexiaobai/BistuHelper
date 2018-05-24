import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, View, Text} from 'react-native';
import {Toast} from 'antd-mobile';

import Icon from '../../components/icon';
import {getFromStorage} from '../../utils/storage';
import {range} from '../../utils/array';
import {getCurWeekDates, getCurTerm, getCurWeek, getCurDay} from '../../utils/date';
import {colors} from '../../constants/colors';
import {EmptyNavbar} from '../../components/nav-bar'
import StatusBar from '../../components/status-bar';

const educationAccountStorageKey = 'BistuHelper__education__account';

const levelMap = {
    1: '大一',
    2: '大二',
    3: '大三',
    4: '大四',
};

@inject('courseStore')
@observer
class Courses extends Component {
    static navigationOptions = {
        header: <StatusBar />,
        tabBarLabel: '课程表',
        tabBarIcon: ({focused, tintColor}) => (
            <View style={{width: 25, height: 25, alignItems: 'center'}}>
                <Icon type='grid' color={focused ? tintColor : colors.fill_gray}/>
            </View>
        )
    };

    componentDidMount() {
        try {
            this.fetchDate(false, false);
        } catch (err) {
            console.warn(err);
        }
    }

    componentWillUnmount() {
        Toast.hide();
    }

    fetchDate = async (force, showLoading) => {
        const {navigate} = this.props.navigation;
        const {fetchAllWeekCourses} = this.props.courseStore;

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

            if (showLoading) {
                Toast.loading('', 0);
            }
            await fetchAllWeekCourses({username, password}, force);
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
                <View 
                    key={index} 
                    style={[styles.course__th, index === 0 ? styles.course__th0 : null, `${getCurDay()}日` === value[1] ? styles['course__th-active'] : null]}
                >
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

        const curWeek = getCurWeek();
        const level = (this.userInfo || {}).level;
        const levelValue = level ? levelMap[~~(level / 2)] : '';
        const termValue = level ? (level % 2 === 0 ? 2 : 1) : '';

        return (
            <View style={[styles.course]}>
                
                <View style={styles.course__top}>
                    <TouchableHighlight
                        underlayColor={colors.fill_tap}
                        activeOpacity={1}
                        style={[styles.course__button, styles.course__button_left]}
                    >
                        <Icon type='add'/>
                    </TouchableHighlight>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: colors.color_text_base}}>第{curWeek}周</Text>
                        <Text style={{fontSize: 14, color: colors.color_text_paragraph}}>{(termValue && termValue) ? `${levelValue} 第${termValue}学期` : ''}</Text>
                    </View>
                    <TouchableHighlight
                        underlayColor={colors.fill_tap}
                        activeOpacity={1}
                        onPress={() => this.fetchDate(true, true)}
                        style={[styles.course__button, styles.course__button_right]}
                    >
                        <Icon type='refresh'/>
                    </TouchableHighlight>
                </View>

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
    course__top: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    course__button: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    course__button_left: {
        marginLeft: 5,
    },
    course__button_right: {
        marginRight: 5,
    },
    course__header: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: colors.fill_light_gray,
    },
    course__th: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    course__th0: {
        flex: 2,
    },
    'course__th-active': {
        backgroundColor: '#D2F3F2',
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
        backgroundColor: colors.fill_light_gray,
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
        backgroundColor: colors.brand_primary,
    },
    course__row_text: {
        fontSize: 12,
    },
    'course__row_text-active': {
        color: colors.color_text_base_inverse,
    },
});

export default Courses;
