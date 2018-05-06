import {observable, action, runInAction} from 'mobx';

import {fetchNewsList} from '../../utils/api';

class NewsStore {
    @observable newsList = [];

    @action
    fetchNewsList = async () => {
        try {
            const data = await fetchNewsList();

            runInAction(() => {
                this.newsList = data;
            });
        } catch (e) {
            console.error(e);
        }
    };
}

export default NewsStore;
