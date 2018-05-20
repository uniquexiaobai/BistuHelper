import dayjs from 'dayjs';

import {range} from './array';

const classBeginDate = '2018-02-26'; // 校历上正式上课时间，需要每学期调整

export const getCurWeek = () => {
    const start = dayjs(classBeginDate);
    const now = dayjs();

    return now.diff(start, 'week') + 1;
};

export const getCurTerm = (level) => {
    const start = dayjs(`${level}-09-01`);
    const now = dayjs();
    const curTerm = Math.ceil(now.diff(start, 'month') / 6);

    return curTerm;
}

export const getCurWeekDates = () => {
    const now = dayjs();
    const dayOfWeek = now.day() === 0 ? 7 : now.day(); // 0-6 => 1-7

    return range(1, 7).map(w => {
        if (w === dayOfWeek) {
            return now;
        } else if (w > dayOfWeek) {
            return now.add(w - dayOfWeek, 'day');
        } else {
            return now.subtract(dayOfWeek - w, 'day');
        }
    });
};

export const getCurDay = () => {
    return dayjs().date();
};
