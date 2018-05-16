import {observable, action, runInAction, computed, set, autorun} from 'mobx';

import {fetchCourseList} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';
import {range as Array__range} from '../../../utils/array';
import {getCurWeek} from '../../../utils/date';

const educationCourseStorageKey = 'BistuHelper__education__course';

class CourseStore {
    @observable courseList = [];
    @observable curWeek = 1;

    @action
    fetchCourseList = async (params) => {
        try {
            const data = await getFromStorage(educationCourseStorageKey);

            if (!data) {
                data = await fetchCourseList(params);
            }
            if (!data || !data.length) return;

            await saveToStorage(educationCourseStorageKey, data);

            this.curWeek = getCurWeek();
            runInAction(() => {
                if (data) this.courseList = data;
            });
        } catch (err) {
            console.error(err);
        }
    };
    
    @computed
    get curWeekCourses() {
        if (!this.courseList || !this.courseList.length) return [];

        const allWeekCourses = this.courseList.reduce((acc, cur) => {
            const range = Array__range(...cur.meta.range);
            
            range.forEach(r => {
                acc[r - 1] = acc[r - 1] || [];
                acc[r - 1].push(cur);
            });
            return acc;
        }, []);

        const allDayCourses = (allWeekCourses[this.curWeek - 1] || []).reduce((acc, cur) => {
            const w = cur.meta.week;
        
            acc[w - 1] = acc[w - 1] || [];
            acc[w - 1].push(cur);
            return acc;
        }, []);
        allDayCourses.length = 7;

        return allDayCourses;
    }
}

export default CourseStore;
