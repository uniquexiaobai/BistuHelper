import {observable, action, runInAction, autorun} from 'mobx';

import {fetchNewsSlide} from '../../../utils/api';
import {handleError} from '../../../utils/error';

class NewsSlideStore {
    @observable newsSlide = [];

    @action
    fetchNewsSlide = async () => {
        try {
            const data = await fetchNewsSlide();

            runInAction(() => {
                if (data) this.newsSlide = data;
            });
        } catch (err) {
            handleError(err);
        }
    };
}

export default NewsSlideStore;
