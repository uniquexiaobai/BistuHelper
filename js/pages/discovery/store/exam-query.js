import {observable, action, runInAction, computed, set, autorun} from 'mobx';

import {fetchEducationExam} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';
import {handleError} from '../../../utils/error';

const educationExamStorageKey = 'BistuHelper__education__exam';

class ExamQueryStore {
    @observable examInfo;

    @action
    fetchEducationExam = async (params, force) => {
        let data;

        try {
            if (force) {
                data = await fetchEducationExam(params);
            } else {
                data = await getFromStorage(educationExamStorageKey);
            }

            if (!data) {
                data = await fetchEducationExam(params);
            }
            if (!data || !data.length) return;

            await saveToStorage(educationExamStorageKey, data);

            runInAction(() => {
                this.examInfo = data;
            });
        } catch (err) {
            handleError(err);
        }
    };
}

export default ExamQueryStore;
