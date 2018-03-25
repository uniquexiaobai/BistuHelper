import axios from 'axios';
import {observable, action, runInAction} from 'mobx';

class NewsStore {
    @observable newsList = [];

    @action
    fetchNewsList = async () => {
        try {
            const requestURL = 'http://bistuhelper.cn/api/news?type=zhxw&page=1';
            const response = await axios.get(requestURL);

            runInAction(() => {
                this.newsList = response.data;
            });
        } catch (e) {
            console.error('Connection error', 'Couldn\'t fetch the data.');
        }
    };
}

export default NewsStore;
