import {observable, action, runInAction, computed, set, autorun} from 'mobx';

import {fetchCourseList} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';

const educationCourseStorageKey = 'BistuHelper__education__course';

const Array__range = ([start, end]) => {
	start = +start;
	end = +end;
	const result = [];

    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

class CourseStore {
    @observable courseList = [];

    @action
    fetchCourseList = async (params) => {
        try {
            const data = await getFromStorage(educationCourseStorageKey);

            if (!data) {
                data = await fetchCourseList(params);
            }
            if (!data || !data.length) return;

            await saveToStorage(educationCourseStorageKey, data);

            runInAction(() => {
                if (data) this.courseList = data;
                // console.warn(this.courseList);
            });

            const formatedData = data.reduce((acc, cur) => {
                const range = Array__range(cur.meta.range);
            
                range.forEach(r => {
                    acc[r] = acc[r] || [];
                    acc[r].push(cur);
                });
                return acc;
            }, []);

            // console.warn(formatedData);
        } catch (err) {
            console.error(err);
        }
    };
}

export default CourseStore;
