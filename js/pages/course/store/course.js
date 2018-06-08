import {observable, action, runInAction, computed} from 'mobx';

import {fetchCourseList} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';
import {range as Array__range} from '../../../utils/array';
import {getCurWeek} from '../../../utils/date';
import {handleError} from '../../../utils/error';

const educationCourseStorageKey = 'BistuHelper__education__course';

class CourseStore {
    @observable allWeekCourses = [];
    @observable curWeek = 1;

    @action 
    fetchAllWeekCourses= async (params, force) => {
        let courses;

        try {
            if (!force) {
                courses = await getFromStorage(educationCourseStorageKey);
            }

            if (!courses) {
                courses = await this.fetchCourseList(params);
            }

            if (!courses || !courses.length) return;

            await saveToStorage(educationCourseStorageKey, courses);

            this.curWeek = getCurWeek();
            runInAction(() => {
                this.allWeekCourses = courses;
            });
        } catch (err) {
            handleError(err);
        }
    }

    @computed
    get curWeekCourses() {
        if (!this.allWeekCourses.length) return [];
        const allDayCourses = (this.allWeekCourses[this.curWeek - 1] || []).reduce((acc, cur) => {
            const w = cur.meta.week;
        
            acc[w - 1] = acc[w - 1] || [];
            acc[w - 1].push(cur);
            return acc;
        }, []);
        allDayCourses.length = 7;

        return allDayCourses;
    }

    fetchCourseList = async (params) => {
        try {
            let courseList = await fetchCourseList(params);

            if (courseList && courseList.length) {
                courseList = this.getAllWeekCourses(courseList);
            }
            return courseList;
        } catch (err) {
            handleError(err);
        }
    };

    getAllWeekCourses(courseList) {
        const allWeekCourses = courseList.reduce((acc, cur) => {
            const range = Array__range(...cur.meta.range);
            
            range.forEach(r => {
                acc[r - 1] = acc[r - 1] || [];
                acc[r - 1].push(cur);
            });
            return acc;
        }, []);

        return allWeekCourses;
    }
}

export default CourseStore;
