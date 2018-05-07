import {observable, action, runInAction, autorun} from 'mobx';

import {fetchNewsHot} from '../../../utils/api';

class NewsHotStore {
    @observable newsHot = [];

    @action
    fetchNewsHot = async () => {
        try {
            const data = await fetchNewsHot();

            runInAction(() => {
                if (data) this.newsHot = data;
            });
        } catch (e) {
            console.error(e);
        }
    };
}

export default NewsHotStore;
