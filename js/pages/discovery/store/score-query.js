import {observable, action, runInAction, computed} from 'mobx';

import {fetchEducationScore} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';

const educationScoreStorageKey = 'BistuHelper__education__score';

class ScoreQueryStore {
    @observable allTermScore = {};
    @observable curTerm;

    @action
    fetchEducationScore = async (params, force) => {
        let data;

        try {
            if (force) {
                data = await fetchEducationScore(params);
            } else {
                data = await getFromStorage(educationScoreStorageKey)
            }

            if (!data) {
                data = await fetchEducationScore(params);
            }
            if (!data || !data.length) return;

            await saveToStorage(educationScoreStorageKey, data);

            runInAction(() => {
                this.allTermScore = this.formatedScore(data);
                this.curTerm = this.allTerms[this.allTerms.length - 1];
            });
        } catch (e) {
            console.error(e);
        }
    };

    @action
    setCurTerm = (value) => {
        this.curTerm = value;
    };

    formatedScore(infos) {
        return infos.reduce((acc, cur) => {
            const key = `${cur.year}#${cur.term}`; // 2014-2015#1
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(cur);
            return acc;
        }, {});
    }

    @computed
    get curTermScore() {
        if (!this.allTerms.length) return {};
        const key = this.curTerm || this.allTerms[this.allTerms.length - 1];

        return this.allTermScore[key];
    }

    @computed
    get allTerms() {
        const keys = Object.keys(this.allTermScore);
        
        keys.sort();
        return keys;
    }
}

export default ScoreQueryStore;
