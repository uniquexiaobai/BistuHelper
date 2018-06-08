import {observable, action, runInAction} from 'mobx';

import {fetchEducationCet} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';

const educationCetStorageKey = 'BistuHelper__education__cet';

class CetQueryStore {
    @observable cetInfo = [];

    @action
    fetchEducationCet = async (params, force) => {
        let data;

        try {
            if (force) {
                data = await fetchEducationCet(params);
            } else {
                data = await getFromStorage(educationCetStorageKey);
            }

            if (!data) {
                data = await fetchEducationCet(params);
            }
            if (!data || !data.length) return;

            await saveToStorage(educationCetStorageKey, data);

            runInAction(() => {
                this.cetInfo = data;
            });
        } catch (e) {
            console.error(e);
        }
    };
}

export default CetQueryStore;
