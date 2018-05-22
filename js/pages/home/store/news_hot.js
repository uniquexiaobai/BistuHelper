import {observable, action, runInAction, autorun} from 'mobx';

import {fetchNewsHot} from '../../../utils/api';
import {handleError} from '../../../utils/error';

class NewsSlideStore {
    @observable newsHot = [];

    @action
    fetchNewsHot = async () => {
        try {
            const data = await fetchNewsHot();

            runInAction(() => {
                if (data) this.newsHot = data;
            });
        } catch (err) {
            handleError(err);
        }
    };
}

export default NewsSlideStore;
