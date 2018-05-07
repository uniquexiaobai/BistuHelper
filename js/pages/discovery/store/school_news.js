import {observable, action, runInAction, computed, set, autorun} from 'mobx';

import {fetchNewsList} from '../../../utils/api';

class SchoolNewsStore {
    @observable schoolNews = {
        'zhxw': [], 
        'tpxw': [],
        'rcpy': [],
        'jxky': [],
        'whhd': [],
        'xyrw': [],
        'jlhz': [],
        'shfw': [],
        'mtgz': [],
    };

    @action
    fetchNewsList = async (params) => {
        try {
            const data = await fetchNewsList(params);

            runInAction(() => {
                // fixbug object api set in next release
                if (data) this.schoolNews[params.type] = data;
            });
        } catch (e) {
            console.error(e);
        }
    };
}

export default SchoolNewsStore;
