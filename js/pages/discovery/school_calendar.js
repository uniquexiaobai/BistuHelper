import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars'

import {BackNavBar} from '../../components/nav-bar';
import {colors} from '../../constants/colors';

LocaleConfig.locales['cn'] = {
    monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    dayNamesShort: ['日','一','二','三','四','五','六'],
};
LocaleConfig.defaultLocale = 'cn';

const dates = [
    '2018-03-03',
    '2018-03-04',
    '2018-03-10',
    '2018-03-11',
    '2018-03-17',
    '2018-03-18',
    '2018-03-24',
    '2018-03-25',
    '2018-03-31',
    '2018-04-01',
    '2018-04-05',
    '2018-04-07',
    '2018-04-08',
    '2018-04-14',
    '2018-04-15',
    '2018-04-21',
    '2018-04-22',
    '2018-04-28',
    '2018-04-29',
    '2018-05-01',
    '2018-05-05',
    '2018-05-06',
    '2018-05-12',
    '2018-05-13',
    '2018-05-19',
    '2018-05-20',
    '2018-05-26',
    '2018-05-27',
    '2018-06-02',
    '2018-06-03',
    '2018-06-09',
    '2018-06-10',
    '2018-06-16',
    '2018-06-17',
    '2018-06-18',
    '2018-06-23',
    '2018-06-24',
    '2018-06-30',
    '2018-07-01',
    '2018-07-07',
    '2018-07-08',
    '2018-07-14',
    '2018-07-15',
    '2018-07-16',
    '2018-07-17',
    '2018-07-18',
    '2018-07-19',
    '2018-07-20',
    '2018-07-21',
    '2018-07-22',
    '2018-07-23',
    '2018-07-24',
    '2018-07-25',
    '2018-07-26',
    '2018-07-27',
    '2018-07-28',
    '2018-07-29',
    '2018-07-30',
    '2018-07-31',
    '2018-08-01',
    '2018-08-02',
    '2018-08-03',
    '2018-08-04',
    '2018-08-05',
    '2018-08-06',
    '2018-08-07',
    '2018-08-08',
    '2018-08-09',
    '2018-08-10',
    '2018-08-11',
    '2018-08-12',
    '2018-08-13',
    '2018-08-14',
    '2018-08-15',
    '2018-08-16',
    '2018-08-17',
    '2018-08-18',
    '2018-08-19',
    '2018-08-20',
    '2018-08-21',
    '2018-08-22',
    '2018-08-23',
    '2018-08-24',
    '2018-08-25',
    '2018-08-26',
    '2018-08-27',
    '2018-08-28',
    '2018-08-29',
    '2018-08-30',
    '2018-08-31',
    '2018-09-01',
    '2018-09-02',
];

const markedDates = dates.reduce((acc, cur) => {
    acc[cur] = {
        marked: true,
        dotColor: colors.brand_primary,
    };
    return acc;
}, {});

const SchoolCalendar = () => {
    return (
        <View>
            <View style={styles.schoolCalendar__header}>
                <Text style={styles.schoolCalendar__title}>2017-2018学年第二学期</Text>
            </View>

            <Calendar
                minDate={'2018-02-26'}
                maxDate={'2018-09-02'}
                monthFormat={'yyyy年 M月'}
                firstDay={1}
                markedDates={markedDates}
                theme={{
                    todayTextColor: colors.brand_warning,
                    arrowColor: colors.brand_primary
                }}
            />
        </View>
    );
};

SchoolCalendar.navigationOptions = ({navigation}) => ({
    header: <BackNavBar navigation={navigation} config={{
        title: '校历',
    }}/>
});

const styles = StyleSheet.create({
    schoolCalendar__header: {
        paddingTop: 10,
        paddingBottom: 15,
        alignItems: 'center',
    },
    schoolCalendar__title: {
        color: colors.color_text_base,
        fontSize: 18,
    },
});

export default SchoolCalendar;
