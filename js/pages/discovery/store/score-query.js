import {observable, action, runInAction, computed, set, autorun} from 'mobx';

import {fetchEducationScore} from '../../../utils/api';
import {getFromStorage, saveToStorage} from '../../../utils/storage';

const educationScoreStorageKey = 'BistuHelper__education__score';

class ScoreQueryStore {
    @observable scoreInfo = [];
    @observable curScoreTerm;

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
                this.scoreInfo = data;
                this.curScoreTerm = this.scoreTerms[this.scoreTerms.length - 1];
            });
        } catch (e) {
            console.error(e);
        }
    };

    @action
    setCurScoreTerm = (value) => {
        this.curScoreTerm = value;
    };

    @computed
    get formatedScoreInfo() {
        return this.scoreInfo.reduce((acc, cur) => {
            const key = `${cur.year}#${cur.term}`; // 2014-2015#1
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(cur);
            return acc;
        }, {});
    }

    @computed
    get curScoreInfo() {
        if (!this.scoreTerms.length) return {};
        const key = this.curScoreTerm || this.scoreTerms[this.scoreTerms.length - 1];

        return this.formatedScoreInfo[key];
    }

    @computed
    get scoreTerms() {
        const keys = Object.keys(this.formatedScoreInfo);
        
        keys.sort();
        return keys;
    }
}

export default ScoreQueryStore;
